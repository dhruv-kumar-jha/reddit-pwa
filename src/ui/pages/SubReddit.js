'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import Data from 'app/components/Data';
import _ from 'lodash';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import SubRedditPost from 'app/components/SubRedditPost';

import { Posts } from 'app/components/Data';


const SubReddit = (props) => {

	// lets replace / from the url
	const current_subreddit = _.replace( props.location.pathname, '/', '' );
	const data = _.find( Data, { url: current_subreddit } );

	return (
		<Paper style={{ padding: 20 }} zDepth={1} rounded={false}>
			<h2 style={{ margin: 0, paddingLeft: 16 }}>{ data.title }</h2>

			<List>
				<Subheader style={{ textTransform: 'uppercase' }}>All Posts</Subheader>
				{ Posts.map( item => <SubRedditPost key={ item.id } data={ item } /> ) }
			</List>


		</Paper>
	)

}

export default SubReddit;

