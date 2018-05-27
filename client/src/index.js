import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import rootreducer from './rootreducer'

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { userSignedIn } from './actions/auth' 
import { getGoing, userGetGoing } from './actions/going'

import "semantic-ui-css/semantic.min.css"

import App from './App';

const initialState = { 
  user:{going:[]} 
};

const store = createStore(rootreducer, initialState, composeWithDevTools(applyMiddleware(thunk)))


if (localStorage.nightlifeJWT) {

	const user = { JWT: localStorage.nightlifeJWT, email: localStorage.nightlifeEmail };
	store.dispatch(userSignedIn(user));
	getGoing(user.JWT).then(response => {
		store.dispatch(userGetGoing(response))
	}).catch(err => err)
	
}


ReactDOM.render(

	
		<Provider store={store}>
			<Router>
				<Route component={App} />	
			</Router>	
		</Provider>,
	
	 document.getElementById('root')
);

registerServiceWorker();
