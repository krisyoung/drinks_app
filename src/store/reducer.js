import { combineReducers } from '../utils/reducers'
import createBarsReducer from '../modules/bars/redux'
import createDrinksReducer from '../modules/drinks/redux'

function createRootReducer(dependencies) {
	return combineReducers({
		bars: createBarsReducer(dependencies),
		drinks: createDrinksReducer(dependencies)
	})
}

export default createRootReducer
