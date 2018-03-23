import { createReducer } from '../../utils/reducers'
import { indexBy } from '../../utils/arrays'

const DRINKS_RECEIVE = '@@api/DRINKS_RECEIVE'

function reducerFactory() {
	return createReducer(
		[DRINKS_RECEIVE, (state, { drinks }) => ({
			last_updated: Date.now(),
			ids: drinks.map(x => x.id),
			items: indexBy('id')(drinks)
		})]
	)({
		last_updated: null,
		ids: [],
		items: {}
	})
}

const loadDrinks = () => async (dispatch, getState, { api }) => {
	const { data } = await api.Drinks.getAll()
	return dispatch({ type: DRINKS_RECEIVE, payload: { drinks: data } })
}

const getDrinks = (id) => (state) => {
	const {price_list = {}} = (state.bars.items[id] || {})
	return Object.keys(price_list)
		.map(id => ({ ...state.drinks.items[id], price: price_list[id] }))
}

export {
	reducerFactory as default,
	loadDrinks,
	getDrinks
}
