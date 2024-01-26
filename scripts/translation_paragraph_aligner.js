var refText = document.querySelectorAll(".translation_3col td:first-child")
var transText = document.querySelectorAll(".translation_3col td:nth-child(2)")

refText.forEach((thisRef, i) => {
	let thisRefPars = Array.from(thisRef.children)
	let thisTransPars = Array.from(transText[i].children)
	thisRefPars.forEach((par, j) => {
		let tPar = thisTransPars[j]
		higherHeight = Math.max(
			parseFloat(window.getComputedStyle(par, null).height.slice(0, -2)),
			parseFloat(window.getComputedStyle(tPar, null).height.slice(0, -2))
		)
		par.style.height = higherHeight + "px"
		tPar.style.height = higherHeight + "px"
	})
})