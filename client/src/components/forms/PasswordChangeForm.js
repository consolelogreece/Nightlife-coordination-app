import React, { Component } from 'react'
import { Input, Form, Button } from 'semantic-ui-react'
import ErrorMessageInline from '../messages/ErrorMessageInline'

class PasswordChangeForm extends Component {
	state={
		data:{
			oldPass:"",
			newPass:"",
			confirmPass:""
		},
		errors:{},
		loading:false
	}

	handleChange = e => {
		this.setState({data:{...this.state.data, [e.target.name]:e.target.value}})
	}

	handleSubmit = () => {
		const errors = this.validate()
		this.setState({errors:errors}, () => {
			if (Object.keys(this.state.errors).length === 0) this.props.changePassword({...this.state.data, token:this.props.token})
				.catch(err => this.setState({errors:err.response.data.errors}))
		})	
	}

	validate = () => {
		let errors = {}
		const {oldPass, newPass, confirmPass} = this.state.data
		if (oldPass === "") errors["oldPass"] = "cant be blank"
		if (newPass === "") errors["newPass"] = "cant be blank"
		if (confirmPass !== newPass) errors["confirmPass"] = "Passwords don't match"
		return errors
	}


	render(){
		const { data, loading, errors } = this.state

	
		return(
			<div onChange={(e) => this.handleChange(e)}>
				<Form errors={errors.general && errors.general.toString()}loading={loading}>
					<Form.Field error={!!errors.oldPass}>
						<label>Password</label>
						<Input name="oldPass" type="password" value={data.oldPass} />
						{!!errors.oldPass && <ErrorMessageInline text={errors.oldPass} />}
					</Form.Field>

					<Form.Field error={!!errors.newPass}>
						<label>New password</label>
						<Input name="newPass" type="password" value={data.newPass} />
						{!!errors.newPass && <ErrorMessageInline text={errors.newPass} />}
					</Form.Field>

					<Form.Field error={!!errors.confirmPass}>
						<label>Confirm new password</label>
						<Input name="confirmPass" type="password" value={data.confirmPass} />
						{!!errors.confirmPass && <ErrorMessageInline text={errors.confirmPass} />}
					</Form.Field>	
					{!!errors.general && <ErrorMessageInline text={errors.general} />}
							
				</Form>
				<Button onClick={() => this.handleSubmit()} primary>Change password</Button>	
			</div>

		)
	}
}
export default PasswordChangeForm