import React, { Component } from 'react'

import { Link, Outlet, Navigate, useLocation } from 'react-router-dom'

import Register from './register'
import Login from './/login'
import LoadingScreen from './../helpers/loadingScreen'

import logo from './../../images/logo.jpeg'
import './../../css/loginRegister.css'

import { isLoggedIn } from './../helpers/auth.js'

export default class LoginRegister extends Component {
	constructor() {
		super()
		this.state = {
      view: 'login',
      loading: false,
    }

	}
	render () {
		if (!this.props.loggedIn) {
			return (
				<div className='container'>
					<div className='lr-logoContainer'>
						<Link to='/'>
							<img src={logo} className="logo-img" />
						</Link>
					</div>
					<div style={styles.welcome}>Welcome to Decyfer</div>

					<div className='loginRegisterContainer'>
						<Outlet />
					</div>
					{this.state.loading && <LoadingScreen />}
				</div>
			)
		}
		else {
			return <Navigate to='/dashboard' replace />
		}
	}

  toggleLoading(loading) {
    this.setState({loading})
  }

}

const styles = {
	welcome: {
		alignSelf: 'center',
		fontSize: '1.6rem',
		fontWeight: 'bold',
		paddingTop: '3.5%',
		paddingBottom: '3.5%'
	}
}
