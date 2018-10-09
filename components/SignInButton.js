import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class SignInButton extends React.Component {
	constructor(props) {
		super(props);

		this.renderMaterialButton = this.renderMaterialButton.bind(this);
	}
	renderIconButton() {
		return (
			<IconButton href="/login">
				<ExitToAppIcon />
			</IconButton>
		)
	}

	renderMaterialButton() {
		return (
			<Button href="/login" variant={this.props.variant ? this.props.variant : "text"} color="inherit">
				Login
			</Button>
		)
	}

  	render() {
		if (!this.props.userState.username) {
			switch (this.props.variant) {
				case "icon":
					return this.renderIconButton();
				default:
					return this.renderMaterialButton();
			}
		} else {
			return ''
		}
	}
}

function mapStateToProps (state) {
  const { userState } = state
  return { userState }
}

export default connect(mapStateToProps)(SignInButton)
