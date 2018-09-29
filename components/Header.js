import {connect} from 'react-redux'
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LogoutButton from './LogoutButton';
import SignInButton from './SignInButton'

const styles = {
	root: {
	  	flexGrow: 1,
	},
	grow: {
	  	flexGrow: 1,
	},
	menuButton: {
	  	marginLeft: -12,
	  	marginRight: 20,
	}
};

class Header extends React.Component {

  	render() {
		const { classes, userState } = this.props;
		const greeting = userState.displayName ? `Hi, ${userState.displayName}!` : '';
     	return (
			<div className={classes.root}>
      			<AppBar position="fixed" color="inherit">
        			<Toolbar>
          				<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            				<MenuIcon />
          				</IconButton>
          				<Typography variant="title" color="inherit" className={classes.grow}>
            				Portfolio Site
          				</Typography>
						<Typography variant="caption" color="inherit">
							{greeting}
          				</Typography>
						<SignInButton />
          				<LogoutButton />
        			</Toolbar>
      			</AppBar>
    		</div>
		)
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
	const { userState } = state
	return { userState }
}

export default connect(mapStateToProps)(withStyles(styles)(Header))
