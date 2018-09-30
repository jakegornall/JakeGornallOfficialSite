import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import GlobalLoader from '../components/GlobalLoader'
import {login} from '../reduxStore';

import bkgImage from '../images/mountain-path.jpg';

const styles = {
	landingSection: {
		backgroundImage: `url(${bkgImage})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		height: "100vh",
		paddingTop: 20
	}
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
			<section className={classes.landingSection}>
				<Header />
			</section>
		</div>
    )
  }
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Index))
