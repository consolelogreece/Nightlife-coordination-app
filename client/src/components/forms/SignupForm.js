import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react'
import ErrorMessageInline from '../messages/ErrorMessageInline'
import validator from 'validator'


class SigninForm extends Component {
	state={
		data:{
			username:"a",
			email:"a@a.com",
			password:"a",
			confirmPassword:"a"
		},
		loading:false,
		errors:{}	
	}

	onChange = e => {
		this.setState({data:{...this.state.data, [e.target.name]:e.target.value}})
	}


	validateForm = () => {
		let errors = {};
		if (this.state.data.username === "") errors.username = "Enter a valid username"
		if (this.state.data.password === "") errors.password = "Enter a valid password"
		if (this.state.data.confirmPassword !== this.state.data.password) errors.confirmPassword = "Passwords don't match"
		if (!validator.isEmail(this.state.data.email)) errors.email = "Enter a valid email"
		return errors
	}



	handleSubmit = () => {
		const errors = this.validateForm()
		this.setState({errors:errors})
	

		if (Object.keys(errors).length === 0) {
			//this.setState({loading:true})
			this.props.signup(this.state.data).catch(err => {console.log(err)
				//this.setState({errors:err.response.data.errors, loading:false})
			})
		} 
	}



	render(){

		const {data, errors, loading} = this.state

		return(
			<div>
				<Form onSubmit={() => this.handleSubmit()} loading={loading} error={!!errors.general}>

					<Form.Field error={(!!errors.username || !!errors.general)}>
						<label>Username</label>
						<Input type={"text"} value={data.username} name={'username'} onChange={(e) => this.onChange(e)} />
						{!!errors.username && <ErrorMessageInline text={errors.username} />}
					</Form.Field>

					<Form.Field error={(!!errors.email || !!errors.general)}>
						<label>Email</label>
						<Input type={"text"} value={data.email} name={'email'} onChange={(e) => this.onChange(e)} />
						{!!errors.email && <ErrorMessageInline text={errors.email} />}
					</Form.Field>

					<Form.Field error={(!!errors.password || !!errors.general)}>
						<label>Password</label>
						<Input type={"password"} value={data.password} name={'password'} onChange={(e) => this.onChange(e)} />
						{!!errors.password && <ErrorMessageInline text={errors.password} />}
					</Form.Field>

					<Form.Field error={(!!errors.confirmPassword || !!errors.general)}>
						<label>Confirm Password</label>
						<Input type={"text"} value={data.confirmPassword} name={'confirmPassword'} onChange={(e) => this.onChange(e)} />
						{!!errors.confirmPassword && <ErrorMessageInline text={errors.confirmPassword} />}
					</Form.Field>

					<Form.Field>
						{!!errors.general && <ErrorMessageInline text={errors.general} />}
					</Form.Field>

					<Button>Submit</Button>
					
				</Form>		
			</div>
		)

	}
}

export default SigninForm;

