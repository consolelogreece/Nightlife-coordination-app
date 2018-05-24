import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Image, Rating, Card, Transition} from 'semantic-ui-react'
import SearchForm from '../forms/SearchForm'
import { search } from '../../actions/search'
import { going } from '../../actions/going'

class HomePage extends Component {

	state={
		 initialLoad:true,
		 animation:"drop",
		 duration: 500,
		 visible: false 
	}

	search = request =>  this.props.search(request).then(this.setState({initialLoad:true}))							   			
								   				   .catch(err => console.log("search failed"))

	going = request => this.props.going(request).then(status => console.log(status))


	handleGoing = e => {

		if (!this.props.isAuthenticated) {
		    this.props.history.push('/signin')
		} else {
		    this.going({businessId:e.target.name, token:this.props.token})
		    if (this.state.initialLoad) {
		        this.setState({
		            initialLoad: false
		        })
		    }
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
		const { visible, duration, animation } = this.state
		if (this.state.initialLoad) data = this.orderByGoers(data)
		return data.map((result, index) => {
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
				
				<Transition key={result.businessId} transitionOnMount="true" animation={animation} duration={duration + (index * 20)}>
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
								<Button fluid={true} onClick={(e) => this.handleGoing(e)} name={result.businessId} color='purple'>{this.props.goingArray.includes(result.businessId) ? "Cancel" : "Attend" }</Button>
							</Card.Content>
						</Card>
					</Transition>				

				)	

			}
	)}



	render(){
		
		return(
			<div style={{'margin':"auto", "maxWidth":"1400px", alignItems:'center', justifyContent:'center'}}>	

				
				
			         
        		


				<button onClick={() => this.setState({visible:!this.state.visible})}>visible</button>
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
		token: state.user.token,
		goingArray: state.user.going,
		searchResults: state.user.searchResults
	}
}

export default connect(mapStateToProps, { search, going })(HomePage);
