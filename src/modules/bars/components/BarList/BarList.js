import React from 'react';
import { Route, Link } from 'react-router-dom'
import BarView from '../BarView'

function BarList({ bars = [] }) {
	return (
		<div style={{ display: 'grid', gridTemplateColumns: '240px auto' }}>
			<ol>{ bars.map(x => <li key={x.id}><Link to={`/bars/${x.id}`}>{x.name}</Link></li>) }</ol>
			<Route exact path="/bars/:id" component={BarView} />
		</div>
	)
}

export default BarList
