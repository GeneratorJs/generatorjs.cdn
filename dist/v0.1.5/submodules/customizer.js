var { default: append } = await import("./append.js")
var { default: loadscss } = await import("./loadscss.js")
// var { default: loadSpaceGame } = await import("./spacegame.js")
export default async function loadcustomizer() {
    if (window.DEBUG == 1) console.info("loadcustomizer")

    var customizerStyle = `

// :root{
//     // --hueComp:120;
//     // --hueAscent:40;
//     // --hue:180;
//     // --hueLink:40;
//     // --satLink:80%;
//     // --color-scheme:light dark;
//     // --lightFactor:1;

// }
.customizer {
    font-family:Open sans, Arial,sans-serif,Verdana;
    position:relative;
    display:flex;
    display:none;
    flex-direction:column;
    justify-content:space-between;
    font-size: 16px;
    background-color: hsla(120, 10%, 10%,.2);
    transition:display 1s ease-in-out;
    padding:1em;
    transform: perspective(100px) translateZ(-10px);
    border:2px solid white;
    border-radius:5px;
    margin-block:2px;

    #customizerh3{
        // font-family:Open sans, Arial,sans-serif,Verdana;
        font-size:20px;
        text-transform:uppercase;
    }

    .themeSliderGroup{
        display:flex;
        flex-direction:column;

        .themeSliderGroupP{
            max-width:100%;
            padding:2px;

            &:nth-child(3n){
                margin-bottom:20px;
                // padding-bottom:.5em;

            }
            .sliderDisp{
                margin-inline:4px;
            }
    
            .themeslider,.themeselect{
                max-width:100%;
                width:100%;
                cursor:pointer;
            }
            .themeselect{
                padding:4px;
                margin-left:6px;
            }

            >span{
                display:flex;
                flex-direction:row;
            }
        }



    }
   .buttonGroup{
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    .themeButton{
        border-radius:10px;
        border:2px solid white;
        width:max(auto,160px);
        margin:10px;
        padding:3px 8px;
        cursor:pointer;
       &:hover{
        box-shadow:0px 0px 4px white;

       }
    }
   }
    
   


}
`
    loadscss(customizerStyle, "customizer")


    if (document.getElementById("customizer") == null) {
        append(pageNav, gen(aside, "customizer", "", "customizer"))
    } else {
        append(customizer, gen(aside, "customizer", "", "customizer"), "replace")
    }


    append(customizer, gen("h3", "customizerh3", "customizer", ''))


    appendSliders()
    append(customizer, gen(div, "buttonGroup", "", "buttonGroup"))
    append(buttonGroup, gen(span, "customizerSaveThemeButton", 'Save', 'themeButton', { "onclick": "saveTheme()" }))
    append(buttonGroup, gen(span, "customizerResetThemeButton", 'Reset', 'themeButton', { "onclick": "resetTheme()" }))
    // append(customizer, gen(span, "customizerSaveThemeButton", 'save', 'themeButton', { "onclick": "saveTheme()" }))

}

export async function toggleCustomizerFn() {
    let currentState = customizer.style.display
    if (currentState == "flex") { hide() }
    else if (currentState == "none") { show() }
    else { show() }
    function show() {
        customizer.style.display = "flex";
    }
    function hide() {
        customizer.style.display = "none";

    }
}
window.toggleCustomizerFn = toggleCustomizerFn

export async function toggleDarkMode() {
    let currentState = cssvar('colorScheme')
    if (window.DEBUG == 1) console.info(currentState)
    if (currentState == 'light') {
        cssvar('colorScheme', 'dark')
        cssvar('lightFactor', 1)
        cssvar('textColor', "#EEE")
        cssvar('textShadow', "#222")
    }
    else {
        cssvar('colorScheme', 'light')
        cssvar('lightFactor', 3)
        cssvar('textColor', "#222")
        cssvar('textShadow', "#555")
    }

}
window.toggleDarkMode = toggleDarkMode




