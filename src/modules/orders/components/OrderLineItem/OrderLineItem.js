import React from 'react'
import { formatCurrency, truncateString } from '../../../../formatters'

function OrderLineItem({ id, name, price, quantity, onAdd, onRemove }) {
	return (
		<div><button onClick={() => onAdd(id)}>+</button> <button disabled={!id} onClick={() => onRemove(id)}>-</button> {truncateString(24)(name)}: { formatCurrency(price) } {`x ${quantity}`} = {formatCurrency(quantity * price)}</div>
	)
}

export default OrderLineItem
