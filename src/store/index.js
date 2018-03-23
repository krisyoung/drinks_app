import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './reducer';
import thunk from 'redux-thunk';
import createBarsAPIService from '../bars/api'
import createDrinksAPIService from '../drinks/api'

const enhancers = []
const api = {
	Bars: createBarsAPIService(),
	Drinks: createDrinksAPIService()
}
const middleware = [thunk.withExtraArgument({ api })]

if (process.env.NODE_ENV === 'development') {
	const devToolsExtension = window.devToolsExtension

	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension())
	}
}

const creatComposedEnhancers = () => compose(
	applyMiddleware(...middleware),
	...enhancers
);

export { connect } from 'react-redux'
export default function(initialState) {
	return createStore(
		createRootReducer(),
		initialState,
		creatComposedEnhancers()
	);
}
