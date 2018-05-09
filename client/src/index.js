import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import rootreducer from './rootreducer'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';


import App from './App';

const store = createStore(rootreducer, applyMiddleware(thunk))

ReactDOM.render(

	<Router>
		<Provider store={store}>
			<App />		
		</Provider>
	</Router>,
	 document.getElementById('root')
);

registerServiceWorker();
