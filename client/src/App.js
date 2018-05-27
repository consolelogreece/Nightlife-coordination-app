import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import SigninPage from './components/pages/SigninPage'
import SignupPage from './components/pages/SignupPage'
import PasswordChangePage from './components/pages/PasswordChangePage'
import Navbar from './components/navbar/navbar'


const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => {
    return (
      <Route
        {...rest}
        render={props =>
           isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to="/login"   
            />
          )
        }
      />
    )
};

const NotLoggedInOnlyRoute = ({isAuthenticated, component: Component, ...rest}) => {
    return (
      <Route
        {...rest}
        render={props =>
           isAuthenticated ? (
            <Redirect
              to="/"   
            />
          ) : (
            <Component {...props} />
          ) 
        }
      />
    )
};


class App extends Component {
  render() {
    return (
    	 <div className="App">
            <Navbar />
			 <Switch>
                <NotLoggedInOnlyRoute isAuthenticated={this.props.isAuthenticated} path="/signup" exact component={SignupPage} />
                <NotLoggedInOnlyRoute isAuthenticated={this.props.isAuthenticated} path="/signin" exact component={SigninPage} />
                <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/changepassword" exact component={PasswordChangePage} />
				<Route path="/" component={HomePage} />
    		 </Switch>
    	</div>
    	          
    );
  }
}

function mapStateToProps(state){
  
  return {
    isAuthenticated: !!state.user.token
  }
}


export default connect(mapStateToProps)(App);
