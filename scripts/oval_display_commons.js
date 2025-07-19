function initialize() {

	segments = []
	let thisSvg = document.getElementById("segdisplay1")
	thisSvg.addEventListener(
		"load", () => {
			var svgDocument = thisSvg.contentDocument
			for (var i = 1; i <= 13; ++i) {
				let thisSegmentId = `disp_seg${i.toString(16)}`
				let thisSegment = svgDocument.getElementById(thisSegmentId)
				setQuenched(thisSegment)
				segments.push(thisSegment)
			}
		}
	)

}


function setQuenched(pathEl) {
	if (~pathEl.classList.contains("quenched")) {
		pathEl.classList.add("quenched")
		pathEl.classList.remove("lit")
	}
}


function setLit(pathEl) {
	if (~pathEl.classList.contains("lit")) {
		pathEl.classList.add("lit")
		pathEl.classList.remove("quenched")
	}
}


function toggleDisplay(bin) {

	for (var i = 12; i >= 0; --i) {
		let bitState = bin & 1
		bin >>= 1
		let thisSegment = segments[i]
		if (bitState) {
			setLit(thisSegment)
		} else {
			setQuenched(thisSegment)
		}
	}

}