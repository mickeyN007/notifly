import React, { Component } from 'react'

import './../../css/main.css'
import Record from './record.js'
import PopUp from './popUp.js'
import LoadingScreen from './../helpers/loadingScreen.js'

import { IconContext } from "react-icons";
import { IoMenuSharp } from "react-icons/io5"

export default class Main extends Component {
	constructor() {
		super()
		this.state = {
			showProfileSettings: false,
			newDropDwn: false,
			showRecordingInterdface: false,
			trans: '',
			showPopUp: false,
			selectedFile: null,
			isLoading: false
		}
	}

	render() {
		let { user, files } = this.props
		let { name } = user

		let {
			showProfileSettings, newDropDwn,
			showRecordingInterface, showPopUp, isLoading
		} = this.state

		return (
			<div className='main-container'>
				<div className='top-nav'>
					<div onClick={this.showSideBar.bind(this)}>
						<IconContext.Provider value={{fontWeight: 'bold',  size: '3.5em'}}>
							<IoMenuSharp />
						</IconContext.Provider>
					</div>
					<div id="closeMenu" onClick={this.hideSideBar.bind(this)} className="hide-close-menu">
						X
					</div>
				</div>
				<div className='welcome-div'>
					<div onClick={this.toggleProfileSettings.bind(this)}>
						<span className='welcome'>
							Welcome, {name}!&nbsp;&nbsp;
						</span>
						{showProfileSettings==false && <span>&nbsp;<i className="arrow-m up"></i></span>}
						{showProfileSettings==true && <span>&nbsp;<i className="arrow-m down"></i></span>}
					</div>
					<input placeholder='Search...' className='search' tabIndex="1"/>
				</div>
				<div className='db-header'>
					<div className='upload-btn' onClick={this.openRecordingInterface.bind(this)}>
						<span><i className="fa fa-microphone mic"></i></span>
						<span>Record</span>
					</div>
					<div className='upload-btn' onClick={this.openPopUp.bind(this)}>
						<span className='small-circle'></span>
						<span>Upload</span>
					</div>
				</div>
				<div className='recent-decyferings'>
					Recent Decyfer-ings
				</div>
				{files.length>0 &&
					<div className='db-container'>
						<span className='f-style-b'>FILE NAME</span>
						<span className='f-style-b'>UPLOADED</span>
						<span className='f-style-b'>LAST EDITED</span>
						<span className='f-style-b'>STATUS</span>
					</div>
				}
			{files.length==0 &&
					<div className='no-file db-container'>
						No file available
					</div>
			}
			{
				showRecordingInterface &&
					<Record
						close={this.closeRecordingInterface.bind(this)}
						trans={this.processTranscript.bind(this)}
					/>
			}
			{
				showPopUp &&
					<PopUp
						isFile={this.state.selectedFile!==null}
						close={this.closePopUp.bind(this)}
						transcribe={this.transcribe.bind(this)}
						onFileChange={this.onFileChange.bind(this)}
					/>
			}
			{
				isLoading &&
					<LoadingScreen />
			}
			</div>
		)
	}

	toggleProfileSettings() {
		let { showProfileSettings } = this.state
		this.setState({showProfileSettings: !showProfileSettings})
	}

	showSideBar() {
		this.props.showSideBar()
	}
	hideSideBar() {
		this.props.hideSideBar()
	}
	toggleNewDropDown() {
		let { newDropDwn } = this.state
		this.setState({newDropDwn: !newDropDwn})
	}

	openRecordingInterface() {
		let { showRecordingInterface } = this.state
		this.setState({showRecordingInterface: true})
	}

	closeRecordingInterface(transcript) {
		//console.log(transcript)
		this.setState({showRecordingInterface: false})
	}

	closePopUp() {
		this.setState({showPopUp: false})
	}

	openPopUp() {
		this.setState({showPopUp: true})
	}

	showLoadingScreen() {
		let { isLoading } = this.state
		this.setState({isLoading: true})
	}

	hideLoadingScreen() {
		let { isLoading } = this.state
		this.setState({isLoading: false})
	}

	createNewTeam() {
		//
	}

	createNewFolder() {
		//
	}

	processTranscript(transcript) {
		//alert(transcript)
	}

	 onFileChange(event) {
		 // get file
		 let tmpFile = event.target.files[0]
		 if (tmpFile !== null && tmpFile !== undefined) {
				this.setState({ selectedFile: tmpFile });
		 }
		 else {
				this.setState({ selectedFile: null });
			 }
  }

	transcribe() {
		this.showLoadingScreen()
		this.upload()
		this.hideLoadingScreen()
		this.closePopUp()
	}

	upload() {
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"myFile",
			this.state.selectedFile,
			this.state.selectedFile.name
		);

		// Details of the uploaded file
		console.log(this.state.selectedFile);
		this.setState({selectedFile: null})

		// Request made to the backend api
		// Send formData object
		// axios.post("api/uploadfile", formData);
	}
}
