import React, { Component } from 'react';
import { Input, Icon } from 'semantic-ui-react'

class SearchForm extends Component {

	state={
		searchtext:"london acton"
	}


	handlechange = e => {
		this.setState({...this.state, [e.target.name]:e.target.value})
	}

	

	render(){
		return(	
			<div style={{ display:'flex', alignItems:'center', justifyContent:'center'}}>
					<Input 
					style={{'width':'90%'}}
					placeholder='Search...' 
					name="searchtext" 
					value={this.state.searchtext} 
					onChange={this.handlechange} 
					icon={<Icon 
						name='search' 
						circular 
						link 
						onClick={() => this.props.search(encodeURIComponent(this.state.searchtext))}
						/>}
					/>					
			</div>
		)
	}
}


export default SearchForm;