document.addEventListener(
	"DOMContentLoaded",
	function () {
		var entries = document.getElementsByTagName("ipa")
		for (ent = 0; ent < entries.length; ++ent) {
			var thisEntry = entries[ent]
			thisEntry.innerHTML = nebty(thisEntry.innerHTML)
		}
	}
)


function nebty(text) {

	function getPrimary(rawChar) {
		const TRIVIALS = "abcdefhijklmnopqrstuvwxyz-."
		const NONTRIVIALS = {
			// "G", "K", and "M" are held
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
			"=": "=",
			"/": "/"
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
				"ə": "ɚ", "ɜ": "ɝ", "ɬ": "ꞎ"
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
			}
		}
		return (productTable[thatChar] || {})[thisChar] || ""
	}

	function getTurned(char) {
		const turnedTable = Object.assign(
			Object.fromEntries(
				Array.from("ɐqɔpəɟɓɥʞɯudɹʇnʌʍʎɒɜʖ").map(
					(el, i) => [el, "abcdefɡhkmnprtuvwyɑɛʕ"[i]])
			), Object.fromEntries(
				Array.from("abcdefɡhkmnprtuvwyɑɛʕ").map(
					(el, i) => [el, "ɐqɔpəɟɓɥʞɯudɹʇnʌʍʎɒɜʖ"[i]])
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
				result = "͡"
				break
			case 2:
				result = " "
				break
			case 3:
				result = "‿"
				break
			default:
				result = ""
		}
		return [result, text]
	}

	var nodeHeld = ""
	var multiplierHeld = ""
	var opsHeld = []
	var textBuffer = ""

	while (text) {
		[char, text] = [text[0], text.slice(1)]
		if (" \t\r".includes(char)) {
			continue
		}
		if ("!$+".includes(char)) {
			// "!" == turned, "$" == mirrored, "+" == small-cap
			opsHeld.push(char)
		} else if (char == "*") {
			[multiplierHeld, nodeHeld] = [nodeHeld, ""]
		} else if (char == "(") {
			if (nodeHeld) {
				textBuffer += nodeHeld
				nodeHeld = ""
			}
			[nodeHeld, text] = nebty(text)
			while (opsHeld.length > 0) {
				lastOp = opsHeld.pop()
				nodeHeld = applyUnaryOp(lastOp, nodeHeld)
			}
			if (multiplierHeld) {
				[multiplierHeld, nodeHeld] = ["",
				getProduct(multiplierHeld, nodeHeld)]
			}
		} else if (char == ")") {
			return [nodeHeld, text]
		} else if (char == "_") {
			while (opsHeld.length > 0) {
				lastOp = opsHeld.pop()
				nodeHeld = applyUnaryOp(lastOp, nodeHeld)
			}
			textBuffer += nodeHeld
			nodeHeld = ""
			var scored
			[scored, text] = handleUnderscores(text)
			textBuffer += scored
		} else {
			if (nodeHeld) {
				textBuffer += nodeHeld
				nodeHeld = ""
			}
			nodeHeld = getPrimary(char)
			while (opsHeld.length > 0) {
				lastOp = opsHeld.pop()
				nodeHeld = applyUnaryOp(lastOp, nodeHeld)
			}
			if (multiplierHeld) {
				[multiplierHeld, nodeHeld] = ["",
				getProduct(multiplierHeld, nodeHeld)]
			}
		}

	}
	textBuffer += nodeHeld
	return textBuffer

}