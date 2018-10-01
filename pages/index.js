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
		this.currentSection = 0;

		this.handleScroll = this.handleScroll.bind(this);
		this.scrollForward = this.scrollForward.bind(this);
		this.scrollBack = this.scrollBack.bind(this);
		this.temporarilyDisableScrollEvent = this.temporarilyDisableScrollEvent.bind(this);
	}

	componentDidMount() {
			this.refs = [
				0,
				window.innerHeight,
				window.innerHeight * 2,
				window.innerHeight * 3
			];
			window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	temporarilyDisableScrollEvent() {
		window.removeEventListener('scroll', this.handleScroll);
		setTimeout(() => {
			window.addEventListener('scroll', this.handleScroll);
		}, 600);
	}

	scrollBack() {
		if (this.currentSection != 0) {
			this.temporarilyDisableScrollEvent();
			this.currentSection -= 1;
			window.scrollTo({ top: this.refs[this.currentSection], behavior: "smooth", left: 0 });
		}
	}

	scrollForward() {
		if (this.refs.length != this.currentSection + 1) {
			this.temporarilyDisableScrollEvent();
			this.currentSection += 1;
			window.scrollTo({ top: this.refs[this.currentSection], behavior: "smooth", left: 0 });
		}
	}
	
	handleScroll(e) {
		e.preventDefault();
		var st = window.pageYOffset || document.documentElement.scrollTop;
   	(st > this.refs[this.currentSection]) ? this.scrollForward() : this.scrollBack();
	}

  render () {
		const { classes } = this.props;
    return (
		<div>
			<GlobalLoader />
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
		</div>
    )
	}
}

Index.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Index))
