import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'querystring'
import { resetPassword } from '../../actions/auth'
import PasswordResetForm from '../forms/PasswordResetForm'


class PasswordResetPage extends Component {
	state={
		token:null
	}

	componentWillMount(){
		let parsedUrlObject = queryString.parse(this.props.location.search)
		if (!Object.prototype.hasOwnProperty.call(parsedUrlObject, 'token')) this.props.history.push("/")
		else this.setState({token:parsedUrlObject['token']})
		
	}

	resetpassword = data => resetPassword(data).then(() => console.log("succeed")) ////////// SERVER SIDE -> VALIDATE TOKEN -> CHANGE PASS -> RETURN SUCCESS -> DISPLAY SUCCESS MSG TO USER//////

	render(){	
		console.log(this.state)
		return(
			<PasswordResetForm resetToken={this.state.token} ResetPassword={this.resetpassword} />
		)
	}
}

export default connect()(PasswordResetPage)