import React, { Component } from 'react'

import { Link, useNavigate, Navigate } from "react-router-dom";

import './../../css/dashboard.css'
import SideBar from './sideBar.js'
import Main from './main.js'

import {
	getData,
	isLoggedIn
} from './../helpers/auth.js'

export default class Dashboard extends Component {
	render() {
		const { loggedIn } = this.props
		if (loggedIn) {
			var user = getData('user')
			var files = getData('files')
			var folders = getData('folders')
			var teams = getData('teams')
			console.log(files)
			return (
				<div className='dashboard-container'>
					<SideBar files={files} folders={folders} teams={teams} />
					<Main user={user} files={files} showSideBar={this.showSideBar.bind(this)} hideSideBar={this.hideSideBar.bind(this)} />
				</div>
			)
		}
		else {
			return <Navigate to='/login' replace />
		}
	}
	showSideBar() {
		let sidebar = document.getElementById("sidebar");
		sidebar.classList.add("openSidebar");
		let closeMenu = document.getElementById("closeMenu");
		closeMenu.classList.add("show-close-menu");
		closeMenu.classList.remove("hide-close-menu");
	}
	hideSideBar() {
		let sidebar = document.getElementById("sidebar");
		sidebar.classList.remove("openSidebar");
		let closeMenu = document.getElementById("closeMenu");
		closeMenu.classList.remove("show-close-menu");
		closeMenu.classList.add("hide-close-menu");
	}
}
