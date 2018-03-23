import { combineReducers } from '../utils/reducers'
import createBarsReducer from '../modules/bars/redux'
import createDrinksReducer from '../modules/drinks/redux'

function createRootReducer() {
	return combineReducers({
		bars: createBarsReducer(),
		drinks: createDrinksReducer()
	})
}

export default createRootReducer
