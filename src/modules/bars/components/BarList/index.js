import { connect } from '../../../../store'
import { loadBars, getBars } from '../../redux'
import { compose } from '../../../../utils/functions'
import withLifecycleDispatch from '../../../../hocs/withLifecycleDispatch'
import BarList from './BarList'

export default compose(
	 withLifecycleDispatch({
		didMount: ({ dispatch }) => dispatch(loadBars())
	}),
	connect((state, props) => ({
		bars: getBars(state)
	})
))(BarList)
