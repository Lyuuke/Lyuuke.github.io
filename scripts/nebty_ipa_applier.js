document.addEventListener(
	"DOMContentLoaded",

	function () {
		var entries = document.getElementsByTagName("ipa")
		var finalEntries = []
		for (ent = 0; ent < entries.length; ++ent) {
			var thisEntry = entries[ent]
			var converted = document.createElement("span")
			converted.classList.add("ipa")
			converted.innerText = nebty(thisEntry.innerText)[0]
			finalEntries.push([converted, thisEntry])
		}
		for (pairNum = 0; pairNum < finalEntries.length; ++pairNum) {
			tempEnt = finalEntries[pairNum]
			tempEnt[1].parentNode.replaceChild(tempEnt[0], tempEnt[1])
		}
	}

)