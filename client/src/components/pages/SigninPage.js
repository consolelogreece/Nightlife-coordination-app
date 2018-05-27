import React, { Component } from 'react';
import { connect } from 'react-redux';
import SigninForm from '../forms/SigninForm'
import { signin, resetPassword } from '../../actions/auth'
import PasswordResetForm from '../forms/PasswordResetForm'

class SigninPage extends Component {
	state={
		reset:false
	}
	signin = data => this.props.signin(data).then(() => this.props.history.push('/'))

	resetpassword = data => resetPassword(data)

	setReset = () => this.setState({reset:!this.state.reset})
								

	render(){
		return(
			<div>
				{this.state.reset ? <PasswordResetForm resetPassword={this.resetpassword} setReset={this.setReset}/> : <SigninForm setReset={this.setReset} signin={this.signin}/>}
			</div>
		)

	}

	

}

const mapStateToProps = state => {
	return {
		isAuthenticated: !!state.user.token
	}
}

export default connect(null, { signin })(SigninPage)