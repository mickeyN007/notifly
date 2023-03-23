import React, { Component } from 'react'

import logo from './../../images/logo.png'

import { Link } from 'react-router-dom'

export default class SideBar extends Component {
	constructor() {
		super()
		this.state = {
		}
	}

	render() {
		const { themeColor, themeColorB, themeColorC } = this.props
		return (
			<div id="sidebar" className='sideBarContainer' style={{backgroundColor: themeColor, color: themeColorB}}>
				<Link to='/dashboard' className='db-logo-container'>
					<img src={logo} className='db-logo' />
				</Link>
				<div>
					<div className='sb-links' onClick={this.changeView.bind(this, 'main')}>Home</div>
					<div className='sb-links' onClick={this.changeView.bind(this, 'products')}>Products</div>
				</div>
				<div>
				</div>
				<div className='nmd'>
					<div>{`Need more Decyfer-ing?`}</div>
					<div>{`Upgrade Now!`}</div>
				</div>

			</div>
		)
	}
	changeView(view) {
		this.props.changeView(view)
	}
}
