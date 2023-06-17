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