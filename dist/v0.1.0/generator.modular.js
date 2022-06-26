var { default: load } = await import("./submodules/loadfunction.js"); window.load = load
var { default: append } = await import("./submodules/append.js"); window.append = append
var { default: gen } = await import("./submodules/gen.js"); window.gen = gen
var { default: log } = await import("./submodules/log.js"); window.log = log
var { default: getfile } = await import("./submodules/getfile.js"); window.getfile = getfile
var { default: loadscss } = await import("./submodules/loadscss.js"); window.loadscss = loadscss
var { default: saveHTML } = await import("./submodules/savehtml.js"); window.saveHTML = saveHTML
var { default: cssvar } = await import("./submodules/cssvar.js"); window.cssvar = cssvar

// load if eel is loaded
if (typeof eel !== 'undefined' && eel != null) {
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
function loadBasicHtmlVariables() {
    var listOfBasicHtmlTags = "div,p,span,b,i,img,video,picture,canvas,svg,audio,h1,h2,h3,h4,h5,h6,table,thead,tbody,tr,td,ul,li,ol,a,textarea,input,output,select,option,checkbox,radio,button,embed,object,iframe,kbd,code,dl,dt,dd,meta,pre,form,fieldset,legend,label,section,main,aside,header,footer,nav,meta,head,body,dialog,details,summary,figure,figcaption,sidebar,style,script,del,ins,wbr,mark,time";
    var list = listOfBasicHtmlTags.replaceAll(' ', ',').replaceAll(',,', ',')
    let start = 0;
    let end = list.length
    let comaAt = []
    for (let i = 0; i < list.length; i++) {
        if (list[i] == ',') comaAt[comaAt.length] = i
    }
    if (comaAt.length == 0) eval(eval(`const ${list}='${list}';`))
    if (comaAt.length > 0) {
        comaAt[comaAt.length] = end
        for (let i = 0; i < comaAt.length; i++) {
            var tag = list.slice(start, comaAt[i])
            start = comaAt[i] + 1
            if (tag.length > 0) {
                let expression = `window.${tag} = '${tag}'`
                window.eval(expression)
            }
        }
    }
}
loadBasicHtmlVariables()

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
    var { default: loadSpaceGame } = await import("./submodules/spacegame.js")
    window.loadSpaceGame = loadSpaceGame
    var { default: loadCopyright } = await import("./submodules/copyright.js")
    window.loadCopyright = loadCopyright
    var { default: addCopyIcon } = await import("./submodules/addCopyIcon.js")
    window.addCopyIcon = addCopyIcon
    var { default: typeAnimate } = await import("./submodules/typeAnimate.js")
    window.typeAnimate = typeAnimate
    addCopyIcon()
    loadSpaceGame()
    loadCopyright()
}
window.loaddefaults = loaddefaults
