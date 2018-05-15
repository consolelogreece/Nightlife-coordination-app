import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Image, Rating, Card, Transition} from 'semantic-ui-react'
import SearchForm from '../forms/SearchForm'
import { search } from '../../actions/search'
import { going, notGoing } from '../../actions/going'

class HomePage extends Component {

	state={
		initialLoad:true,
		going:false  // placeholder. once login/auth is availabe, check ids agaisnt list of already going ids for that user.
	}

	search = request => this.props.search(request).then(this.setState({initialLoad:true}))
													.catch(err => console.log("search failed"))

	going = request => this.props.going(request)


	notGoing = request => this.props.notGoing(request)


	handleGoing = (e) => {

		if (this.state.going) {
			this.notGoing(e.target.name)
		} else {
			this.going(e.target.name)
		}
		this.setState({going: !this.state.going})

		if (this.state.initialLoad){
			this.setState({initialLoad:false})
		}

	}



	orderByGoers = data => {
		const compare = (a, b) => {
			if (a.businessGoers < b.businessGoers) return 1
			if (a.businessGoers > b.businessGoers) return -1
			return 0
		}
		return data.sort(compare);
	}



	mapData = data => {

		if (this.state.initialLoad) data = this.orderByGoers(data)

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
		
					<Card key={result.businessId}>
						<div style={{'backgroundColor':'#474647','height':'200px', 'width':'auto'}}>
							{!!result.businessImageUrl 
								? <Image style={{'height':'200px', "margin":"auto"}} src={result.businessImageUrl} /> 
								: <h2 style={{'height':'100%', 'justifyContent':'center', 'color':'#d6d6d6', margin:'auto','display':'flex', 'alignItems':'center'}}>No image available</h2>
							}
						</div>
						<Card.Content>
						  <Card.Header href={result.businessUrl}>
						    {result.businessName}
						  </Card.Header>
						  <Card.Meta>
						    <span className='date'>
						       <Rating rating={result.businessRating} maxRating={5} disabled />
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

				)
			})

		return renderableArray;
	}



	render(){
		console.log(this.state.initialLoad)
		return(	
			<div style={{'margin':"auto", "maxWidth":"1400px", alignItems:'center', justifyContent:'center'}}>	
				<h1 style={{alignItems:'center'}}>home page</h1>
				<SearchForm search={this.search}/>
				<div>
					<Card.Group style={{"margin":"auto", display:'flex', alignItems:'center', justifyContent:'center'}}>
						{!!this.props.searchResults && this.mapData(this.props.searchResults)}{!this.props.searchResults && <h3>No results</h3>}
					</Card.Group>				
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

export default connect(mapStateToProps, { search, going, notGoing })(HomePage);
