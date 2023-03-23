import React, { Component } from 'react'

import logo from './../../images/logo.png'
import TreeRender from './../Tree/treeRender.js'

import { Link } from 'react-router-dom'

export default class SideBar extends Component {
	constructor() {
		super()
		this.state = {
			showFolders: false,
			showTeams: false,
			clickedFolders: []
		}
	}

	render() {
		let { showFolders } = this.state
		let { teams, folders, files } = this.props
		let upArr = <span>&nbsp;&nbsp;<i className="arrow up"></i></span>
		let dwnArr = <span>&nbsp;&nbsp;<i className="arrow down"></i></span>

		return (
			<div id="sidebar" className='sideBarContainer'>
				<Link to='/dashboard' className='db-logo-container'>
					<img src={logo} className='db-logo' />
				</Link>
				<div>
					<div className='sb-links'>Home</div>
					<div>{this.displayFolders(showFolders, upArr, dwnArr)}</div>
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

	displayFolders(showFolders, upArr, dwnArr) {
		return (
			<div className='sb-links' onClick={this.showFolders.bind(this)}>
				<span>Folders</span>
				{showFolders==false && upArr}
				{showFolders==true && dwnArr}
				{
				 showFolders &&
						<div className='sb-links sb-links-b'>
							<TreeRender />
						</div>
				}
			</div>
		)
		/*
		let upArr = <span>&nbsp;&nbsp;<i className="arrow down"></i></span>
		let dwnArr = <span>&nbsp;&nbsp;<i className="arrow up"></i></span>

		const { folders, files } = this.props
		let tress = []
		let idMappings = []
		let idMapping
		let node
		let data
		let root
		// construct tree structure
		for (let folderN in Object.keys(folders)) {
			data = folders[folderN]
			idMapping = data.reduce((acc, el, i) => {
				acc[el.parent] = i;
				return acc;
			}, {});

			data.forEach((el) => {
				// Handle the root element
				if (el.parent === null) {
					root = el;
					return;
				}
				// Use our mapping to locate the parent element in our data array
				const parentEl = data[idMapping[el.parent]];
				// Add our current el to its parent's `children` array
				parentEl.children = [...(parentEl.children || []), el];
			});
		}
		trees.push(root)
		*/
	}

	showFolders() {
		let sidebar = document.getElementById("sidebar");

		this.setState({showFolders: !this.state.showFolders})
	}

	folderClick(indx) {
		let { clickedFolders } = this.state
		if (clickedFolders.indexOf(indx) > -1) {
			clickedFolders.splice(indx,1)
			this.setState({clickedFolders})
		}
		else {
			clickedFolders.push(indx)
		}
	}
}
