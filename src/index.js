import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './App';

const getInitialState = () => {
	try {
		return JSON.parse(window.INITIAL_STORE_STATE || {})
	} catch (err) {
		return {}
	}
}
const store = createStore(getInitialState())
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
