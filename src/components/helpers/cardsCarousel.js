import React, { Component } from 'react'
import './css/cardsCarousel.css'

export default class CardsCarousel extends Component {
	render() {
		return (
			<div className="cc-container">
				<div className="cc-slider">
					<div className="slide-track">
						{this.displayCards()}
					</div>
				</div>
			</div>
		)
	}

	displayCards() {
		return data.map((d, i) =>
			<div className="slide">
				<img src={d.img} height="100" width="250" alt="" />
			</div>
		)
	}
}

const data = [
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png'},
	{img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png'},
]
