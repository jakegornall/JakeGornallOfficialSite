import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../components/SideMenu';
import GlobalLoader from '../components/GlobalLoader'
import {login} from '../reduxStore';

import bkgImage from '../images/mountain-path.jpg';
import SideMenu from '../components/SideMenu';

const styles = {

};

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req, query }) {
		query.userState ? reduxStore.dispatch(login(query.userState)) : '';
		return {};
	}

  	render () {
		const { classes } = this.props;
    	return (
			<div>
				<GlobalLoader />
				<SideMenu />
			</div>
    	)
	}
}

Index.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Index))
