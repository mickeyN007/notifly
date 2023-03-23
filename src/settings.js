let aData = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

export const mySettings = {
	imgStr: "https://drive.google.com/uc?export=view&id=",
	//serverID: 'https://hoq-foivue-server.herokuapp.com/',
  //serverID: 'http://172.20.10.4:5000/',
	serverID: 'http://192.168.0.121:5000/',
  secretKey: 'Black$enTRY123!@#$',
  aData,
	colorA: '#318afc',
	colorA1: '#4E95BA',
	colorB: '#95ba4e',

   optionsB: {
	 method: "POST",
	 headers: aData,
	}
};
