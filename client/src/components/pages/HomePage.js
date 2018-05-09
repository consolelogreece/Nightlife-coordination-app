import React, { Component } from 'react';
import { connect } from 'react-redux'

class HomePage extends Component {


	render(){
		return(	
			<div>	
				<h1>home page</h1>
			
			</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: !!state.user.token
	}
}

export default connect(mapStateToProps)(HomePage);