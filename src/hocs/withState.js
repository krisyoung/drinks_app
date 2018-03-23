import { createElement, Component } from 'react';

function withState(initialState = {}, actions = {}) {
	return function (BaseComponent) {
		class WithState extends Component {
			constructor(props) {
				super(props);
				this.state = typeof initialState === 'function' ? initialState(props) : initialState;
				this.setState = this.setState.bind(this);
			}

			render() {
				const { state, props, setState } = this;

				return createElement(BaseComponent, {
					...props,
					...state,
					...actions(setState, state, props)
				});
			}
		}

		WithState.displayName = `WithState(${BaseComponent.displayName})`;

		return WithState;
	};
}

export default withState;
