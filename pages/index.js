import React from 'react'
import {connect} from 'react-redux'
import Header from '../components/Header'
import {login} from '../reduxStore'

import bkgImage from '../images/mountain-path.jpg'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req, query }) {
		query.userState ? reduxStore.dispatch(login(query.userState)) : ''
		return {}
  }

  render () {
    return (
			<div>
				<Header />
				<img src={bkgImage} style={{ width: "100%"}} />
			</div>
    )
  }
}

export default connect()(Index)
