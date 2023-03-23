import React, { Component } from 'react'

import './../../css/products.css'
import PopUp from './popUp.js'
import LoadingScreen from './../helpers/loadingScreen.js'

import { IconContext } from "react-icons";
import { IoMenuSharp } from "react-icons/io5"

import { mySettings } from './../../settings.js'

export default class Products extends Component {
	constructor() {
		super()
		this.state = {
			showPopUp: false,
			isLoading: false,
			product: null,
			update: false
		}
	}
	componentDidUpdate(prevProps) {
		if (prevProps.products!==this.props.products)
			this.setState({update: !this.state.update})
	}

	render() {
		let { products } = this.props
		console.log(products)
		// get products attribu

		let {
			product,
			isLoading
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
					<input placeholder='Search...' className='search' tabIndex="1"/>
				</div>
				<div className='db-header'>
				</div>
				<div>
					<div className="products products-header">
						{this.displayTableHeader()}
					</div>
					<div>
						{this.displayTableData(products)}
					</div>
				</div>
			{
				product &&
					<PopUp
						close={this.closePopUp.bind(this)}
						product={this.state.product}
					/>
			}
			{
				isLoading &&
					<LoadingScreen />
			}
			</div>
		)
	}

	showSideBar() {
		this.props.showSideBar()
	}
	hideSideBar() {
		this.props.hideSideBar()
	}
	displayTableHeader() {
		let headers = ["#", "Images", "Name", "Category", "Sex", "Available", "Price", "Color"]
		return headers.map((header, key) => <span key={key}>{header}</span>)
	}
	displayTableData(products) {
		console.log(products[5])
		let val, row, counter=1;
		return products.map((product) => {
			console.log('ggggg')
			row = [
				<span>{counter}</span>,
				<span className='product-image-sm'>
					<img src={imgStr+product.images[0]} className='img' />
				</span>
			]
			Object.keys(product).map((attr, key) => {
				val = product[attr]
				console.log(val)
				if (attr!=="images" && attr!=="_id" && attr!=="__v") {
					row.push(<span key={key}>{val}</span>)
				}
			})
			counter++
			return <div className="products products-data" onClick={this.editProduct.bind(this, product)}>{row}</div>
		})
	}

	closePopUp() {
		this.setState({product: null})
	}

	editProduct(product) {
		console.log(product)
		this.setState({product})
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
}

const { imgStr } = mySettings
