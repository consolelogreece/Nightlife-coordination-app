import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Input, Form, Container, Header, Grid, Image, Rating, Card, Icon} from 'semantic-ui-react'
import Search from '../forms/Search'
import { search } from '../../actions/search'
import axios from 'axios'

class HomePage extends Component {

	state={}

	search = request => this.props.search(request).then()
													.catch(err => console.log("search failed"))


	handleGoing = (e) => {
		console.log(e.target.name)
	}



	mapData = data => {

		let renderableArray = data.map(result => {
			let goerTitle;

			switch (result.businessGoers){
				case (0):
					goerTitle = "Nobody is attending"
					break;
				case (1):
					goerTitle = "1 Person attending"
					break
				default:
					goerTitle = `${result.businessGoers} People are attending`
				
			}
			return(
				<div key={result.businessId}>
					<Card >
						<Image src={result.businessImageUrl} /> 
						<Card.Content>
						  <Card.Header>
						    {result.businessName}
						  </Card.Header>
						  <Card.Meta>
						    <span className='date'>
						       <Rating icon='star' rating={result.businessRating} maxRating={5} disabled />
						    </span>
						  </Card.Meta>
						   <Card.Description>
						   	{goerTitle}
					      </Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Button fluid={true} onClick={(e) => this.handleGoing(e)} name={result.businessId} color='purple'>I'm attending</Button>
						</Card.Content>
					</Card>
				</div>
			)


		})

		return renderableArray;
	}



	render(){
		return(	
			<div>	
				<h1>home page</h1>
				<Search search={this.search}/>
				<div style={{'margin':"auto", "width":"100%", "maxWidth":"1800px"}}>
					<h5>{!!this.props.searchResults && this.mapData(this.props.searchResults)}</h5>
				</div>
			</div>
		)
	}
}





const mapStateToProps = (state) => {
	return {
		isAuthenticated: !!state.user.token,
		searchResults: state.user.searchResults
	}
}

export default connect(mapStateToProps, { search })(HomePage);
