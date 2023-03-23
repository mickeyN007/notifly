import './App.css';

import { useEffect, useState } from 'react'
// router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { mySettings } from './settings.js'

import { isLoggedIn, getData, saveData, getFlights } from './components/helpers/auth.js'
import Home from './components/home/home.js'
import LoginRegister from './components/loginRegister/loginRegister.js'
import Login from './components/loginRegister/login.js'
import Register from './components/loginRegister/register.js'
import LoadingScreen from './components/helpers/loadingScreen.js'

//import Contact from './components/contact/contact.js'
function App() {
	const [loggedIn, setLogInState] = useState(null)
	const [flights, updateFlights] = useState([])
	const [loading, setLoading] = useState(false)
	const [theme, setTheme] = useState(false)
	const [themeColor, setThemeColor] = useState(null)

	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		const setUp = async () => {
			setLoading(true)
			// check and set user's login status
			const loggedIn = await isLoggedIn()
			console.log(loggedIn)
			setLogInState(loggedIn)

			// get products if loggedIn
			if (loggedIn) {
				// get products
				let tmp =  await getFlights()
				updateFlights(tmp)
			}

			// set theme
			let tmpTheme = getData("theme")
			if (tmpTheme) {
				setTheme(tmpTheme)
				themeColor = tmpTheme ? mySettings.colorA : mySettings.colorA
				setThemeColor(themeColor)

			}
			else {
				saveData("theme", false)
				setTheme(false)
				setThemeColor(mySettings.colorA)
			}
			setLoading(false)

		}
		const handleResize = () => {
			console.log('fff')
			hideSideBar()
    }
		setUp()
		window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
	}, []);

	// toggle theme
	const toggleTheme = () => {
		let t = !theme
		console.log(t)
		console.log(mySettings.color)
		setTheme(t)
		themeColor = t ? mySettings.colorA : mySettings.colorA
		setThemeColor(themeColor)
		saveData("theme", t)
	}

	const toggleLoading = (loading) => {
		setLoading(loading)
	}
	const updateLoginStat =  async(loggedIn) => {
		if (loggedIn) {
			// get products
			let tmp =  await getFlights()
			updateFlights(tmp)
		}
		setLogInState(loggedIn)
	}
	const showSideBar = () => {
		let sidebar = document.getElementById("sidebar");
		sidebar.classList.add("openSidebar");
		let closeMenu = document.getElementById("closeMenu");
		closeMenu.classList.add("show-close-menu");
		closeMenu.classList.remove("hide-close-menu");
	}
	 const hideSideBar = () => {
		console.log('f')
		let sidebar = document.getElementById("sidebar");
		sidebar.classList.remove("openSidebar");
		let closeMenu = document.getElementById("closeMenu");
		closeMenu.classList.remove("show-close-menu");
		closeMenu.classList.add("hide-close-menu");
	}

  return (
		<Router forceRefresh={true}>
			<Routes>
				<Route element={<LoginRegister loggedIn={loggedIn} />}>
					<Route path="/login" element={<Login toggleTheme={toggleTheme} theme={theme} toggleLoading={toggleLoading} updateLoginStat={updateLoginStat} />} />
					<Route path="/register" element={<Register toggleTheme={toggleTheme} theme={theme} toggleLoading={toggleLoading} />} />
				</Route>
				<Route
					path='/'
					element={
						<Home theme={theme} toggleTheme={toggleTheme} themeColor={themeColor} />
					}
				/>

			</Routes>
			{loading && <LoadingScreen />}
    </Router>
  );
}

// get window dimensions
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
    height
  };
}

export default App;
