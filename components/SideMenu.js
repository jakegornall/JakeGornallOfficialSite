import {connect} from 'react-redux'
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import LogoutButton from './LogoutButton';
import SignInButton from './SignInButton'

const styles = {
	root: {
	  	flexGrow: 1,
	},
	drawerPaper: {
		padding: "10px"
	},
	drawerSection: {
		height: "calc(100% / 3)",
		display: "table"
	},
	alignMiddle: {
		display: "table-cell",
		verticalAlign: "middle"
	},
	alignTop: {
		display: "table-cell",
		verticalAlign: "top"
	},
	alignBottom: {
		display: "table-cell",
		verticalAlign: "bottom"
	},
	icon: {
		color: "#4d4d4e"
	},
	selectedIcon: {
		color: "#08fdd8"
	}
};

class Header extends React.Component {

  	render() {
		const { classes } = this.props;
     	return (
			<div className={classes.root}>
				<Drawer
					variant="permanent"
					anchor="left"
					classes={{ paper: classes.drawerPaper }}
				>
					<div className={classes.drawerSection}>
						<div className={classes.alignTop}>
							<SignInButton variant="icon" />
          					<LogoutButton />
						</div>
					</div>
					<div className={classes.drawerSection}>
						<div className={classes.alignMiddle}>
							<SignInButton variant="icon" />
          					<LogoutButton />
						</div>
					</div>
					<div className={classes.drawerSection}>
						<div className={classes.alignBottom}>
							<SignInButton variant="icon" />
          					<LogoutButton />
						</div>
					</div>
      			</Drawer>
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
