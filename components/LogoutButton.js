import {connect} from 'react-redux'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import {logout} from '../reduxStore'

class LogoutButton extends React.Component {
	constructor(props) {
		super(props);

		this.sendLogoutRequest = this.sendLogoutRequest.bind(this);
	}

	sendLogoutRequest() {
		const {dispatch} = this.props;
		axios.post("/logout")
			.then((res) => {
				if (res.data && res.data.success) {
					this.props.redirect ? window.location = "/" : dispatch(logout());
				}
			})
			.catch((e) => {
				console.log(e);
			})
	}


  	render() {
     	return this.props.userState.username ? (
			<Button onClick={this.sendLogoutRequest} variant={this.props.variant ? this.props.varient : "text"} color="inherit">
				Sign Out
			</Button>
		) : ''
	}
}

function mapStateToProps (state) {
  const { userState } = state
  return { userState }
}

export default connect(mapStateToProps)(LogoutButton)
