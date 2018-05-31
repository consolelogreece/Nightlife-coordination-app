import React, { Component } from 'react';
import { Input, Icon } from 'semantic-ui-react'

class SearchForm extends Component {

	state={
		searchtext:"",
		loading:false
	}


	handlechange = e => {
		this.setState({...this.state, [e.target.name]:e.target.value})
	}


	handleSearch = () => {
		
		this.setState({loading:true})
		
		this.props.search(encodeURIComponent(this.state.searchtext)).then(() => this.setState({loading:false}))
	}


	render(){
		return(	
			<div style={{ display:'flex', alignItems:'center', justifyContent:'center'}}>
					<Input loading={this.state.loading} 
					style={{'width':'90%'}}
					placeholder='Search...' 
					name="searchtext" 
					value={this.state.searchtext} 
					onChange={this.handlechange} 
					icon={<Icon 
						name='search' 
						circular 
						link 
						onClick={() => this.handleSearch()}
						/>}
					/>					
			</div>
		)
	}
}


export default SearchForm;