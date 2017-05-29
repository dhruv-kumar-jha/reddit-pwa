'use strict';

import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import all the custom styles
import 'app/css/style.css';


// Needed for onTouchTap
// It's a mobile-friendly onClick() alternative for components in Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import DefaultLayout from 'app/ui/layouts/Default';

import Dashboard from 'app/ui/pages/Dashboard';
import SubReddit from 'app/ui/pages/SubReddit';
import Settings from 'app/ui/pages/Settings';


// render the component
render(
	(
	<Router>
	<MuiThemeProvider>

		<DefaultLayout>
			<Route exact path="/" component={ Dashboard } />
			<Switch>
				<Route exact path="/dashboard" component={ Dashboard } />
				<Route exact path="/settings" component={ Settings } />
				<Route path="/:id" component={ SubReddit } />
			</Switch>
		</DefaultLayout>

	</MuiThemeProvider>
	</Router>
	),
	document.getElementById('root')
);


