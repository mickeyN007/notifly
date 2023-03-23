import React, { Component } from 'react'

import { Link } from "react-router-dom";
import { mySettings } from './../../settings'
import  bcrypt from 'bcryptjs'

import LoadingScreen from './../helpers/loadingScreen'

import '../../css/login.css'

import {
	saveData,
	getUserFiles,
	getUserFolders,
	getUserTeamsB
} from './../helpers/auth.js'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }
  render() {
    return (
      <div style={styles.container}>
				<div style={styles.subCon}>
					<div style={styles.label}><b>Email</b></div>
					<input
						onChange={(e) => this.setState({email: e.target.value})}
						placehoder="Email"
						type='email' style={styles.input}
					/>

					<span style={styles.label}><b>Password</b></span>
					<input
						onChange={(e) => this.setState({password: e.target.value})}
						placehoder="Pssword"
						type='password'
						style={styles.input}
					/>

					<div style={styles.span}>Trouble logging in? <Link to='/recover'>Recover your account.</Link></div>
					<div style={styles.span}>Don't have an account? <Link to='/register'>Register</Link></div>

					<div className='login-btn' onClick={this.login.bind(this)}>Sign in</div>
				</div>
      </div>
    )
  }
  toggleLoading(loading) {
    this.props.toggleLoading(loading)
  }
	updateLoginStat(stat) {
		this.props.updateLoginStat(stat)
	}
  login() {
    const { email, password } = this.state
    var body;
    if (/\S/.test(email) && /\S/.test(password)) {
			this.toggleLoading(true)
			const {method, headers} = mySettings.optionsB
			body = JSON.stringify({email, password})
			var options = {body, method, headers}
			fetch(mySettings.serverID+'api/login', options)
			.then(data => data.json())
			.then (data => {
				let { status, token, msg } = data
				if (status){
					saveData('user', token.user)
					saveData('token', token.token)
					this.toggleLoading(false)
					this.updateLoginStat(true)
				}
				else {
					this.toggleLoading(false)
					alert(msg)
				}
			})
			.catch(err =>{
				alert("We are having troubles connecting to our servers at the moment. Please check your internet connection and try again"); this.toggleLoading(false)
			})
		}
    else{
      alert('Please fill all fields!')
    }
  }
  storeSession(token) {
    localStorage.setItem('token', JSON.stringify(token))
  }
  isLoggedIn(token) {
    return localStorage.getItem('token') ? true : false
  }
  logOut() {
    localStorage.removeItem('token')
  }
  goToAccount(token) {
    /*this.storeSession(token)
    this.props.history.push({
      pathname: '/account',
      state: {
        username: token.user.name,
      }
    })
    window.location.href='/account'*/
  }
}

const styles = {
  container: {
		width: '70%',
		margin: 'auto',
		border: '1px solid #d3ced2',
		padding: '40px 20px',

  },
	subCon: {
		width: '90%',
		margin: 'auto',
	},
  input: {
    padding: '2.5%',
    width: '90%',
    display: 'block',
		marginBottom: '20px'
  },
	btn: {
		backgroundColor: '#C12DBC',
		color: '#ffffff',
		fontSize: '0.8rem',
    padding: (window.innerWidth<=991) ? '8px 16px' : '16px 32px',
		borderStyle: 'none',
		marginTop: 20,
		fontWeight: 600,
		borderRadius: '50px',
		width: (window.innerWidth<=991) ? '20%' : '7%',
		display: 'flex',
    cursor: 'pointer',
		justifyContent: 'center'
  },
  label: {
    display: 'flex',
		fontSize: '.9em',
		paddingBottom: '.2em'
  },
	span: {
		display: 'flex',
		paddingBottom: '.3em'
	}
}
