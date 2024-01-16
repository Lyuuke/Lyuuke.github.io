function nebty(text, terminator = "\0") {

	function getPrimary(rawChar) {
		const TRIVIALS = "abcdefhijklmnopqrstuvwxyz-.=/#"
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
			"'": "ˈ"
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
				"n": "ȵ", "z": "ʑ", "t": "ȶ", "d": "ȡ"
			},
			"ɾ": {
				"h": "ɦ", "b": "ɓ", "d": "ɗ", "ɖ": "ᶑ",
				"ɟ": "ʄ", "ɡ": "ɠ", "ɢ": "ʛ", "ŋ": "ɧ",
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
				"c": "ç", "l": "ɮ"
			},
			"=": {
				"ǀ": "ǂ"
			},
			"/": {
				"o": "ø"
			},
			".": {
				"o": "ʘ", "ǀ": "ǃ"
			},
			"ǀ": {
				"ǀ": "ǁ", ".": "¡"
			},
			"ŋ": {
				"f": "ʩ"
			},
			"s": {
				"l": "ʪ"
			},
			"z": {
				"l": "ʫ"
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
			}
		}
		return (productTable[thatChar] || {})[thisChar] || ""
	}

	function getTurned(char) {
		const turnedTable = Object.assign(
			Object.fromEntries(
				Array.from("ɐqɔpəɟɓɥʞɯudɹʇnʌʍʎɒɜʖяˌ").map(
					(el, i) => [el, "abcdefɡhkmnprtuvwyɑɛʕʁˈ"[i]])
			), Object.fromEntries(
				Array.from("abcdefɡhkmnprtuvwyɑɛʕʁˈ").map(
					(el, i) => [el, "ɐqɔpəɟɓɥʞɯudɹʇnʌʍʎɒɜʖяˌ"[i]])
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

	function toNonFullSized(fs) {
		const nonFullSizedTable = Object.fromEntries(
			Array.from("hɦwjɥɣmɱnɳɲŋɴlɭʟʕʋɻʔʁœəɵɸfθsʃɕʂxꭓ=7").map(
				(el, i) => [el, "ʰʱʷʲᶣˠᵐᶬⁿᶯᶮᵑᶰˡᶩᶫˤᶹʵˀʶꟹᵊᶱᶲᶠᶿˢᶴᶝᶳˣᵡ˭˹"[i]])
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
			"<": ["͔", "͔", "͔"],
			">": ["͕", "͕", "͕"],
			"F": ["͈", "͈", "͈"],
			"D": ["͊", "͊", "͊"],
			"N": ["͋", "͋", "͋"],
			"V": ["͌", "͌", "͌"],
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

	function applyUnaryOp(op, char) {
		switch (op) {
			case "!":
				return getTurned(char)
			case "$":
				return getMirrored(char)
			case "+":
				return getSmallCap(char)
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

	var nodeHeld = ""
	var multiplierHeld = ""
	var opsHeld = []
	var textBuffer = ""

	while (text) {
		[char, text] = [text[0], text.slice(1)]
		if (" \t\n\r".includes(char)) {
			continue
		}
		if ("!$+".includes(char)) {
			// "!" == turned, "$" == mirrored, "+" == small-cap
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
			nextClosingBrace = text.indexOf("}")
			textBuffer += toCombining(text.slice(0, nextClosingBrace))
			text = text.slice(nextClosingBrace + 1)
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
					var slicer = 1
					break
				default:
					textBuffer += text.slice(0, nextBacktick)
					var slicer = nextBacktick
			}
			text = text.slice(nextBacktick + 1)
		} else if (char == "G") {
			// "G" + <raw char> -> make <raw char> unprocessed a node
			// "G" stands for Glyph
			mergeNode()
			nodeHeld = text[0]
			text = text.slice(1)
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