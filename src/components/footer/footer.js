import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { IconContext } from "react-icons";
import {
	AiFillFacebook,
	AiFillInstagram,
	AiFillTwitterSquare
} from 'react-icons/ai'

import { mySettings } from './../../settings.js'

import './../../css/footer.css'
import logo from './../../images/logo.jpeg'

export default class Footer extends Component {
	constructor() {
		super()
	}

	render() {
		let date = new Date().getFullYear()
		let { themeColor } = this.props
		let colr = 'black' //themeColor===mySettings.colorb ? 'white': mySettings.colorb

		return (
			<div className="footer" style={{backgroundColor: themeColor, color: colr}}>
				<div className="footer-links">
					{this.usefulLinks()}
					{this.servicesLinks()}
					<div className="contact-links">
						<h4>Contact us</h4>
						<ul>
							<li className="contact-link">
								<a href="tel:+2348083179930" className="link">08083179930</a>
							</li>
							<li className="contact-link">
								<a href="mailto:House of Quasar@outlook.com" className="link">House of Quasar@outlook.com</a>
							</li>
							<li className="contact-link">
								<a>Lagos,Nigeria</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="footer-icons">
					<div className="social-icons">
							<a href="#" className="link">
									<i className="fab fa-instagram fa-lg"></i>
							</a>
							<a href="#" className="link">
									<i className="fab fa-facebook-f fa-lg"></i>
							</a>
							<a href="#" className="link">
									<i className="fab fa-twitter fa-lg"></i>
							</a>
							<a href="#" className="link">
									<i className="fab fa-whatsapp fa-lg"></i>
							</a>
					</div>
					<div className="payment-icons">
							<a href="#">
							</a>
							<a href="#">
							</a>

							<a href="#">
							</a>
					</div>
				</div>
				<div className="footer-logo">
					<img src={logo} alt="" className="image" id="darkImg-f" />
				</div>
				<hr />
				<div className="footer-copyright" style={{color: colr}}>
					<p>
							&copy; House of Quasar {date}.
							Powered by <a href="">FOIVUE</a>
					</p>
				</div>
			</div>
		)
	}
	usefulLinks() {
		let links = [
			{name: "Customer services"},
			{name: "About us"},
			{name: "Shop on House of Quasar"},
			{name: "Return & Privacy Policy"},
			{name: "Terms and Conditions"},
		]
		console.log('d')
		return (
			<div className="useful-links">
				<h4>Useful Links</h4>
				<ul>
				{
					links.map((link) =>
						<li className="useful-link">
							<a href="" className="link">
								{link.name}
							</a>
						</li>
					)
				}
				</ul>
			</div>
		)
	}
	servicesLinks() {
		let links = [
			{name: "Customer services"},
			{name: "About us"},
			{name: "Shop on House of Quasar"},
			{name: "Return & Privacy Policy"},
			{name: "Terms and Conditions"},
		]
		return (
			<div className="services-links">
				<h4>Our Services</h4>
				<ul>
					{
						links.map((link, i) =>
							<li className="services-link">
								<a href="" className="link">
									{link.name}
								</a>
							</li>
						)
					}
				</ul>
			</div>
		)
	}
}
