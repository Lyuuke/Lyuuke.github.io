function refreshParsedNebty() {

	var input = document.getElementById("nebtyinput").innerText
	var outputFrame = document.getElementById("nebtyoutput")
	outputFrame.innerText = nebty(input)[0]

}