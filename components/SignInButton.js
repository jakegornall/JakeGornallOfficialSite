import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';

class SignInButton extends React.Component {
  	render() {
     	return this.props.userState.username ? '' : (
			<Button href="/login" variant={this.props.variant ? this.props.varient : "text"} color="inherit">
				Login
			</Button>
		)
	}
}

function mapStateToProps (state) {
  const { userState } = state
  return { userState }
}

export default connect(mapStateToProps)(SignInButton)
