import React, { Component } from 'react';
import { connect } from 'react-redux';
import SigninForm from '../forms/SigninForm'
import { signin } from '../../actions/auth'


class SigninPage extends Component {
	state={}
	signin = data => this.props.signin(data)//.then(() => this.props.history.push('/'))
								

	render(){
		return(
			<div>
				<h3>Sign in </h3>
				<SigninForm signin={this.signin}/>
			</div>
		)

	}

	

}


export default connect(null, { signin })(SigninPage)