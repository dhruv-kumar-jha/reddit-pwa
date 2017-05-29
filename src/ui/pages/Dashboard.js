'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import SubRedditItem from 'app/components/SubRedditItem';

import Data from 'app/components/Data';


const Dashboard = (props) => {


	return (
		<Paper style={{ padding: 20, }} zDepth={1} rounded={false}>

			<List>
				<Subheader style={{ textTransform: 'uppercase' }}>Sub Reddits</Subheader>
				{ Data.map( item => <SubRedditItem key={ item.id } data={ item } /> ) }
			</List>

		</Paper>
	)

}

export default Dashboard;

