import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
	dim: {
		position: "fixed",
		height: "100vh",
		width: "100vw",
		backgroundColor: "rgb(255,255,255,0.7)",
		textAlign: "center"
	},
	progress: {
		margin: "auto",
		marginTop: "50vh"
	}
};

class GlobalLoader extends React.Component {
  	render() {
		const { globalState, classes } = this.props;
     	return globalState.globalLoaderActive ? (
			<div className={classes.dim}>
				<CircularProgress className={classes.progress} thickness={2} size={40} />
			</div>
		) : ''
	}
}

function mapStateToProps (state) {
  const { userState, globalState } = state
  return { userState, globalState }
}

GlobalLoader.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GlobalLoader))
