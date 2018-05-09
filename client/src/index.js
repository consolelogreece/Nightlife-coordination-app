import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import rootreducer from './rootreducer'

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import "semantic-ui-css/semantic.min.css"

import App from './App';

const store = createStore(rootreducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(

	<Router>
		<Provider store={store}>
			<App />		
		</Provider>
	</Router>,
	 document.getElementById('root')
);

registerServiceWorker();
