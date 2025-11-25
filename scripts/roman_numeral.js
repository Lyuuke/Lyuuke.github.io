function toRn(num, bigDigitStyle = "apostrophus", subtractive = "49") {
	/* returns the Roman numeral form of a given number
	PARAMETERS:
		`bigDigitStyle`: the style of digits >= 1000. Possible options:
			"apostrophus": use apostrophus style, where 500 = IↃ, 1000 = CIↃ, etc.
			"vinculum"
	*/

	const unus = ["I", "X", "C", "M"]
	const quinque = ["V", "L", "D"]
	switch (bigDigitStyle.toLowerCase()) {
		case "":
			maximal_interpretable = 1000000
			return
		case "":
			maximal_interpretable = 10000
			return
	}

	const maximal_interpretable

}