import React, { useCallback, useState } from 'react';

import { mySettings } from './../../settings.js'
import './../../css/popup.css'
import './../../css/select.css'

import Select from './select.js'

const PopUp = (props) => {
	let { name:tName, images:tImg, category:tCat, sex:tSex, qty:tQty, price:tPrice, color:tColor } = props.product
	const [fName, setFileName] = useState("No file selected");
	const [name, setName] = useState(tName)
	const [images, setImages] = useState(tImg)
	const [category, setCategory] = useState(tCat)
	const [sex, setSex] = useState(tSex)
	const [qty, setAvailable] = useState(tQty)
	const [price, setPrice] = useState(tPrice)
	const [color, setColor] = useState(tColor)

	const close = useCallback(() => {
		props.close()
  }, []);

	const saveChanges = useCallback(() => {
		/*props.saveChanges(
			{name,images, category, sex, qty, price, color }
		)*/
	}, []);

	const displayImages = () => {
		const { imgStr } = mySettings
		return images.map((tImg, key) =>
			<div className='col selected-images' key={key}>
				<div className='img-container'><img src={imgStr+tImg} className='img' /></div>
				<div className='choose-file'>
					<input type='file' className='file-picker' title='Choose audio file' onChange={onFileChange} />
				</div>
			</div>
		)
	}
	const onFileChange = (event) => {
	 // get file
	 let tmpFile = event.target.files[0]
	 if (tmpFile !== null && tmpFile !== undefined) {
			this.setState({ selectedFile: tmpFile });
	 }
	 else {
		this.setState({ selectedFile: null });
	 }
	}

	const upload = () => {
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"myFile",
			images[0],
			images[0].name
		);

		// Details of the uploaded file
		console.log(images[0]);

		// Request made to the backend api
		// Send formData object
		// axios.post("api/uploadfile", formData);
	}

	return (
		<div className='fullScreenModal'>
			<div className='modal-content'>
				<div className='close-btn' onClick={close}>X</div>
				<div className='message'>
					<div className='popup-header'>Select audio and language to transcribe to</div>
					<div className="product-form">
						<div className='row pop-ln-ht'>
							<span className="pop-label"><b>Name</b></span>
							<input
								className="pop-input"
								placeholder='Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className='row pop-ln-ht'>
							<span className="pop-label"><b>Category</b></span>
							<input
								className="pop-input"
								placeholder='Category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</div>
						<div className='row'>
							<span className="pop-label"><b>Available</b></span>
							<input
								className="pop-input"
								placeholder='Available'
								value={qty}
								onChange={(e) => setAvailable(e.target.value)}
							/>
							<span className="pop-label"><b>Price</b></span>
							<input
								className="pop-input"
								placeholder='price'
								value={price}
								type="number"
								onChange={(e) => setPrice(e.target.value)}
							/>
							<span className="pop-label"><b>Color</b></span>
							<input
								className="pop-input"
								placeholder='Color'
								value={color}
								onChange={(e) => setColor(e.target.value)}
							/>
						</div>
					</div>
					<div className='selected-images-view'>
						{displayImages()}
					</div>
					<div className='file-info'>
						<div style={{display: 'flex'}}>
							<span className='select'>Select Transcript Language:</span>
							<span style={{padding: '1vw 0 0 1vw'}}><Select /></span>
						</div>
						{props.isFile==true &&<div className='save-btn' onClick={saveChanges}>Transcribe</div>}
						{props.isFile==false &&<div className='save-btn disabled'>Transcribe</div>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PopUp

