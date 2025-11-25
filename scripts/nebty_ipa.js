var CUSTOM_IPA_MAP = {}

function nebty(text, terminator = "\0") {

	function getPrimary(rawChar) {
		const TRIVIALS = "abcdefhijklmnopqrstuvwxyz-.=/#~;"
		const NONTRIVIALS = {
			// "G" and "M" are reserved
			"g": "ɡ",
			"A": "ɑ",
			"B": "β",
			"C": "ɕ",
			"D": "ð",
			"E": "ɛ",
			"F": "ɸ",
			"H": "ɦ",
			"I": "ɨ",
			"J": "ʑ",
			"K": "ꭓ",
			"L": "ɭ",
			"N": "ŋ",
			"O": "ɔ",
			"P": "ø",
			"Q": "ʕ",
			"R": "ɾ",
			"S": "ʃ",
			"T": "θ",
			"U": "ʊ",
			"V": "ʋ",
			"W": "ɯ",
			"X": "ɣ",
			"Y": "ɤ",
			"Z": "ʒ",
			"|": "ǀ",
			"?": "ʔ",
			"@": "ə",
			"^": "͡",
			"%": "∅",
			":": "ː",
			"'": "ˈ",
			"&": "\r\n"
		}
		if (TRIVIALS.includes(rawChar)) {
			return rawChar
		} else if (rawChar in NONTRIVIALS) {
			return NONTRIVIALS[rawChar]
		} else {
			return ""
		}
	}

	function getProduct(thisChar, thatChar) {
		const productTable = {
			// thatChar -> thisChar -> <result>
			"ɕ": {
				"n": "ȵ", "z": "ʑ", "t": "ȶ", "d": "ȡ",
				"l": "ȴ", "t": "ʨ", "j": "ʝ"
			},
			"ɾ": {
				"h": "ɦ", "b": "ɓ", "d": "ɗ", "ɖ": "ᶑ",
				"ɟ": "ʄ", "ɡ": "ɠ", "ɢ": "ʛ", "ŋ": "ɧ",
				"p": "ƥ", "t": "ƭ", "c": "ƈ", "k": "ƙ",
				"q": "ʠ"
			},
			"ɭ": {
				"n": "ɳ", "t": "ʈ", "d": "ɖ", "ɹ": "ɻ",
				"r": "ɽ", "ɗ": "ᶑ", "s": "ʂ", "z": "ʐ",
				"ə": "ɚ", "ɜ": "ɝ", "ɬ": "ꞎ", "ɾ": "ʗ"
			},
			"j": {
				"m": "ɱ", "n": "ɲ", "ɦ": "ɧ"
			},
			"c": {
				"l": "ɬ", "ɭ": "ꞎ"
			},
			"-": {
				"ʔ": "ʡ", "ʕ": "ʢ", "h": "ħ", "i": "ɨ",
				"u": "ʉ", "ɪ": "ᵻ", "ʊ": "ᵿ", "o": "ɵ"
			},
			"ʒ": {
				"c": "ç", "l": "ɮ", "d": "ʤ"
			},
			"=": {
				"ǀ": "ǂ"
			},
			"/": {
				"o": "ø"
			},
			".": {
				"o": "ʘ", "ǀ": "ǃ", "ː": "ˑ"
			},
			"ǀ": {
				// this is the click letter
				"ǀ": "ǁ", ".": "¡", "r": "ɼ", "ɯ": "ɰ"
			},
			"|": {
				// this is the vertical line (= minor group symbol)
				"|": "‖"
			},
			"ŋ": {
				"f": "ʩ"
			},
			"s": {
				"l": "ʪ", "t": "ʦ"
			},
			"z": {
				"l": "ʫ", "d": "ʣ"
			},
			"w": {
				"w": "ʬ"
			},
			"n": {
				"n": "ʭ"
			},
			"ɜ": {
				"c": "ɞ"
			},
			"e": {
				"a": "æ", "o": "œ"
			},
			"ᴇ": {
				"o": "ɶ"
			},
			"p": {
				"q": "ȹ"
			},
			"b": {
				"d": "ȸ"
			},
			"ʃ": {
				"t": "ʧ"
			},
			"ʑ": {
				"d": "ʥ"
			},
			"~": {
				"l": "ɫ"
			}
		}
		return (productTable[thatChar] || {})[thisChar] || ""
	}

	function getTurned(char) {
		const turnedTable = Object.assign(
			Object.fromEntries(
				Array.from("ɐqɔpəɟɓɥʞɯuodɹʇnʌʍxʎɒɜʖяȹˌ͜").map(
					(el, i) => [el, "abcdefɡhkmnoprtuvwxyɑɛʕʁȸˈ͡"[i]])
			), Object.fromEntries(
				Array.from("abcdefɡhkmnoprtuvwxyɑɛʕʁȸˈ͡").map(
					(el, i) => [el, "ɐqɔpəɟɓɥʞɯuodɹʇnʌʍxʎɒɜʖяȹˌ͜"[i]])
			)
		)
		return turnedTable[char] || ""
	}

	function getMirrored(char) {
		const mirroredTable = Object.assign(
			Object.fromEntries(
				Array.from("dbqpeɛcʀɾʃʔʡ").map(
					(el, i) => [el, "bdpqɘɜɔяɿʅʕʢ"[i]])
			), Object.fromEntries(
				Array.from("bdpqɘɜɔяɿʅʕʢ").map(
					(el, i) => [el, "dbqpeɛcʀɾʃʔʡ"[i]])
			)
		)
		return mirroredTable[char] || ""
	}

	function getSmallCap(char) {
		const smallCapTable = Object.fromEntries(
			Array.from("abeɡhilnryœ").map(
				(el, i) => [el, "ᴀʙᴇɢʜɪʟɴʀʏɶ"[i]])
		)
		return smallCapTable[char] || ""
	}

	function getVariant(char) {
		const smallCapTable = Object.fromEntries(
			Array.from("ǀǁꭓ").map(
				(el, i) => [el, "|‖χ"[i]])
		)
		return smallCapTable[char] || ""
	}

	function toNonFullSized(fs) {
		const nonFullSizedTable = Object.fromEntries(
			Array.from(
				"hɦwjɥɣmɱnɳɲŋɴlɭʟʕʋɹɻʔʁœəɵɸβfθsʃɕʂxꭓ"
				+ "χvðzʒʐʝɰriyuɨʉɯ=/ˈ"
			).map((el, i) => [el, (
				"ʰʱʷʲᶣˠᵐᶬⁿᶯᶮᵑᶰˡᶩᶫˤᶹʴʵˀʶꟹᵊᶱᶲᵝᶠᶿˢᶴᶝᶳˣᵡ"
				+ "ᵡᵛᶞᶻᶾᶼᶨᶭʳⁱʸᵘᶤᶶᵚ˭˹ʼ"
			)[i]])
		)
		var buffer = ""
		for (var i = 0; i < fs.length; ++i) {
			buffer += (nonFullSizedTable[fs[i]] || "")
		}
		return buffer
	}

	function toCombining(tkn) {
		const combiningTable = {
			"o": ["̊", "̥", "̥"],
			"v": ["̌", "̬", "̬"],
			"^": ["̂", "̭", "̂"],
			":": ["̈", "̤", "̈"],
			"~": ["̃", "̰", "̃"],
			"|": ["̍", "̩", "̩"],
			"[": ["͆", "̪", "̪"],
			"]": ["̺", "̺", "̺"],
			"u": ["̆", "̮", "̆"],
			"n": ["̑", "̯", "̯"],
			"7": ["̚", "̚", "̚"],
			"3": ["̄", "̱", "̄"],
			"-": ["̠", "̠", "̠"],
			"+": ["̟", "̟", "̟"],
			"T": ["̞", "̞", "̞"],
			"L": ["̝", "̝", "̝"],
			"r": ["˞", "˞", "˞"],
			"4": ["́", "̗", "́"],
			"2": ["̀", "̖", "̀"],
			".": ["̇", "̣", "̣"],
			"(": ["͑", "̜", "̜"],
			")": ["͗", "̹", "̹"],
			"#": ["̻", "̻", "̻"],
			"x": ["̽", "͓", "̽"],
			"5": ["̋", "̋", "̋"],
			"1": ["̏", "̏", "̏"],
			"m": ["̼", "̼", "̼"],
			"w": ["̫", "̫", "̫"],
			"A": ["̘", "̘", "̘"],
			"R": ["̙", "̙", "̙"],
			"<": ["͔", "͔", "͔"],
			">": ["͕", "͕", "͕"],
			"F": ["͈", "͈", "͈"],
			"D": ["͊", "͊", "͊"],
			"N": ["͋", "͋", "͋"],
			"V": ["͌", "͌", "͌"],
			"d": ["̴", "̴", "̴"],
			"=": ["͇", "͇", "͇"]
		}
		var buffer = ""
		var choice = -1
		for (var i = 0; i < tkn.length; ++i) {
			let token = tkn[i]
			if ("`_".includes(token)) {
				choice = (token == "`") ? 0 : 1
			} else {
				buffer += (combiningTable[token] || []).slice(choice)[0] || ""
				choice = -1
			}
		}
		return buffer
	}

	function toTone(tkn) {
		const toneTable = {
			"1": "˩",
			"2": "˨",
			"3": "˧",
			"4": "˦",
			"5": "˥"
		}
		const sandhiToneTable = {
			"1": "꜖",
			"2": "꜕",
			"3": "꜔",
			"4": "꜓",
			"5": "꜒"
		}
		const otherRhythmicTable = {
			"^": "ꜛ",
			"v": "ꜜ",
			"/": "↗",
			"\\": "↘"
		}
		var buffer = ""
		var useSandhiLetter = false
		for (var i = 0; i < tkn.length; ++i) {
			let token = tkn[i]
			if (token == "|") {
				useSandhiLetter = true
			} else if ("12345".includes(token)){
				if (useSandhiLetter) {
					buffer += sandhiToneTable[token] || ""
				} else {
					buffer += toneTable[token] || ""
				}
			} else {
				buffer += otherRhythmicTable[token] || ""
			}			
		}
		return buffer
	}

	function toMapped(tkn) {
		var tokens = tkn.trim().split(" ")
		var buffer = ""
		for (var i = 0; i < tokens.length; ++i) {
			let token = tokens[i]
			buffer += CUSTOM_IPA_MAP[token] || ""
			buffer += " "
		}
		return nebty(buffer, '"')[0]
		// make '"' the terminator to prevent bad recursion
	}

	function applyUnaryOp(op, char) {
		switch (op) {
			case "!":
				return getTurned(char)
			case "$":
				return getMirrored(char)
			case "+":
				return getSmallCap(char)
			case "M":
				return getVariant(char)
			default:
				return ""
		}
	}

	function handleUnderscores(text) {
		var counter = 1
		while (true) {
			if (text[0] == "_") {
				counter += 1
				text = text.slice(1)
			} else {
				break
			}
		}
		switch (counter) {
			case 1:
				result = " "
				break
			case 2:
				result = "‿"
				break
			default:
				result = " ".repeat(counter - 1)
		}
		return [result, text]
	}

	function mergeNode() {
		// nodeHeld -> textBuffer
		if (nodeHeld) {
			textBuffer += nodeHeld
			nodeHeld = ""
		}
	}

	function applyOpSpate() {
		// #each opsHeld -> nodeHeld
		while (opsHeld.length > 0) {
			lastOp = opsHeld.pop()
			nodeHeld = applyUnaryOp(lastOp, nodeHeld)
		}
	}

	function applyMul() {
		// <result of mul> -> nodeHeld
		if (multiplierHeld) {
			[multiplierHeld, nodeHeld] = ["",
			getProduct(multiplierHeld, nodeHeld)]
		}
	}

	function execCommand(command, parameter) {
		switch (command) {
			case "use":
				// use preset alias maps
				// all available maps are defined in ./nebty_ipa_preset_maps.js
				// parameter format: "presetname1, presetname2, ..."
				let parNames = parameter.split(",")
				for (var i = 0; i < parNames.length; ++i) {
					let thisName = parNames[i].trim()
					CUSTOM_IPA_MAP = {...CUSTOM_IPA_MAP, ...presetMaps[thisName]}
				}
				break
			case "useNone":
				// clear all aliases
				CUSTOM_IPA_MAP = {}
				break
			case "replace":
				// replace a sequence to another in the CURRENT text buffer
				// parameter format: "before1, after1; before2, after2; ..."
				let replacementPairs = parameter.split(";").map(
					(pair) => {return pair.split(",")}
				)
				for (var i = 0; i < replacementPairs.length; ++i) {
					let thisPair = replacementPairs[i]
					let thisBefore = nebty(thisPair[0].trim())[0]
					let thisAfter = nebty(thisPair[1].trim())[0]
					textBuffer = textBuffer.replaceAll(thisBefore, thisAfter)
				}
				break
			case "left":
				enclosureStack.push([textBuffer.length, parameter])
				break
			case "right":
				let enclosureData = enclosureStack.pop()
				const enclosureTypes = {
					"(": ["(", ")"], "[": ["[", "]"], "<": ["⟨", "⟩"],
					"/": ["/", "/"], "{": ["{", "}"], "((": ["⸨", "⸩"],
					"//": ["⫽", "⫽"], "|": ["|", "|"], "<<": ["⟪", "⟫"],
					"||": ["‖", "‖"]
				}
				let left, right
				[left, right] = enclosureTypes[enclosureData[1]] || ["", ""]
				textBuffer = textBuffer.slice(0, enclosureData[0]) + left
					+ textBuffer.slice(enclosureData[0]) + right
				break
			case "bye":
				window.close()
				break
		}
		return null
	}

	var nodeHeld = ""
	var multiplierHeld = ""
	var opsHeld = []
	var textBuffer = ""
	var quotationMarkSide = false
	var enclosureStack = []

	while (text) {
		[char, text] = [text[0], text.slice(1)]
		if (" \t\n\r".includes(char)) {
			continue
		}
		if ("!$+M".includes(char)) {
			// "!" == turned, "$" == mirrored, "+" == small-cap, "M" = variant
			opsHeld.push(char)
		} else if (char == "*") {
			[multiplierHeld, nodeHeld] = [nodeHeld, ""]
		} else if (char == "(") {
			mergeNode()
			;[nodeHeld, text] = nebty(text, ")")
			applyOpSpate()
			applyMul()
		} else if (char == "[") {
			mergeNode()
			let fullSized
			[fullSized, text] = nebty(text, "]")
			textBuffer += toNonFullSized(fullSized)
		} else if (char == "{") {
			mergeNode()
			let nextClosingBrace = text.indexOf("}")
			textBuffer += toCombining(text.slice(0, nextClosingBrace))
			text = text.slice(nextClosingBrace + 1)
		} else if (char == "<") {
			mergeNode()
			let nextClosingBracket = text.indexOf(">")
			textBuffer += toTone(text.slice(0, nextClosingBracket))
			text = text.slice(nextClosingBracket + 1)
		} else if (char == terminator) {
			// depends on which kind of brackets are these in
			mergeNode()
			return [textBuffer, text]
		} else if (char == "_") {
			mergeNode()
			let scored
			[scored, text] = handleUnderscores(text)
			textBuffer += scored
		} else if (char == "`") {
			mergeNode()
			nextBacktick = text.indexOf("`")
			switch (nextBacktick) {
				case -1:
					continue
				case 0:
					textBuffer += "`"
					break
				default:
					textBuffer += text.slice(0, nextBacktick)
			}
			text = text.slice(nextBacktick + 1)
		} else if (char == "\\") {
			// syntax: \commandname "parametername"
			mergeNode()
			let commandMatch = text.match(/^([a-zA-Z]+)\s*("[^"]*")?/)
			if (commandMatch == null) {
				continue
			}
			let command = commandMatch[1]
			let par = commandMatch[2]
			text = text.slice(commandMatch[0].length)
			par = (par || "\"\"").slice(1, -1)
			execCommand(command, par)
		} else if (char == '"') {
			// this must come after handling backslash
			mergeNode()
			nextQuotationMark = text.indexOf('"')
			if (nextQuotationMark == -1) {
				continue
			} else if (nextQuotationMark == 0) {
				textBuffer += "“”"[+quotationMarkSide]
				quotationMarkSide = !quotationMarkSide
			}
			textBuffer += toMapped(text.slice(0, nextQuotationMark))
			text = text.slice(nextQuotationMark + 1)
		} else if (char == "G") {
			// "G" + <raw char> -> make <raw char> unprocessed a node
			// "G" stands for Glyph
			mergeNode()
			nodeHeld = text[0]
			text = text.slice(1)
			applyOpSpate()
			applyMul()
		} else {
			mergeNode()
			nodeHeld = getPrimary(char)
			applyOpSpate()
			applyMul()
		}

	}
	textBuffer += nodeHeld
	return [textBuffer, text]

}