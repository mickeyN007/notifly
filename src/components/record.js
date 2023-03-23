import React, { useCallback } from 'react';

import { mySettings } from './../../settings.js'

import { IconContext } from "react-icons";
import { GrPlayFill } from "react-icons/gr"
import { BsPauseFill } from "react-icons/bs"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Record = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
	//SpeechRecognition.applyPolyfill(SpeechRecognitionPolyfill)

	const processTranscript = useCallback(() => {
    SpeechRecognition.stopListening()
		props.trans(transcript)
  }, []);

	const close = useCallback(() => {
		/*console.log(listening)
		if (listening) {
			SpeechRecognition.stopListening()
			console.log(transcript)
		}*/

		SpeechRecognition.stopListening()
		props.close(transcript)
  }, []);

	const startRecording = useCallback(() => {
		SpeechRecognition.startListening({ continuous: true })
  }, []);


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

	return (
		<div className='fullScreenModal'>
			<div className='recordingInterface-main'>
				<div className='close-btn' onClick={close}>X</div>
				<div className='circle'>
					<div>
					{
						listening ?
							<div className='play' onClick={processTranscript}>
								<IconContext.Provider value={{fontWeight: 'bold',  size: '3.5em', color: mySettings.colorb }}>
									<BsPauseFill />
								</IconContext.Provider>
							</div> :
							<div className='play' onClick={startRecording}>
								<IconContext.Provider value={{fontWeight: 'bold',  size: '3.5em', color: mySettings.colorb }}>
									<GrPlayFill />
								</IconContext.Provider>
							</div>
					}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Record

