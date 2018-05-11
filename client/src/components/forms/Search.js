import React, { Component } from 'react';
import { Button, Input, Form } from 'semantic-ui-react'

class Search extends Component {

	state={
		searchtext:""
	}


	handlechange = e => {
		this.setState({...this.state, [e.target.name]:e.target.value})
	}

	

	render(){
		return(	
			<div>	
				<Input name="searchtext" value={this.state.searchtext} onChange={this.handlechange}/> <Button primary onClick={() => this.props.search(encodeURIComponent(this.state.searchtext))}>test</Button>
			</div>
		)
	}
}


export default Search;