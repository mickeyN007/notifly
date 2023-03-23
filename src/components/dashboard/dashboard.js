import React, { Component } from 'react'

import { Link, useNavigate, Navigate } from "react-router-dom";

import './../../css/dashboard.css'
import SideBar from './sideBar.js'
import Main from './main.js'
import Products from './products.js'

import {
	getData,
	isLoggedIn
} from './../helpers/auth.js'

import { mySettings } from './../../settings.js'

export default class Dashboard extends Component {
	constructor() {
		super()
		this.state = {
			view: 'main'
		}
	}
	render() {
		const { loggedIn, theme, products } = this.props
		if (loggedIn) {
			var user = getData('user')
			let themeColor = theme ? mySettings.colorb : mySettings.color
			let themeColorB = theme ? 'black' : 'white'
			let themeColorC = theme  ? 'white' : 'black'

			return (
				<div className='dashboard-container'>
					<SideBar
						changeView={this.changeView.bind(this)}
						themeColor={themeColor}
						themeColorB={themeColorB}
						themeColorC={themeColorC}
					/>
					{this.renderView(products, user)}
				</div>
			)
		}
		else {
			return <Navigate to='/login' replace />
		}
	}
	renderView(products, user) {
		let { view } = this.state
		const views = {
			'main': <Main
								user={user}
								showSideBar={this.showSideBar.bind(this)}
								hideSideBar={this.hideSideBar.bind(this)}
							/>,
			'products': <Products
										products={products}
										showSideBar={this.showSideBar.bind(this)}
										hideSideBar={this.hideSideBar.bind(this)}
									/>
		}
		return views[view]
	}
	changeView(view) {
		this.setState({view})
	}
	showSideBar() {
		this.props.showSideBar()
	}
	hideSideBar() {
		this.props.hideSideBar()
	}
}
