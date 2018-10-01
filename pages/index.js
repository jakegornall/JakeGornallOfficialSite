import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactPageScroller from "react-page-scroller";
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
	},
	section: {
		height: "100vh"
	}
};

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req, query }) {
		query.userState ? reduxStore.dispatch(login(query.userState)) : '';
		return {};
	}

	constructor(props) {
		super(props);

		this.goToPage = this.goToPage.bind(this);
	}

	goToPage(pageNum) {
		this.reactPageScroller.goToPage(pageNum);
	}

  	render () {
		const { classes } = this.props;
    	return (
			<div>
				<GlobalLoader />
				<ReactPageScroller>
					<section className={classes.landingSection}>
						<Header />
					</section>
					<section className={classes.section}>
						section 1
					</section>
					<section className={classes.section}>
						section 2
					</section>
					<section className={classes.section}>
						section 3
					</section>
				</ReactPageScroller>
			</div>
    	)
	}
}

Index.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Index))
