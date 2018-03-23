import dropRepeats from 'xstream/extra/dropRepeats'
import xs from 'xstream'

const fromStore = store => {
	let unsubscribe

	return xs.create({
		start(listener) {
			listener.next(store.getState())

			unsubscribe = store.subscribe(() => {
				listener.next(store.getState())
			})
		},
		stop() {
			if (unsubscribe) {
				unsubscribe()
			}
		}
	})
}

const fromAction = (store, actionType) => {
	let removeActionListener

	return xs.create({
		start(listener) {
			removeActionListener = store.addActionListener(
				actionType,
				action => {
					listener.next(action)
				}
			)
		},
		stop() {
			if (removeActionListener) {
				removeActionListener()
			}
		}
	})
}

const createObservables = store => (configs, onValue, options = {}) => {
	const streamHandler = value$ => {
		const subscription = value$.subscribe({
			next: value => {
				if (onValue) {
					onValue(value)
				}
			},
			error: e => console.error(e.stack || e)
		})

		return () => subscription.unsubscribe()
	}

	const unsubscribeHandlers = configs.map(config => {
		let state$
		const thingsToObserve = config.slice(0, -1)
		const observablesHandler = config[config.length - 1]

		const observables = thingsToObserve.map(actionOrSelector => {
			if (typeof actionOrSelector === 'string') {
				return fromAction(store, actionOrSelector)
			}

			if (!state$) {
				state$ = fromStore(store)
			}

			const storeNode$ = state$
				.map(actionOrSelector)
				.drop(options.dropFirstValue ? 1 : 0)
				.compose(dropRepeats())

			return storeNode$
		})

		return streamHandler(observablesHandler(...observables))
	})

	return () => {
		unsubscribeHandlers.forEach(unsubscribe => {
			if (typeof unsubscribe === 'function') {
				unsubscribe()
			}
		})
	}
}

export {
	createObservables,
	fromStore,
	fromAction
}
