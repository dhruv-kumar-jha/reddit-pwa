'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import SubRedditItem from 'app/components/SubRedditItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import EmptySubReddits from 'app/components/empty/SubReddits';
import SubRedditModal from 'app/components/modal/SubReddit';

import DB from 'app/utils/DB';
import Loading from 'app/components/Loading';



class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			loading: true,
			subreddits: [],
		};
		this.handleModalOpen = this.handleModalOpen.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalUpdate = this.handleModalUpdate.bind(this);
		this.findAllSubReddits = this.findAllSubReddits.bind(this);
	}


	componentDidMount() {
		this.findAllSubReddits();
	}


	findAllSubReddits() {
		DB.findAllSubReddits()
		.then( (res) => {
			if ( res ) {
				this.setState({ loading: false, subreddits: res });
			} else {
				this.setState({ loading: false });
			}
		});
	}


	handleModalOpen() {
		this.setState({ modal: true });
	}
	handleModalClose() {
		this.setState({ modal: false });
	}
	handleModalUpdate() {
		this.findAllSubReddits();
	}


	render() {

		// if the content is loading
		if ( this.state.loading ) {
			return <Loading text="Loading sub reddits" />
		}
	

		// if the content is empty
		if ( this.state.subreddits.length < 1 ) {
			return (
				<div>
					<EmptySubReddits openModal={ this.handleModalOpen } />
					<SubRedditModal
						open={ this.state.modal }
						close={ this.handleModalClose }
						update={ this.handleModalUpdate } />
				</div>
			)
		}


		// when we find the content
		return (
			<Paper style={{ padding: 20, }} zDepth={1} rounded={false}>

				<List>
					<Subheader style={{ textTransform: 'uppercase' }}>Sub Reddits</Subheader>
					{ this.state.subreddits.map( item => <SubRedditItem key={ item.url } data={ item } /> ) }
				</List>

				<FloatingActionButton style={{ position: 'fixed', bottom: 50, right: 50 }} onTouchTap={ this.handleModalOpen }>
					<ContentAdd />
				</FloatingActionButton>


				<SubRedditModal
					open={ this.state.modal }
					close={ this.handleModalClose }
					update={ this.handleModalUpdate }
				/>

			</Paper>
		)
	}

}

export default Dashboard;

