import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as homeActions from './homeActions'

// component
export function Home({}) {
  return <div>
		<h1>hello,console-cli</h1>
	</div>
}

//container
function mapStateToProps(state) {
	return {
		...state
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		...homeActions
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
