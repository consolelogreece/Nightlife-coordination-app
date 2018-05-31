import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from '../forms/SignupForm'
import { signup } from '../../actions/auth'


class SignupPage extends Component {
	state={}
	
	signup = data => this.props.signup(data).then(() => this.props.history.push('/signin'))
								

	render(){
		return(
			<div>
				<h3>Sign in </h3>
				<SignupForm signup={this.signup}/>
			</div>
		)

	}

	

}


export default connect(null, { signup })(SignupPage)