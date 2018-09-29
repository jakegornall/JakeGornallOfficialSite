import React from 'react'
import {connect} from 'react-redux'
import SignInApp from '../components/SignInApp'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const store = require('../reduxStore')

const containerStyle = {
	position: "fixed",
	display: "flex",
	alignItems: "center",
	marginTop: 100
}

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req, query }) {
		query.userState ? reduxStore.dispatch(store.login(query.userState)) : ''
		return {}
  }

  render () {
    return (
		<Grid container justify="center" spacing={24} style={containerStyle}>
			<Grid item xs={12} md={3}>
				<Paper>
					<SignInApp redirect />
				</Paper>
			</Grid>
		</Grid>
    )
  }
}

export default connect()(Index)
