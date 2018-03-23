import React, { Component, Fragment } from 'react';
import { connect } from '../../../../store'
import { loadDrinks, getDrinks } from '../../../drinks/redux'
import { compose } from '../../../../utils/functions'
import withLifecycleDispatch from '../../../../hocs/withLifecycleDispatch'
import withState from '../../../../hocs/withState'
import BarView from './BarView'

const mapActionsToProps = (setState) => ({
	onAdd: (drink_id) => setState((prevState) => {
		const { order } = prevState
		return ({
			order: {
				...order,
				[drink_id]: order[drink_id] ? order[drink_id] + 1 : 1
			}
		})
	}),
	onRemove: (drink_id) => setState((prevState) => {
		const { order } = prevState
		return ({
			order: {
				...order,
				[drink_id]: order[drink_id] && order[drink_id] > 1 ? order[drink_id] - 1 : undefined
			}
		})
	})
})

const mapStateToProps = (state, props) => {
	const { order } = props;
	const drinks = getDrinks(props.match.params.id)(state)

	return ({
		drinks,
		order_lineitems: Object.keys(order).filter(x => order[x]).map((id) => ({ ...drinks.find(x => x.id === Number(id)), quantity: order[id] })),
	})
}

export default compose(
	withState({ order: {} }, mapActionsToProps),
	withLifecycleDispatch({
		didMount: ({ dispatch }) => dispatch(loadDrinks())
	}),
	connect(mapStateToProps)
)(BarView)


