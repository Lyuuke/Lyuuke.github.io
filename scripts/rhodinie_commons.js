console.log("CREDITS: the vector icons used here are from game-icons.net")


function initialize() {
	infoSheets = document.getElementsByClassName("infosheet")
	focus = +document.getElementById("infosheets").getAttribute("focus") - 1
	// the index of the element in focus in `infoSheets`
	numInfoSheets = infoSheets.length
	pageNumByLabel = {}
	// store the label - page number associations
	detailIcon = document.getElementById("detailicon")
	detailInfoTitle = document.querySelector("#detailinfo > h1")
	detailInfoContent = document.querySelector("#detailinfo > p")
	detailCache = null

	for (var i = numInfoSheets - 1; i >= 0; --i) {
		thisSheet = infoSheets[i]
		sheetLabel = thisSheet.getAttribute("label")
		if (sheetLabel) {
			thisLabel = document.createElement("div")
			thisLabel.classList.add("sheetlabel")
			thisLabel.innerText = sheetLabel
			thisSheet.appendChild(thisLabel)
			pageNumByLabel[sheetLabel] = i
		}
	}

	let controller = document.getElementById("controller")
	controller.addEventListener("wheel", (ev) => {
		if (controller.wheelCooldown) {
			return
		}
		controller.wheelCooldown = true
		if (ev.deltaY < 0) {
			rotateSheets(-1)
		} else if (ev.deltaY > 0) {
			rotateSheets()
		}
		setTimeout(() => {
			controller.wheelCooldown = false
		}, 500)
	})
	controller.addEventListener("click", (ev) => {
		if (controller.clickCooldown) {
			return
		}
		controller.clickCooldown = true
		if (ev.shiftKey) {
			rotateSheets(-1)
		} else {
			rotateSheets()
		}
		setTimeout(() => {
			controller.clickCooldown = false
		}, 500)
	})

	let icons = document.querySelectorAll("figure > img")
	icons.forEach((el) => {
		el.addEventListener("click", () => {
			viewIconDetail(el)
			detailCache = el
		})

		el.addEventListener("pointerenter", () => {
			viewIconDetail(el)
		})

		el.addEventListener("pointerleave", () => {
			clearDetail()
		})
	})
}


function refreshSheets() {
	// refresh the info sheets

	for (var i = numInfoSheets - 1; i >= 0; --i) {
		let thisSheet = infoSheets[(focus + numInfoSheets - 1 - i) % numInfoSheets]
		switch (i) {
			case (numInfoSheets - 1):
				var thisOrder = 0
				break
			case 0:
				var thisOrder = 1
				break
			case 1:
				var thisOrder = 2
				break
			case (numInfoSheets - 2):
				// invisible, in front of all sheets
				var thisOrder = -1
				break
			default:
				// invisible, behind all sheets
				var thisOrder = 3
				break
		}
		thisSheet.setAttribute("order", thisOrder + "")
	}

}


function scrollFocusToTop() {
	document.querySelector('.infosheet[order="0"]').scrollTo({"top": 0, "behavior": "smooth"})
}


function rotateSheets(count = 1) {
	// rotate the sheets by `count`, negative `count` indicates a backward rotation
	scrollFocusToTop()
	focus = (focus + count) % numInfoSheets
	focus += focus < 0 ? numInfoSheets : 0
	refreshSheets()
}


function jumpToSheet(num) {
	// jump to the `num`-th (index in `infoSheets` is `num - 1`) info sheet
	let parsedNum = +num - 1
	if (isNaN(parsedNum)) {
		focus = pageNumByLabel[num]
	} else {
		focus = parsedNum
	}
	refreshSheets()
}


function viewIconDetail(iconNode) {
	if (detailIcon.src == iconNode.src) {
		return
	}
	detailIcon.classList.remove("muted")
	detailIcon.src = iconNode.src
	detailInfoTitle.innerText = iconNode.getAttribute("name") || ""
	detailInfoContent.innerText = iconNode.getAttribute("desc") || ""
}


function clearDetail() {
	if (detailCache) {
		if (detailCache.src == detailIcon.src) { return }
		detailIcon.classList.add("muted")
		detailIcon.src = detailCache.src
		detailInfoTitle.innerText = detailCache.getAttribute("name") || ""
		detailInfoContent.innerText = detailCache.getAttribute("desc") || ""
		detailIcon.classList.remove("muted")
	} else {
		detailIcon.classList.add("muted")
		detailInfoTitle.innerText = ""
		detailInfoContent.innerText = ""
		detailIcon.src = "./images/nexus_penumbra/transparent_16.png"
	}
}


function forget() {
	detailCache = null
}