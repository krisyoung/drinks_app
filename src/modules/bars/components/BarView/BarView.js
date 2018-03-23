import React from 'react';
import { formatCurrency } from '../../../../formatters'
import OrderLineItem from '../../../orders/components/OrderLineItem'

function BarView({ drinks = [], order, order_lineitems, onAdd, onRemove }) {
	return (
		<div style={{ display: 'grid', gridTemplateColumns: 'auto 480px' }}>
			<ol>{ drinks.map(x => (
			<li key={x.id}><button onClick={() => onAdd(x.id)}>+</button> <button disabled={!order[x.id]} onClick={() => onRemove(x.id)}>-</button> {x.name} - { formatCurrency(x.price) } { order[x.id] && `x${order[x.id]}`}</li>
		)) }</ol>
			<div>
				<ol>{ order_lineitems.map(x => <li key={x.id}><OrderLineItem { ...x } onAdd={onAdd} onRemove={onRemove} /></li>)}</ol>
				<div>{order_lineitems.reduce((total, { quantity }) => total + quantity, 0)} drinks - total: {formatCurrency(order_lineitems.reduce((total, { quantity, price }) => total + quantity * price, 0))}</div>
			</div>
		</div>
	)
}

export default BarView

