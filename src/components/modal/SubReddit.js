'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import DB from 'app/utils/DB';
import Loading from 'app/components/Loading';


class SubRedditModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			url: '',
			description: '',
			invalid_url: false,
			processing: false,
		};
		this.updateField = this.updateField.bind(this);
		this.submit = this.submit.bind(this);
	}


	updateField( field, value ) {
		if ( field != 'url' ) {
			this.setState({ [field]: value });
		} else {
			if( /\s/g.test(value) ) {
				this.setState({ [field]: value, invalid_url: true });
			} else {
				this.setState({ [field]: value, invalid_url: false });
			}
		}
	}

	submit() {
		const title = this.state.title;
		const url = this.state.url;
		const description = this.state.description;
		this.setState({ processing: true, title: '', url: '', description: '', invalid_url: false });

		return DB.addSubReddit({ title, url, description })
		.then( res => {
			this.setState({ processing: false });
			this.props.update();
			this.props.close();
		});

	}


	render() {

		const actions = [
			<FlatButton
				label="Cancel"
				primary={ true }
				onTouchTap={ this.props.close }
			/>,
			<FlatButton
				label="Submit"
				primary={ true }
				disabled={ ! this.state.title || ! this.state.url }
				onTouchTap={ this.submit }
			/>,
		];



		return (
			<Dialog
				title="Add New Sub Reddit"
				actions={ actions }
				modal={ true }
				open={ this.props.open }
			>

				<p>Please enter the details below.</p>

				{ this.state.processing &&
					<div>
						<Loading />
					</div>
				}

				{ ! this.state.processing &&
				<div>
					<TextField
						floatingLabelText="Name"
						hintText="JavaScript"
						fullWidth={true}
						defaultValue={ this.state.title }
						onChange={ (event,newValue) => { this.updateField('title', newValue) } }
						autoFocus={true} />
					<TextField
						floatingLabelText="Description"
						hintText="JavaScript"
						fullWidth={true}
						defaultValue={ this.state.description }
						onChange={ (event,newValue) => { this.updateField('description', newValue) } } />
					<TextField
						floatingLabelText="URL"
						hintText="javascript"
						fullWidth={true}
						onChange={ (event, newValue) => { this.updateField('url', newValue) } }
						errorText={ this.state.invalid_url && 'Please enter a valid URL.' }
						defaultValue={ this.state.url } />
				</div>
				}

			</Dialog>
		)

	}

}

export default SubRedditModal;

