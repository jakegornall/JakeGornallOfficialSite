import {connect} from 'react-redux'
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
		const { Component, classes, src } = this.props;
     	return (
			<div className={classes.root}>
				<img src={src} />
				<div>
					<Component />
				</div>
    		</div>
		)
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Header))
