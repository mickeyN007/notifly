import './css/loader.css'
import React from 'react'

const image = require("./../../images/logo_white.png")
const Loader = () => {
	return (
		<div className="loader styles">
			<div className="loading">
				<img src={require("./../../images/logo_white.png")} />
			</div>
		</div>
	)
}

export default Loader
