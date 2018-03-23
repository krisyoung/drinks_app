import { createReducer } from '../../utils/reducers'
import { indexBy } from '../../utils/arrays'
const BARS_RECEIVE = '@@api/BARS_RECEIVE'

function reducerFactory() {
	return createReducer(
		[BARS_RECEIVE, (state, { bars }) => ({
			last_updated: Date.now(),
			ids: bars.map(x => x.id),
			items: indexBy('id')(bars)
		})]
	)({
		last_updated: null,
		ids: [],
		items: {}
	})
}

const loadBars = () => async (dispatch, getState, { api }) => {
	const { data } = await api.Bars.getAll()
	return dispatch({ type: BARS_RECEIVE, payload: { bars: data } })
}

const getBars = (state) => state.bars.ids.map(id => state.bars.items[id])

export {
	reducerFactory as default,
	loadBars,
	getBars
}
