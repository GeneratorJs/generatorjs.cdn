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


    .themeSliderGroup{
        display:flex;
        flex-direction:column;
        .themeSliderGroupP{
            max-width:100%;
            .sliderDisp{
                // padding:.5em;
                margin-inline:.2em;
            }
    
            .themeslider,.themeselect{
                max-width:100%;
                width:100%;
                cursor:pointer;
            }
            .themeselect{
                padding:.2em;
                margin-left:.5em;
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
        border-radius:1em;
        border:2px solid white;
        width:max(auto,10em);
        margin:1em;
        padding:.5em 1em ;
        cursor:pointer;
       
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


    append(customizer, gen("h1", "customizerh3", "customizer", ''))


    appendSliders()
    append(customizer, gen(div, "buttonGroup", "", "buttonGroup"))
    append(buttonGroup, gen(span, "customizerSaveThemeButton", 'Save', 'themeButton', { "onclick": "saveTheme()" }))
    append(buttonGroup, gen(span, "customizerResetThemeButton", 'Reset', 'themeButton', { "onclick": "resetTheme()" }))
    // append(customizer, gen(span, "customizerSaveThemeButton", 'save', 'themeButton', { "onclick": "saveTheme()" }))

}

export function toggleCustomizerFn() {
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

export function toggleDarkMode() {
    let currentState = cssvar('color-scheme')
    if (window.DEBUG == 1) console.info(currentState)
    if (currentState == 'light') {
        cssvar('color-scheme', 'dark')
        cssvar('lightFactor', 1)
        cssvar('textColor', "#EEE")
        cssvar('textShadow', "#222")
    }
    else {
        cssvar('color-scheme', 'light')
        cssvar('lightFactor', 3)
        cssvar('textColor', "#222")
        cssvar('textShadow', "#555")
    }

}
window.toggleDarkMode = toggleDarkMode




function appendSliders() {
    console.info("appendSliders")

    var variables = [["Theme Color", 'hue'], ["Brightness", 'light'], ["Ascent Color", 'hueAscent'], ["Zoom", 'fontScale'], ["Font", 'fontFamily']]
    // var variables = [["Theme Color", 'hue'], ["Ascent Color", 'hueAscent'], ["Zoom", 'fontScale']]
    append(customizer, gen(div, "themeSliderGroup", "", "themeSliderGroup"))
    variables.forEach(variable => {
        var id = `${variable[1]}Control`
        append(themeSliderGroup, gen(p, id, gen(span, `${id}Span`, variable[0]), "themeSliderGroupP"))
        if (variable[1] == "fontFamily") {
            append(`#${id}Span`, gen(select, variable[1], "", "themeselect", { "onchange": "updateVar(this)" }))

            if (fontList == undefined) var fontList = new Set(["Poppins", "Exo", "Play", "Bebas Neue", "Comic Neue", "Cutive Mono", "Dancing Script", "Roboto", "Montserrat", "Gulzar", "Splash", "Bebas Neue", "Comic Neue", "Cutive Mono", "Dancing Script", "Tahoma", "Arial", "Lora", "Hind", "Cairo", "Bitter", "The Nautigal", "Abel", "Yellowtail", "Caveat", "Open sans", "Verdana", "Inter", "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans serif"].sort())
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
    loadColorConfig()
    updateThemeSliders()

}















function updateThemeSliders(variables = ["hue", "hueAscent", "light", "fontScale", "fontFamily"]) {

    variables.forEach(variable => {
        try {
            var id = variable
            var val = cssvar(id)


            if (id.includes("light") || id.includes("sat")) {
                append(`#${id}Disp`, val, 'over')
                val = val * 360.0;
            }
            else if (id.includes("fontScale")) {
                append(`#${id}Disp`, Math.round(val * 100) / 100, 'over')
                val = (val - 0.4) * 360.0 / 4.0;
            }
            else if (!id.includes("fontFamily")) append(`#${id}Disp`, val, 'over')
            var elem = document.getElementById(id);
            elem.setAttribute("value", val)
        }
        catch (e) { console.error(e) }
    })
}
// from MAC











export function resetTheme() {
    // cssVar("--light", cssVar("--lightDefault"))
    // cssVar("--sat", cssVar("--satDefault"))
    // cssVar("--hue", cssVar("--hueDefault"))
    localStorage.clear()
    sessionStorage.clear()
    // reloadAll()
    // loadColorConfig()
}

window.resetTheme = resetTheme



function saveTheme() {
    var selectedFont = document.getElementById("FontSelect").value
    cssVar("--fontFamily", selectedFont)

    var colorConfig = [
        cssVar("--hue"),
        cssVar("--hueAscent"),
        cssVar("--fontSize"),
        cssVar("--fontFamily")
        // document.getElementById("FontSelect").value
    ]
    sessionStorage.removeItem("colorConfig")
    sessionStorage.setItem("colorConfig", JSON.stringify(colorConfig))
}

async function loadColorConfig(inputConfig) {
    try {
        if (inputConfig == null) inputConfig = await JSON.parse(sessionStorage.getItem("colorConfig"))
        if (inputConfig != null) {
            cssVar("--hue", inputConfig[0])
            cssVar("--hueAscent", inputConfig[1])
            cssVar("--fontSize", inputConfig[2])
            cssVar("--fontFamily", inputConfig[3])
        }
    }
    catch (e) { console.error(e) }
}


function changeBodyFont() {
    var fontselecteled = document.getElementById("FontSelect").value
    cssVar("--font-body", `"${fontselecteled}"`)
    document.body.style.fontFamily = fontselecteled
    var all_headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6")
    for (i = 0; i < all_headings.length; i++) {
        cssVar("--font-body", `"${fontselecteled}"; `)
        all_headings[i].style.fontFamily = fontselecteled
    }
}

function updateVar(target) {
    try {

        var id = target.id
        var val = target.value
        if (id.includes("fontFamily")) {
            var FontName = cssvar("fontFamily").replaceAll(" ", "+")
            var googleFontUrlStyle = `@import url('https://fonts.googleapis.com/css2?family=${FontName}:wght@100&display=swap');`
            loadscss(googleFontUrlStyle, 'FontImport')
        }

        if (id.includes("light") || id.includes("sat")) cssvar(id, Math.round(val * 100.0 / 360.0, 2) + "%")
        else if (id.includes("fontScale")) {
            cssvar(id, ((val / 360.0) * 4.0) + 0.4)
        }

        else cssvar(id, val)
        updateThemeSliders()
    }
    catch (e) { console.error(e) }

}
window.updateVar = updateVar