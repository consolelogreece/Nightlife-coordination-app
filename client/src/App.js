import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import SigninPage from './components/pages/SigninPage'
import SignupPage from './components/pages/SignupPage'
import PasswordChangePage from './components/pages/PasswordChangePage'
import Navbar from './components/navbar/navbar'


class App extends Component {
  render() {
    return (
    	 <div className="App">
            <Navbar />
			<Switch>
                <Route path="/signup" exact component={SignupPage} />
                <Route path="/signin" exact component={SigninPage} />
                <Route path="/changepassword" exact component={PasswordChangePage} />
				<Route path="/" component={HomePage} />
    		</Switch>
    	</div>
    	          
    );
  }
}

export default App;
