import {connect} from 'react-redux'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {login} from '../reduxStore'

class SignUpApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			displayName: '',
			email: '',
			usernameError: false,
			passwordError: false,
			displayNameError: false,
			emailError: false,
			submitDisabled: true,
			errorMessage: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.makeSignUpCall = this.makeSignUpCall.bind(this);
	}
	// TODO: add prop that determines wether to redirect or simply update app state

	handleChange(e) {
		e.preventDefault();
		let newState = this.state;
		newState[e.currentTarget.id] = e.currentTarget.value;

		let { username, password, email, displayName } = newState;

		if (e.currentTarget.value.length <= 0) {
			newState.errorMessage = "All fields must be filled out.";
		}

		if (username.length >= 1 && password.length >= 1 && displayName.length >= 1 && email.length >= 1) {
			newState.errorMessage = "";
			newState.submitDisabled = false;
		} else {
			newState.submitDisabled = true;
		}

		newState[e.currentTarget.id + "Error"] = (e.currentTarget.value.length <= 0);

		this.setState(newState);
	}

	handleSubmit(e) {
		e.preventDefault();

		let { username, password, email, displayName } = this.state;

		if (username.length >= 1 && password.length >= 1 && displayName.length >= 1 && email.length >= 1) {
			this.makeSignUpCall();
		} else {
			let newState = this.state;
			newState.errorMessage = "both username and password fields are required!"
			newState.usernameError = true;
			newState.passwordError = true;
			newState.emailError = true;
			this.setState(newState);
		}
	}

	makeSignUpCall() {
		let data = {
			username: this.state.username,
			password: this.state.password,
			displayName: this.state.displayName,
			email: this.state.email
		};

		axios.post('/signup', data, {
			headers: {
					'Content-Type': 'application/json',
			}
		})
		.then(function (response) {
			let redirectUrl = this.props.redirectUrl ? this.props.redirectUrl : "/";
			let newState = this.state;
			if (response.data && response.data.success) {
				this.props.redirect ? window.location = redirectUrl : this.props.dispatch(login(response.data.userState));
				newState.username = '';
				newState.password = '';
				newState.email = '';
				newState.displayName = '';
				newState.submitDisabled = true;
				this.setState(newState);
			} else if (response.data && response.data.message) {
				let newState = this.state;
				newState.errorMessage = response.data.message;
				this.setState(newState);
			} else {
				let newState = this.state;
				newState.errorMessage = "We're sorry, something went wrong. Please try again.";
				this.setState(newState);
			}
		}.bind(this))
		.catch(function (error) {
			console.log(error);
		});
	}

  render() {
     return (
		 	<div style={{ padding: 10, maxWidth: 500, margin: "auto" }}>
				<Typography align="center" variant="headline">Sign Up</Typography>
					<TextField
          				id="username"
          				label="Username"
          				value={this.state.username}
          				onChange={this.handleChange}
          				margin="normal"
						variant="outlined"
						fullWidth={true}
						error={this.state.usernameError}
        			/>
					<TextField
          				id="displayName"
						label="Display Name"
          				value={this.state.displayName}
          				onChange={this.handleChange}
          				margin="normal"
						variant="outlined"
						fullWidth={true}
						error={this.state.displayNameError}
        			/>
					<TextField
          				id="password"
						label="Password"
						type="password"
          				value={this.state.password}
          				onChange={this.handleChange}
          				margin="normal"
						variant="outlined"
						fullWidth={true}
						error={this.state.passwordError}
        			/>
					<TextField
          				id="email"
						label="Email Address"
          				value={this.state.email}
          				onChange={this.handleChange}
          				margin="normal"
						variant="outlined"
						fullWidth={true}
						error={this.state.emailError}
        			/>
					<Button
						style={{ marginTop: 15 }}
						variant="outlined"
						color="primary"
						fullWidth={true}
						size="large"
						disabled={this.state.submitDisabled}
						onClick={this.handleSubmit}>
						SUBMIT
      				</Button>
					<Typography
						color="error"
						align="center">
						{this.state.errorMessage}
					</Typography>
    	</div>
		 )
	}
}

function mapStateToProps (state) {
  const { userState } = state
  return { userState }
}

export default connect(mapStateToProps)(SignUpApp)
