import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import HomePage from './components/pages/HomePage'


class App extends Component {
  render() {
    return (
    	 <div className="App">
			<Switch>
				<Route path="/" component={HomePage} />
    		</Switch>
    	</div>
    	          
    );
  }
}

export default App;
