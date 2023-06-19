function selectEntry(entryNum) {

    var entries = document.getElementsByClassName("navbarentry")
    var thisFocus = entries[entryNum]
    thisFocus.classList.remove("inactiveentry")
    thisFocus.classList.add("activeentry")

    for (ent = 0; ent < entries.length; ++ent) {
        if (ent == entryNum) continue
        var thisEntry = entries[ent]
        thisEntry.classList.remove("activeentry")
        thisEntry.classList.add("inactiveentry")
    }

    var navbox = document.getElementById("navbox")
    var navboxDeco = document.getElementById("waves")
    navbox.style.transform = "translateY(-40em)"
    navboxDeco.style.top = "calc(-48em * 120 / 795 - 40em)"

}


function showContent(entryNum) {

    var contentSource = {
        0: "images/frontpage_intro_0.png",
        1: "images/frontpage_intro_1.png",
        2: "images/frontpage_intro_2.png",
        3: "images/frontpage_intro_3.png",
        4: "images/frontpage_intro_4.png",
        5: "images/frontpage_intro_5.png",
        6: "images/frontpage_intro_6.png",
        7: "images/frontpage_intro_7.png"
    }
    var bgColorSpec = {
        0: "#414243",
        1: "#988d78",
        2: "#414243",
        3: "#6c7e84",
        4: "#767b51",
        5: "#767675",
        6: "#78a399",
        7: "#414243"
    }
    var contentbox = document.getElementById("contentbox")
    contentbox.style.backgroundImage = "url(" + contentSource[entryNum] + ")"
    contentbox.style.backgroundColor = bgColorSpec[entryNum]

}