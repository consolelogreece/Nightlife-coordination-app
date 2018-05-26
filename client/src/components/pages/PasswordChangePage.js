import React, { Component } from 'react'
import PasswordChangeForm from '../forms/PasswordChangeForm'
import { connect } from 'react-redux';
import { changePassword } from '../../actions/auth'
class passwordChangeForm extends Component {
	state = {}
	submit = data => {
		this.props.changePassword(data).then(() => this.props.history.push('/')) // add some way to notify user of successful password change. maybe use redux to set global message?
	}
	render(){
		return(
			<PasswordChangeForm changePassword={this.submit} token={this.props.token || null}/>
		)
	}
}

const mapStateToProps = state => {
	return({
		token:state.user.token
	})
}


export default connect(mapStateToProps, { changePassword })(passwordChangeForm)