import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { IconContext } from "react-icons";

import {
	FaMoon,
	FaSun
} from 'react-icons/fa'
//import { MdEmail, MdLocationOn IoSettingsOutline} from 'react-icons/md'

import './../../css/header.css'
import logo from './../../images/logo.jpeg'

import { mySettings } from './../../settings.js'

export default class Header extends Component {
	constructor() {
		super()
		this.state = {
			showMenu: false
		}
	}
	componentDidUpdate(prevProps) {
		if (prevProps.update!==this.props.update) {
			this.forceUpdate()
		}
	}
	componentWillUnmount() {
		document.querySelector('body').style.overflowY = 'scroll'
	}


	render() {
		// set theme
		let { themeColor } = this.props
		let { showMenu } = this.state
		/*let themeIconLight =  {}//<FaSun />
		let themeIconDark = {} //<FaMoon />
		let themeIcon = (themeColor==mySettings.color) ? themeIconLight : themeIconDark
		*/
		// get href to know if to render female or male items
		let { href } = window.location
		var loc = href.split('/')[3]

		return (
			<div className="h-main-container">
				<div className="h-container" >
					<div className="h-subCon">
						<Link to='/' className="logoContainer">
							<img src={logo} style={styles.image}/>
						</Link>
						<div className="links">
							<div onClick={this.toggleTheme.bind(this)} className="h-link">
								<span>{(themeColor==mySettings.color) ? <span style={styles.bold}>&#x2600;</span> : <span style={styles.bold}>&#x263E;</span> }</span>
							</div>
							{this.displayMenuItems(loc)}
						</div>
						<div className="hamburger-section">
							<div onClick={this.toggleTheme.bind(this)} className="h-link">
								<span>
									{(themeColor==mySettings.color) ?
										<span style={{...styles.bold, ...{fontSize: '1.7rem'}}}>&#x2600;</span> :
										<span style={{...styles.bold, ...{fontSize: '1.7rem'}}}>&#x263E;</span> }
								</span>
							</div>
							{
								// display either contact us or hamburger menu icon
								// depending on route
								this.misc(loc, showMenu)
							}
							<div className={showMenu ? 'nav-menu-items' : 'nav-menu-items-b'} style={{backgroundColor: themeColor}}>
								{this.displayMenuItems(loc, true)}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	toggleTheme() {
		this.props.toggleTheme()
	}
	displayMenuItems(loc, mobile=false) {
		let { showMenu } = this.state
				// exit if location == ""
		//if (loc==="")
		//	return <Link to='/contact' className="h-link">Contact Us</Link>


		// declarations
		const menuItems = ["Flights", "Discover", "About", "Contact"]
		var tmpLink
		return menuItems.map((item, i) =>
		{
			tmpLink = "/" + item.charAt(0).toLowerCase() + item.substring(1)
			if (!mobile) {
				// create path string
				return <Link to={tmpLink} className="h-link">{item}</Link>
			}
			else {
				return <a
									className={showMenu ? 'item-link' : 'item-link-off'}
									key={i}
									href={tmpLink}>
										{item}
								</a>
			}
		})
		//return mI
	}
	toggleMenu() {
		let { showMenu } = this.state
		if (showMenu) {
			document.querySelector('body').style.overflowY = 'scroll'
		}
		else {
			document.querySelector('body').style.overflowY = 'hidden'
		}
		this.setState({showMenu: !showMenu})
	}

	misc(loc, showMenu) {
		if (loc==="") {
			return <Link to='/contact' className="h-link">Contact Us</Link>
		}
		else {
			return (
				<label htmlFor="menu-btn" className={showMenu ? "nav-menu-iconb" : "nav-menu-icon"} id="menu-icon" onClick={this.toggleMenu.bind(this)}>
					<span className={showMenu ? "icon-lineb" : "icon-line"}></span>
				</label>
			)
		}
	}
}

const styles = {
	theme: {
		display: 'flex',
	},
	image: {
		height: '100%',
		width: '100%',
		objectFit: 'contain'
	},
	bold: {
		fontWeight: 'bold',
		fontSize: '2.1rem',
		cursor: 'pointer'
	}
}
