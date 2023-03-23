import { mySettings } from './../../settings'

const {method, headers} = mySettings.optionsB

export function getFlights() {
	return fetch(mySettings.serverID+'api/getFlights')
	.then(flights => flights.json())
	.then(flights => {
		const { data } = flights
		localStorage.setItem('flights', JSON.stringify(data))
		return data
	})
	.catch(err => {
		alert("Please check your internet connection and try again")
		return []
	})
}

export function isLoggedIn() {
	// get and verify token
	var token = JSON.parse(localStorage.getItem('token'))
	if (token) {
		var body = JSON.stringify({token})
		var options = {body, method, headers}
	console.log(token)
		return fetch(mySettings.serverID+'api/verifyToken', options)
		.then(data => data.json())
		.then(data => {
			const { status } = data
			console.log(status)
			if (status) {
				console.log('ff')
				return true
			}
			else {
			console.log('fffflk')
			return false
			}
		})
		.catch(err => {
			alert('ggg')
			return false
		})
	}
	else {
	console.log('lelele')
		return false
	}
}

export function register(data) {
	const { email, password, zone, name } = data
	var body = JSON.stringify({ email, password, name, zone })
	var options = {body, method, headers}
	fetch(mySettings.serverID+'api/register', options)
	.then(data => data.json())
	.then (data => {
		//this.toggleLoading(false)
		if (data.status){
			alert(data.msg)
		}
		else {
			alert(data.msg)
		}
	})
	.catch(err =>{
		alert(err)
	})
}
export function logOut() {
	//alert('test')
	localStorage.clear()
	window.location.href = '/'
}

export function saveData(key, data) {
	localStorage.setItem(key, JSON.stringify(data))
}

export function getData(key) {
console.log(key)
	return JSON.parse(localStorage.getItem(key))
}

export function getUserDetails() {
	return JSON.parse(localStorage.getItem('user')).user
}

export function getUsers() {
	fetch(mySettings.serverID+'api/getUsers')
	.then(users => users.json())
	.then(users => {
		const { data } = users
		localStorage.setItem('users', JSON.stringify(data))
	})
	.catch(err => {
		alert('f')//"Please check your internet connection and try again")
	})
}

export function getUserFolders(email) {
	var body = JSON.stringify({ email })
	var options = {body, method, headers}
	fetch(mySettings.serverID+'api/getUserFolders', options)
	.then(folders => folders.json())
	.then(folders => {
		const { data } = folders
		localStorage.setItem('folders', JSON.stringify(data))
	})
	.catch(err => {
		alert('f')//"Please check your internet connection and try again")
	})
}

export function getUserFiles(email) {
	var body = JSON.stringify({ email })
	var options = {body, method, headers}
	fetch(mySettings.serverID+'api/getUserFiles', options)
	.then(files => files.json())
	.then(files => {
		const { data } = files
		localStorage.setItem('files', JSON.stringify(data))
	})
	.catch(err => {
		alert('f')//"Please check your internet connection and try again")
	})
}

export function getUserTeams(email) {
	var body = JSON.stringify({ email })
	var options = {body, method, headers}
	fetch(mySettings.serverID+'api/getUserTeams', options)
	.then(files => files.json())
	.then(files => {
		const { data } = files
		localStorage.setItem('teams', JSON.stringify(data))
	})
	.catch(err => {
		alert('f')//"Please check your internet connection and try again")
	})
}

export function getMyTeams(email) {
	var body = JSON.stringify({ email })
	var options = {body, method, headers}
	fetch(mySettings.serverID+'api/getMyTeams', options)
	.then(files => files.json())
	.then(files => {
		const { data } = files
		localStorage.setItem('teams', JSON.stringify(data))
	})
	.catch(err => {
		alert('f')//"Please check your internet connection and try again")
	})
}

export function getUserTeamsB(email) {
	var body = JSON.stringify({email})
	var options = {body, method, headers}
	alert(email)
	return fetch(mySettings.serverID+'api/getUserTeamsB', options)
	.then(data => data.json())
	.then(data => {
		console.log(data.data)
		const { teams, folders, files } = data.data
		localStorage.setItem('teams', JSON.stringify(teams))
		localStorage.setItem('folders', JSON.stringify(folders))
		localStorage.setItem('files', JSON.stringify(files))
		/*localStorage.setItem('teams', JSON.stringify(teams))
		localStorage.setItem('myTeams', JSON.stringify(myTeams))
		localStorage.setItem('teamFolders', JSON.stringify(teamFolders))
		console.log('hhhh')
		localStorage.setItem('teamFiles', JSON.stringify(teamFiles))*/

	})
	.catch(err => {
		alert("Please check your internet connection and try again")
	})
}


