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
		})	
	}

	validate = () => {
		let errors = {}
		const {oldPass, newPass, confirmPass} = this.state.data
		if (oldPass === "") errors["oldPass"] = "cant be blank"
		if (newPass === "") errors["newPass"] = "cant be blank"
		if (confirmPass === "") errors["confirmPass"] = "cant be blank"
		return errors
	}


	render(){
		const { data, loading, errors } = this.state

	
		return(
			<div onChange={(e) => this.handleChange(e)}>
				<Form onSubmit={() => this.handleSubmit()}>
					<Form.Field error={!!errors.oldPass}>
						<Input name="oldPass"  value={data.oldPass} />
						{!!errors.oldPass && <ErrorMessageInline text={errors.oldPass} />}
					</Form.Field>

					<Form.Field error={!!errors.newPass}>
						<Input name="newPass" value={data.newPass} />
						{!!errors.newPass && <ErrorMessageInline text={errors.newPass} />}
					</Form.Field>

					<Form.Field error={!!errors.confirmPass}>
						<Input name="confirmPass" value={data.confirmPass} />
						{!!errors.confirmPass && <ErrorMessageInline text={errors.confirmPass} />}
					</Form.Field>	
					<Button primary>Change password</Button>			
				</Form>
			</div>

		)
	}
}
export default PasswordChangeForm