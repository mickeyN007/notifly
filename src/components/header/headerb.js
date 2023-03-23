import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { IconContext } from "react-icons";

import {
	MdMenu,
} from 'react-icons/md'
import { MdEmail, MdLocationOn } from 'react-icons/md'

import './../../css/header.css'
import logo from './../../images/logo.png'

export default class Header extends Component {
	constructor() {
		super()
		this.state = {
			showMenu: false
		}
	}
	render() {
		return (
			<div className="h-container">
				<div className="h-subCon">
				<Link to='/' className="logoContainer">
					<img src={logo} style={{height: '100%', width: '100%', objectFit: 'contain'}}/>
				</Link>
				<div className="links">
					<Link to='/about' className="link">About Us</Link>
					<Link to='/contact' className="link">Contact</Link>
					<Link to='/offer' className="link">Plans</Link>
				</div>
				<div className="misc">
					<Link to='/login' className="link">Login</Link>
					<Link to='/register' style={{color: '#fac1aa'}} className="link">Start Trial</Link>
				</div>
				<div className="menu-btn" onClick={this.toggleMenu.bind(this)}>
						<div className="stroke"></div>
						<div className="stroke"></div>
						<div className="stroke"></div>
				</div>
				{this.state.showMenu && <div className="linksB">
					<Link to='/about' className="linkB">About Us</Link>
					<Link to='/contact' className="linkB">Contact</Link>
					<Link to='/plans' className="link">Plans</Link>
				</div>
				}

			</div>
			</div>
		)
	}
	toggleMenu() {
		if (this.state.showMenu)
			document.querySelector('body').style.overflowY = 'scroll'
		else
			document.querySelector('body').style.overflowY = 'hidden'
		this.setState({showMenu: !this.state.showMenu})
	}
}

const styles = {



}
