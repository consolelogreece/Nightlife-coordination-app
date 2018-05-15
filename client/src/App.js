import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import SigninPage from './components/pages/SigninPage'
import SignupPage from './components/pages/SignupPage'


class App extends Component {
  render() {
    return (
    	 <div className="App">
			<Switch>
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/signin" exact component={SigninPage} />
				<Route path="/" component={HomePage} />
    		</Switch>
    	</div>
    	          
    );
  }
}

export default App;
