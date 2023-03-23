import React, { Component } from 'react'
import './css/slider.css'
//import { ReactComponent as SvgBanner } from './../../images/banner.svg'
import swap from './swap.svg'
import { mySettings } from './../../settings.js'

export default class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
			currentIndex: 0,
      translateValue: 0,
			index: 0,
			origin: '',
			dest: '',
			airline: ''
    }
  }

	componentDidMount() {
		setInterval(this.changeIndex(this), 5000)
	}

	componentWillUnmount() {
		clearInterval()
	}

	changeIndex() {
		let { currentIndex } = this.state
		if (currentIndex<1) {
			currentIndex += 1
			this.setState({currentIndex})
		}
		else {
			this.setState({currentIndex: 0})
		}
	}

  goToPrevSlide = () => {
    if(this.state.currentIndex === 0)
			this.setState(prevState => ({
				currentIndex: images.length-1
			}))
		else
			this.setState(prevState => ({
				currentIndex: prevState.currentIndex - 1
			}))
  }

	goToNextSlide = () => {
		if(this.state.currentIndex === images.length-1)
			this.setState(prevState => ({
				currentIndex: 0
			}))
		else
			this.setState(prevState => ({
				currentIndex: prevState.currentIndex + 1
			}))
  }


  slideWidth = () => {
     return document.querySelector('.slide').clientWidth
  }

	updateState(obj) {
		let { id } = obj
		if (Object.keys(obj)[0] === "origin")
			this.setState({"origin": obj[id]})
		else
			this.setState({"dest": obj[id]})

	}
  render() {
		let { currentIndex, origin, dest, airline } = this.state
		let { themeColor } = this.props
    return (
      <div className="slider">

        <div className="slider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
							<Slide
								origin={origin}
								dest={dest}
								airline={airline}
								updateState={this.updateState.bind(this)}
								image={images[currentIndex]}
								themeColor={themeColor}
							/>
        </div>
      </div>
    );
  }
}

const Slide = ({ image, themeColor, updateState, origin, dest, airline }) => {
  const styles = {
    backgroundImage: `url(${image})`,
  }
	/*const text = {
		position: 'absolute',
		//flexWrap: 'wrap',
		color: 'white',
		backgroundColor: 'pink',
		fontSize: '2.5em',
		height: '20vh',
		top: '30vh',
		left: '50vw',
		wordWrap: 'break-word',
	}
	const styles = {
		width: '100vw',
	}*/

	return (
		<div className="slide">
			<img src={image} className="img-box" />
			<div className="content">
				<h1 className="lbrown inter l-font" style={{color: themeColor}}>Fly With Ease</h1>
				<h2 className="lemonada md-b-font" style={{color: 'white'}}>Never miss out on your flights notifications!</h2>

				<div className='flight-search-box'>
					<div className="airline">
						<input
							value={airline}
							placeholder="Airline"
							onChange={(e) => updateState({'airline': e.target.value})}
						/>
					</div>
					<div className="locations">
						<input
							value={origin}
							placeholder="Origin"
							onChange={(e) => updateState({'origin': e.target.value})}
						/>
						<img src={swap} style={{width: 'auto'}} />
						<input
							value={dest}
							placeholder="Destination"
							onChange={(e) => updateState({'dest': e.target.value})}
						/>

					</div>
				</div>
			</div>
		</div>
	)
}


const LeftArrow = (props) => {
  return (
    <div className="backArrow arrow" onClick={props.goToPrevSlide}>
      <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
    </div>
  );
}


const RightArrow = (props) => {
  return (
    <div className="nextArrow arrow" onClick={props.goToNextSlide}>
      <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
    </div>
  );
}

		const images = [
			require('./../../images/homeBannerA.jpg'),
			require('./../../images/homeBannerA.jpg'),
		]

