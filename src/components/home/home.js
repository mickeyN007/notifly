import React, { Component } from 'react'

import './../../css/home.css'
import Header from './../header/header.js'
import Slider from './../helpers/slider.js'
import Footer from './../footer/footer.js'
import CardsCarousel from './../helpers/cardsCarousel.js'

import { mySettings } from './../../settings.js'

export default class Home extends Component {
	constructor() {
		super()
		this.state = {
		}
	}
	render() {
		const { theme, themeColor } = this.props

		return (
			<div className='container'>
				<Header toggleTheme={this.toggleTheme.bind(this)} themeColor={themeColor} />
				<Slider themeColor={themeColor} />
				<CardsCarousel />
				<section>

				</section>
				<Footer themeColor={themeColor} />
			</div>
		)
	}
	toggleTheme() {
		this.props.toggleTheme()
	}
}

const styles = {
}
