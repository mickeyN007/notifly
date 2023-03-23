import React, { useCallback, useState } from 'react';

import { mySettings } from './../../settings.js'
import './../../css/popup.css'
import './../../css/select.css'

import Select from './select.js'

const PopUp = (props) => {
	const [fName, setFileName] = useState("No file selected");

	const close = useCallback(() => {
		props.close()
  }, []);

	const onFileChange = useCallback((event) => {
		props.onFileChange(event)
	}, []);

	const transcribe = useCallback(() => {
		props.transcribe()
	}, []);

	return (
		<div className='fullScreenModal'>
			<div className='recordingInterface-main'>
				<div className='close-btn' onClick={close}>X</div>
				<div className='message'>
					<div className='popup-header'>Select audio and language to transcribe to</div>
					<div className='choose-file'>
						<input type='file' className='file-picker' title='Choose audio file' onChange={onFileChange} />
					</div>
					<div className='file-info'>
						<div style={{display: 'flex'}}>
							<span className='select'>Select Transcript Language:</span>
							<span style={{padding: '1vw 0 0 1vw'}}><Select /></span>
						</div>
						{props.isFile==true &&<div className='transcribe-btn' onClick={transcribe}>Transcribe</div>}
						{props.isFile==false &&<div className='transcribe-btn disabled'>Transcribe</div>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PopUp

