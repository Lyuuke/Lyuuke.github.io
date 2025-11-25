function parseManualHighlight(scr) {

	var buffer = ""
	var PATTERNS = new Map([
		["comment-like", /^(#.*(?=\n|$)|"""[\s\S]*?"""|'''[\s\S]*?''')/],
		["operator", /^((\+|->|-|\*{1,2}|\/{1,2}|&|\||\^|%|@|>|<|=|>>|<<)=?|(!=|~|:=)|(and|or|not|is not|is|in)\b)/],
		["literal", /^([fru]?".*?"|[fru]?'.*?'|[0-9]+(\.[0-9]*)?(\+[0-9]+(\.[0-9]*)?j)?|True|False|None|\.\.\.|Ellipsis|NotImplemented)/],
		["keyword", /^(as|assert|async|await|break|class|case|continue|def|del|elif|else|except|finally|for|from|global|if|import|lambda|match|nonlocal|pass|raise|return|try|while|with|yield)\b/],
		["function", /^[a-zA-Z_][\w]*(?=\()/],
		["name", /^[a-zA-Z_][\w]*/]
	])

	function gloss() {
		let firstMatchType = ""
		let matchSegment = null
		PATTERNS.forEach((pattern, matchType) => {
			if (firstMatchType != "") { return }
			let mtch = scr.match(pattern)
			if (mtch != null) {
				firstMatchType = matchType
				matchSegment = mtch[0]
			}
		})
		switch (firstMatchType) {
			// this is stupid
			case "operator":
				buffer += `<span class="op">${matchSegment}</span>`
				scr = scr.slice(matchSegment.length)
				break
			case "literal":
				buffer += `<span class="lt">${matchSegment}</span>`
				scr = scr.slice(matchSegment.length)
				break
			case "keyword":
				buffer += `<span class="kw">${matchSegment}</span>`
				scr = scr.slice(matchSegment.length)
				break
			case "function":
				buffer += `<span class="fn">${matchSegment}</span>`
				scr = scr.slice(matchSegment.length)
				break
			case "name":
				buffer += `<span class="nm">${matchSegment}</span>`
				scr = scr.slice(matchSegment.length)
				break
			case "comment-like":
				buffer += `<span class="cm">${matchSegment}</span>`
				scr = scr.slice(matchSegment.length)
				break
			default:
				// no match, consume one raw character
				buffer += scr[0]
				scr = scr.slice(1)
		}
	}

	while (scr.length > 0) {
		if (" \t\n\r()[]{}:,".includes(scr[0])) {
			buffer += scr[0]
			scr = scr.slice(1)
		} else if (scr[0] == "?") {
			// specify HTML class by ?className:...??
			scr = scr.slice(1)
			let firstColon = scr.search(":")
			let firstQMark = scr.search(/\?\?/)
			if (firstQMark != -1 && firstColon != -1 &&
				firstColon < firstQMark) {
				let className = scr.slice(0, firstColon)
				let overriddenSegment = scr.slice(firstColon + 1, firstQMark)
				scr = scr.slice(firstQMark + 1)
				buffer += `<span class="${className}">`
				buffer += parseManualHighlight(overriddenSegment)
				buffer += "</span>"
			}
		} else {
			gloss()
		}
	}

	return buffer

}


document.addEventListener(
	"DOMContentLoaded",
	() => {
		var pythonBlocks = document.getElementsByClassName("python-code")
		for (var i = 0; i < pythonBlocks.length; ++i) {
			let pyBlock = pythonBlocks[i]
			pyBlock.innerHTML = parseManualHighlight(pyBlock.innerText)
		}
	}
)