import { createObservables } from '../utils/observables'

export default function reactiveEffectsEnhancer(options = {}) {
	return createStore => (reducer, initialState, enhancer) => {
		const actionListeners = {}
		const store = createStore(reducer, initialState, enhancer)
		const dispatch = store.dispatch
		const createObservablesFromStore = createObservables(store)

		store.dispatch = action => {
			const result = dispatch(action)
			const hasType = action && action.type

			if (hasType && actionListeners[action.type]) {
				actionListeners[action.type].forEach(listener =>
					listener(action)
				)
			}

			return result
		}

		const removeListener = (actionType, listener) => {
			actionListeners[actionType] = actionListeners[actionType].filter(
				l => listener !== l
			)
		}

		store.addActionListener = (actionType, listener) => {
			actionListeners[actionType] = (
				actionListeners[actionType] || []
			).concat(listener)

			return () => {
				removeListener(actionType, listener)
			}
		}

		store.removeActionListener = (actionType, listener) => {
			if (!listener) {
				actionListeners[actionType] = []
			} else {
				removeListener(actionType, listener)
			}
		}

		store.withSideEffects = (onValue, options) => configs =>
			createObservablesFromStore(configs, onValue, options)

		return store
	}
}