function appendSliders() {
    console.info("appendSliders")

    var variables = [["Theme Color", 'hue'], ["Saturation", "sat"], ["Brightness", 'light'], ["Ascent Color", 'hueAscent'], ["Ascent Saturation", 'satAscent'], ["Ascent Brigntness", 'lightAscent'], ["Zoom", 'fontScale'], ["Font", 'fontFamily']]
    // var variables = [["Theme Color", 'hue'], ["Ascent Color", 'hueAscent'], ["Zoom", 'fontScale']]
    append(customizer, gen(div, "themeSliderGroup", "", "themeSliderGroup"))
    variables.forEach(variable => {
        var id = `${variable[1]}Control`
        append(themeSliderGroup, gen(p, id, gen(span, `${id}Span`, variable[0]), "themeSliderGroupP"))
        if (variable[1] == "fontFamily") {
            append(`#${id}Span`, gen(select, variable[1], "", "themeselect", { "onchange": "updateVar(this)" }))

            if (fontList == undefined) var fontList = new Set(["Poppins", "Exo", "Play", "Bebas Neue", "Comic Neue", "Cutive Mono", "Permanent Marker", "Dancing Script", "Roboto", "Montserrat", "Gulzar", "Splash", "Bebas Neue", "Comic Neue", "Cutive Mono", "Dancing Script", "Tahoma", "Arial", "Lora", "Hind", "Cairo", "Bitter", "The Nautigal", "Abel", "Yellowtail", "Caveat", "Open sans", "Verdana", "Inter", "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans serif"].sort())
            fontList.forEach(f => {
                append(`#${variable[1]}`, gen(option, "", f, "", { 'value': f }))
            })
        }
        else {
            append(`#${id}Span`, gen(span, `${variable[1]}Disp`, "", "sliderDisp"))
            append(`#${id}`, "<br")

            append(`#${id}`, gen(input, variable[1], "", "slider themeslider", { "type": "range", "min": 0, "max": 360, "step": .1, "value": 0, "onchange": "updateVar(this)" }))
        }


    })
    // loadColorConfig()
    if (localStorage.getItem("ColorConfig") == null) {
        if (localStorage.getItem("defaultColorConfig") == null) {
            saveTheme("defaultColorConfig")
        }
    }
    else {
        loadSavedTheme()
    }
    updateThemeSliders()

}















async function updateThemeSliders(
    variables = "hue,sat,light,hueAscent,satAscent,lightAscent,fontScale,fontFamily") {
    variables.split(",").forEach(variable => {

        try {
            var id = variable
            var val = cssvar(id)


            if (id.includes("light") || id.includes("sat")) {
                append(`#${id}Disp`, val, 'over')
                val = val.split("%")[0] / 100 * 360.0;
            }
            else if (id.includes("fontScale")) {
                append(`#${id}Disp`, Math.round(val * 100) / 100, 'over')
                val = (val - 0.4) * 360.0 / 4.0;
            }
            else if (!id.includes("fontFamily")) {
                val = val.replaceAll('""', '"')
                append(`#${id}Disp`, val, 'over')
            }

            var elem = document.getElementById(id);
            elem.value = val;
            elem.setAttribute("value", val)

        }
        catch (e) { console.error(e) }
    })
}
// from MAC


window.updateThemeSliders = updateThemeSliders








export async function resetTheme() {
    loadSavedTheme("defaultColorConfig")
    updateThemeSliders()
    localStorage.removeItem("colorConfig")
    sessionStorage.removeItem("colorConfig")
}

window.resetTheme = resetTheme




export async function saveTheme(varName = "colorConfig") {
    // var selectedFont = document.getElementById("FontSelect").value
    // cssVar("--fontFamily", selectedFont)

    var varsToSave = "hue,sat,light,hueAscent,satAscent,lightAscent,lightFactor,fontScale,fontFamily,colorScheme,textColor"
    var expression = `var ${varName} = {};`
    eval(expression)
    var colorConfig = {}
    varsToSave.split(",").forEach(v => {
        // var string = `colorConfig.${v} = cssvar("${v}")`
        var string = `colorConfig.${v} = cssvar("${v}")`.replaceAll('""', '"')
        // log(string)
        eval(string)
    })
    localStorage.removeItem(varName)
    localStorage.setItem(varName, JSON.stringify(colorConfig))
}
window.saveTheme = saveTheme

export async function loadSavedTheme(varName = "colorConfig") {
    // log(varName)
    var colorConfig = JSON.parse(localStorage.getItem(varName))
    // window.colorConfig = colorConfig
    // log(colorConfig)
    Object.entries(colorConfig).forEach(pair => {


        // [key, val] = pair
        var key = pair[0]
        var val = pair[1]
        try {
            if (key != null && val != null) {
                val = val.replaceAll('""', '"')
                var string = `cssvar("${key}","${val}")`
                string = string.replaceAll('""', '"')
                eval(string)
            }

        }
        catch (e) { console.error(e) }
    })
}
window.loadSavedTheme = loadSavedTheme


async function updateVar(target) {
    try {

        var id = target.id
        var val = target.value
        if (id.includes("fontFamily")) {
            // var FontName = cssvar("fontFamily").replaceAll(" ", "+")
            var FontName = val.replaceAll(" ", "+")
            var googleFontUrlStyle = `
            @import url('https://fonts.googleapis.com/css2?family=${FontName}&display=swap');
            `
            loadscss(googleFontUrlStyle)

            document.fonts.ready.then(cssvar(id, val));

        }

        if (id.includes("light") || id.includes("sat")) cssvar(id, Math.round(val * 100.0 / 360.0, 2) + "%")
        else if (id.includes("fontScale")) {
            cssvar(id, ((val / 360.0) * 4.0) + 0.4)
        }

        else cssvar(id, val)
        // setTimeout(() => {
        //     cssvar(id, val)
        // }, 2000)
    }
    catch (e) { console.error(e) }
    finally {
        updateThemeSliders()
    }

}
window.updateVar = updateVar