import React, { Component } from 'react';
import { connect } from 'react-redux';
import SigninForm from '../forms/SigninForm'
import { signin, resetPasswordRequestEmail } from '../../actions/auth'
import PasswordResetRequestForm from '../forms/PasswordResetRequestForm'

class SigninPage extends Component {
	state={
		reset:false
	}
	signin = data => this.props.signin(data).then(() => this.props.history.push('/'))

	resetpassword = data =>resetPasswordRequestEmail(data)

	setReset = () => this.setState({reset:!this.state.reset})
								

	render(){
		return(
			<div>
				{this.state.reset ? <PasswordResetRequestForm resetPassword={this.resetpassword} setReset={this.setReset}/> : <SigninForm setReset={this.setReset} signin={this.signin}/>}
			</div>
		)

	}

	

}

export default connect(null, { signin })(SigninPage)