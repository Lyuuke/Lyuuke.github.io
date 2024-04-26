document.addEventListener(
	"DOMContentLoaded",

	() => {

		var entries = document.getElementsByTagName("te")
		var finalEntries = []

		for (ent = 0; ent < entries.length; ++ent) {

			var templateName = ""
			var parameterMap = {}
			var thisEntry = entries[ent]
			var thisContentLines = thisEntry.innerHTML.split("\n")

			for (lnum = 0; lnum < thisContentLines.length; ++lnum) {
				var thisLine = thisContentLines[lnum].trim()
				if (thisLine == "") continue
				var thisLineSegments = thisLine.split(/\s*::\s*/)
				if (thisLineSegments.length == 1 && !templateName) {
					templateName = thisLineSegments[0]
				} else {
					parameterMap[thisLineSegments[0]] = thisLineSegments[1]
				}
			}

			if (!templateName) continue
			req = new XMLHttpRequest()
			req.open("GET", `./templates/${templateName}.html`, false)

			req.onreadystatechange = function () {
				if (req.status == 200) {
					rawTemplate = req.response
					var prs = new DOMParser()
					var thisTemplate = prs.parseFromString(rawTemplate, "text/html")
						.getElementById("template").cloneNode(true)
					var thisTText = thisTemplate.innerHTML
					for (var parName in parameterMap) {
						value = parameterMap[parName]
						thisTText = thisTText.replace(`{${parName}}`, value)
					}
					thisTemplate.innerHTML = thisTText
					if (thisEntry.hasAttribute("style")) {
						thisTemplate.setAttribute("style",
							thisEntry.getAttribute("style"))
					}
					finalEntries.push([thisTemplate, thisEntry])
					//thisEntry.parentNode.replaceChild(thisTemplate, thisEntry)
				}
			}

			req.send()

		}

		for (pairNum = 0; pairNum < finalEntries.length; ++pairNum) {
			tempEnt = finalEntries[pairNum]
			tempEnt[1].parentNode.replaceChild(tempEnt[0], tempEnt[1])
		}

	}

)