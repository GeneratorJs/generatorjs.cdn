var { default: loadhtmltags } = await import("./submodules/loadhtmltags.js"); loadhtmltags()
var { default: load } = await import("./submodules/loadfunction.js"); window.load = load
var { default: append } = await import("./submodules/append.js"); window.append = append
var { default: gen } = await import("./submodules/gen.js"); window.gen = gen
var { default: log } = await import("./submodules/log.js"); window.log = log
var { default: getfile } = await import("./submodules/getfile.js"); window.getfile = getfile
var { default: loadscss } = await import("./submodules/loadscss.js"); window.loadscss = loadscss
var { default: savehtml } = await import("./submodules/savehtml.js"); window.savehtml = savehtml
var { default: loadhtml } = await import("./submodules/loadhtml.js"); window.loadhtml = loadhtml
var { default: cssvar } = await import("./submodules/cssvar.js"); window.cssvar = cssvar
var { default: registerhost } = await import("./submodules/registerhost.js")


// load if eel is loaded
if (typeof eel !== "undefined" && eel != null) {
    enableEel()
} else { /* retry once */
    setTimeout(enableEel, 4000)
}

async function enableEel() {
    if (typeof eel !== 'undefined' && eel != null) {
        window.addEventListener('contextmenu', (e) => { e.preventDefault() })
        document.addEventListener('contextmenu', (e) => { e.preventDefault() })
        var js = await import("./submodules/ifeel.js")
        eel.expose()
        window.js = js
    }
}
//function to declare basic tags as const
const app = document.getElementById('app')


function remove(c) {
    if (c != null) append(c, "", 'replace')
}
function hide(c) {
    if (c != null) c.style.display = "none"
}
window.remove = remove
window.hide = hide




//Load generator styles
export async function loaddefaults() {
    var { default: loadSpaceGame, spaceGameAnimate } = await import("./submodules/spacegame.js")
    window.loadSpaceGame = loadSpaceGame
    window.spaceGameAnimate = spaceGameAnimate
    var { default: loadCopyright } = await import("./submodules/copyright.js")
    window.loadCopyright = loadCopyright
    var { default: addCopyIcon } = await import("./submodules/addCopyIcon.js")
    window.addCopyIcon = addCopyIcon
    var { default: typeAnimate } = await import("./submodules/typeAnimate.js")
    window.typeAnimate = typeAnimate
    var { default: updatePageNav } = await import("./submodules/pagenav.js"); window.updatePageNav = updatePageNav

    addCopyIcon()
    updatePageNav()
    loadSpaceGame()
    // loadCopyright()

}
window.loaddefaults = loaddefaults


registerhost(1000 * 60 * 20)

// const $ = document.querySelectorAll


export function htmltostring(input) {
    var op = input.outerHTML.toString()
    return op
}
window.htmltostring = htmltostring

export function verb(input) {
    var op = input.outerHTML.toString().replaceAll("&", '&amp;').replaceAll('</', '&lt;&#47;').replaceAll("<", "&lt;").replaceAll(">", '&gt;')
    return op
}

window.verb = verb


function $(query) {
    var a = document.querySelectorAll(query)
    return a
}
window.$ = $