export function retrieveGroups() {
	var b = JSON.parse(localStorage.getItem('branches'))
	return b
}
function retrieveNotifications() {
	var b = JSON.parse(localStorage.getItem('notifications'))
	return b
}

export function updateGroups(data) {
	var groups = retrieveGroups()
	const { name, count } = data
	var indx = groups.findIndex(element => element.name == name)
	groups[indx].count=count

	//alert()
	localStorage.setItem('branches', JSON.stringify(groups))
	window.location.reload()

}

function updateUserDetails(data) {
	var users = retrieveUsers()
	const { name, zone, email } = data
	var indx = users.findIndex(element => element.email == email)
	users[indx].name=name
	users[indx].zone=zone

	localStorage.setItem('users', JSON.stringify(users))
	//window.location.reload()
}

function updateNotifications(data) {
	var notifications = retrieveNotifications()
	notifications.push(data)

	localStorage.setItem('notifications', JSON.stringify(notifications))
	window.location.reload()
}


export function registerUser(data) {
	const {method, headers} = mySettings.optionsB
	var body = JSON.stringify(data)
	var options = {body, method, headers}
	fetch(mySettings.serverID+'api/register', options)
	.then(data => data.json())
	.then (data => {
		if (data.status){
			getUsers()
			//getGroups()
		}
		else {
			//this.props.navigation.navigate('Verify', {email});
			alert(data.msg)
		}
	})
	.catch(err =>	alert("Please check your internet connection and try again"))
}

function sendNotification(data) {
	const {method, headers} = mySettings.optionsB
	var body = JSON.stringify(data)
	var options = {body, method, headers}
	fetch(mySettings.serverID+'api/sendNotification', options)
	.then(data => data.json())
	.then (data => {
		if (data.status){
			alert('Your notification has been sent!')
		}
		else {
			//this.props.navigation.navigate('Verify', {email});
			alert(data.msg)
		}
	})
	.catch(err =>	alert("Please check your internet connection and try again"))
}

 function updateUser(data) {
	const {method, headers} = mySettings.optionsB
	var body = JSON.stringify(data)
	var options = {body, method, headers}
	fetch(mySettings.serverID+'api/updateUser', options)
	.then(data => data.json())
	.then (data => {
		if (data.status){
			alert('User was successfully updated!')
			//getUsers()
			//getGroups()
		}
		else {
			//this.props.navigation.navigate('Verify', {email});
			alert(data.msg)
		}
	})
	.catch(err =>	alert("Please check your internet connection and try again"))
}

export function createGroup(data) {
	const {method, headers} = mySettings.optionsB
	var body = JSON.stringify(data)
	var options = {body, method, headers}
	fetch(mySettings.serverID+'api/createGroup', options)
	.then(data => data.json())
	.then (data => {
		if (data.status){
			getUsers()
			//getGroups()
		}
		else {
			//this.props.navigation.navigate('Verify', {email});
			alert(data.msg)
		}
	})
	.catch(err =>	alert("Please check your internet connection and try again"))
}


function retrieveUsers() {
	return JSON.parse(localStorage.getItem('users'))
}



export function login(data) {
	const { email, password } = data
	var body = JSON.stringify({email, password})
	var options = {body, method, headers}
	fetch(mySettings.serverID+'api/login', options)
	.then(data => data.json())
	.then (data => {
		//this.toggleLoading(false)
		if (data.status){
			localStorage.setItem('user', JSON.stringify(data.token));
			//getGroups()
			getUsers()
			//getNotifications()
		}
		else {
			alert(data.msg)
		}
	})
	.catch(err =>{
		alert('No internet connection, Please check your internet connection and try again')
	})
		//this.toggleLoading(false)})//"Can't connect to our servers at the moment"); this.toggleLoading(false)})
}

export function changePassword(password) {
	const email = getUserDetails().email
	var body = JSON.stringify({email, password})
	var options = {body, method, headers}
	fetch(mySettings.serverID+'api/changePasswordAdmin', options)
	.then(data => data.json())
	.then (data => {
		//this.toggleLoading(false)
		if (data.status){
			alert('Your password has been successfully changed')
		}
		else {
			alert(data.msg)
		}
	})
	.catch(err =>{
		alert('No internet connection, Please check your internet connection and try again')
	})
		//this.toggleLoading(false)})//"Can't connect to our servers at the moment"); this.toggleLoading(false)})
}


/* function {
	saveData,
	verifyToken,
	updateNotifications,
	sendNotification,
	register,
	retrieveNotifications,
	updateUserDetails,
	updateGroups, updateUser, createGroup,
	getUserFiles, getUserFolders, getUserTeamsB,
	registerUser, retrieveUsers, retrieveGroups,isLoggedIn,
	logOut, getUserDetails, login, changePassword, getUsers
}
*/
