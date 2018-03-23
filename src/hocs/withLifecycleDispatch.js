import { createElement, PureComponent } from 'react'
import PropTypes from 'prop-types'

const withLifecycleDispatch = hooks => BaseComponent => {
	return class ReduxLifecycleDispatch extends PureComponent {
		static displayName = `ReduxLifecycleDispatch(${BaseComponent.displayName || BaseComponent.name || 'Component'})`
		static contextTypes = {
			store: PropTypes.object.isRequired
		}

		constructor(props, context) {
			super(props, context)
			this.store = context.store
		}

		dispatchResult(method) {
			const result = method(this.store, this.props)
			if (result && (result.type || typeof result === 'function')) {
				this.store.dispatch(result)
			}
		}

		componentWillMount() {
			if (typeof hooks.willMount === 'function') {
				this.dispatchResult(hooks.willMount)
			}
		}

		componentDidMount() {
			if (typeof hooks.didMount === 'function') {
				this.dispatchResult(hooks.didMount)
			}
		}

		componentWillUnmount() {
			if (typeof hooks.willUnmount === 'function') {
				this.dispatchResult(hooks.willUnmount)
			}
		}

		render() {
			return createElement(BaseComponent, this.props)
		}
	}
}

export default withLifecycleDispatch
