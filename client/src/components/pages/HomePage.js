import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Input, Form } from 'semantic-ui-react'
import Search from '../forms/Search'
import { search } from '../../actions/search'

class HomePage extends Component {
	state={}

	search = request => this.props.search(request).then(() => console.log("search successful"))
													.catch(err => console.log("search failed"))


	render(){
		return(	
			<div>	
				<h1>home page</h1>
				<Search search={this.search}/>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		isAuthenticated: !!state.user.token
	}
}

export default connect(mapStateToProps, { search })(HomePage);
