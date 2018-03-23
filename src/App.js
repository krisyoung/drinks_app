import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BarList from './modules/bars/components/BarList'

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route path="/" component={BarList} />
				</div>
			</Router>
		)
	}
}

export default App
