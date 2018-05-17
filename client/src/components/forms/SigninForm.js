import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react'
import ErrorMessageInline from '../messages/ErrorMessageInline'
import validator from 'validator'


class SignupForm extends Component {
	state={
		data:{
			email:"1@1.com",
			password:"1"
		},
		loading:false,
		errors:{}	
	}

	onChange = e => {
		this.setState({data:{...this.state.data, [e.target.name]:e.target.value}})
	}


	validateForm = () => {
		let errors = {};
		if (!validator.isEmail(this.state.data.email)) errors.email = "Enter a valid email"
		if (this.state.data.password === "") errors.password = "Enter a password"
		return errors
	}



	handleSubmit = () => {
		const errors = this.validateForm()
		this.setState({errors:errors})
	

		if (Object.keys(errors).length === 0) {
			this.setState({loading:true})
			this.props.signin(this.state.data).catch(err => {
				this.setState({errors:err.response.data.errors, loading:false})
			})
		} 
	}



	render(){

		const {data, errors, loading} = this.state

		return(
			<div>
				<Form onSubmit={() => this.handleSubmit()} loading={loading} error={!!errors.general}>
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
					<Form.Field>
						{!!errors.general && <ErrorMessageInline text={errors.general} />}
					</Form.Field>
					<Button>Submit</Button>
					
				</Form>		
			</div>
		)

	}
}

export default SignupForm;

