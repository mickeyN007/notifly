import React, { Component } from 'react'

import { Row, Col,  } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import { mySettings } from './../../settings'
import  bcrypt from 'bcryptjs'

import {
	saveData
} from './../helpers/auth.js'

export default class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
			passwordb: '',
			type: 'Free'
    }
  }
  render() {
    return (
      <div style={styles.container}>
				<div style={styles.subCon}>
          <span style={styles.label}><b>Name</b></span>
          <input
            style={styles.input}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <span style={styles.label}><b>Email</b></span>
          <input
            style={styles.input}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          <span style={styles.label}><b>Password</b></span>
          <input
            style={styles.input}
            placeholder='Password'
            type='password'
            onChange={(e) => this.setState({password: e.target.value})}
          />
					<span style={styles.label}><b>Confirm Password</b></span>
          <input
            style={styles.input}
            placeholder='Confirm Password'
            type='password'
            onChange={(e) => this.setState({passwordb: e.target.value})}
          />

					<div>Have an account?&nbsp;<Link to='/login'>Login</Link></div>
					<div className='login-btn' onClick={this.register.bind(this)}>Register</div>
				</div>
      </div>
    )
  }

  register() {
    const { name, email, password, passwordb } = this.state
		const type = "user"
		const validated = false
    var body;
		var registerDate = new Date()
		var subscription = {start: registerDate, period: 1}

    if (/\S/.test(name) && /\S/.test(email) && /\S/.test(password) && /\S/.test(passwordb)) {
			// check if passwords match
			if (password===passwordb) {

				this.toggleLoading(true)
      //this.setState({loading: true})
      // enrypt password
      //bcrypt.hash(password, 10, function(err, hash) {

        const {method, headers} = mySettings.optionsB
        body = JSON.stringify({name, email, password, type, validated, registerDate, subscription})
        var options = {body, method, headers}
        fetch(mySettings.serverID+'api/register', options)
        .then(data => data.json())
        .then (data => {
          this.toggleLoading(false)
          if (data.status){
						const { token, user } = data.token
						saveData('user', user)
						saveData('token', token)
            window.location.href='/dashboard'

            //
          }
          else {
            alert(data.msg)
          }
        })
        .catch(err =>{
          alert("Can't connect to our servers at the moment");
          this.toggleLoading(false)
        })
			//}.bind(this))
			}
			else {
				alert("Passwords do not match")
			}
		}
    else{
      alert('Please fill all fields!')
    }
  }

  toggleLoading(loading) {
    this.props.toggleLoading(loading)
  }
}

const styles = {
	container: {
		width: '70%',
		margin: 'auto',
		border: '1px solid #d3ced2',
		padding: '40px 20px'
  },
	subCon: {
		width: '90%',
		margin: 'auto',
	},
  input: {
    padding: '2.5%',
    width: '90%',
    display: 'block',
    marginBottom: '20px',
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
		fontSize: '.9em'
  }
}
