document.addEventListener(
	"DOMContentLoaded",

	function () {
		let entries = document.getElementsByTagName("ipa")
		let finalEntries = []
		for (ent = 0; ent < entries.length; ++ent) {
			let thisEntry = entries[ent]
			let thisEntryClass = thisEntry.classList
			let converted = document.createElement("span")
			converted.classList.add("ipa")
			if (thisEntryClass.length > 0) {
				converted.classList.add(...thisEntryClass)
			}
			converted.innerText = nebty(thisEntry.innerText)[0]
			finalEntries.push([converted, thisEntry])
		}
		for (pairNum = 0; pairNum < finalEntries.length; ++pairNum) {
			tempEnt = finalEntries[pairNum]
			tempEnt[1].parentNode.replaceChild(tempEnt[0], tempEnt[1])
		}
	}

)