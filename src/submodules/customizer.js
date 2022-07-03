var { default: append } = await import("./append.js")
var { default: loadscss } = await import("./loadscss.js")
// var { default: loadSpaceGame } = await import("./spacegame.js")
export default async function loadcustomizer() {
    if (window.DEBUG == 1) console.info("loadcustomizer")

    var customizerStyle = `

:root{
    // --hueComp:120;
    // --hueAscent:40;
    // --hue:180;
    // --hueLink:40;
    // --satLink:80%;
    --color-scheme:light dark;
    --lightFactor:1%;
    color-scheme: var(--color-scheme);

}
.customizer {
    flex-grow:1;
    position:relative;
    // top:0px;
    // left:0px;
    // // top: calc(100% );
    // height: calc(100vh - 100%);
    display:flex;
    display:none;
    flex-direction:column;
    justify-content:space-between;
    // min-height:10em;
    font-size: 16px;
    background-color: hsla(120, 10%, 10%,.2);
    // padding-top:5px;
    // padding:1em;
    // resize:true;
    transition:display 1s ease-in-out;
    padding:1em;
    transform: perspective(100px) translateZ(-10px);
    border:1px solid white;
    border-radius:.5em;
    


 

    // #fixedCustomizer{

    // background-color: hsla(120, 10%, 10%,.9);
    //     position: sticky;
    //     top: 0px;
    //     // min-height:100vh;

    // padding:1em;
    // }
    // #bottomCustomizer{
    //     flex-grow:1;
    // }


    // #themeselectionfloat {
    //     display: inline-grid;
    //     display: grid;
    //     background-color: hsl(120, 10%, 10%);
    //     color: hsl(var(--hueTextLight), 10%, 95%);
    //     grid-template-columns: 1fr 10fr 1fr;
    //     grid-template-rows: auto auto 1fr;
    //     overflow-y: auto;
    //     padding-bottom: 50vh;

    // }



    // .slidecontainer {
    //     grid-column: 2/3;
    //     display: grid;
    //     padding: 10px;

    //     p {
    //         font-size: 24px;

    //         span {
    //             max-width: 80%;
    //         }
    //     }

    // }




    // .showCustomizer {
    //     cursor: pointer;
    //     position: relative;

    //     &:before {
    //         font-size: .8em;
    //         display: none;
    //         top: 100%;
    //     }

    //     &:hover::before {
    //         content: "Color Theme";
    //         text-transform: capitalize;
    //         font-size: .8em;
    //         position: absolute;
    //         top: 170%;
    //         opacity: 0.75;
    //         background-color: #323232;
    //         color: #fff;
    //         padding: 4px;
    //         border-radius: 3px;
    //         display: block;
    //         width: 6em;

    //     }
    // }



    // .showColorTheme {
    //     padding-inline: 2em;
    // }

    // #themeConfig {
    //     display: grid;
    //     grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    //     grid-gap: 2em;

    //     >.button {
    //         padding: 5px;
    //         margin: 0px;
    //         max-width: minmax(50px, 200px);
    //         font-size: 12px;
    //     }
    // }



    // .vspace {
    //     display: block;
    //     padding-block: 12px;
    //     content: ""

    //     &:after {
    //         display: block;
    //         padding-block: 12px;
    //         content: ""
    //     }
    // }
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

}

export function toggleCustomizerFn() {
    let currentState = customizer.style.display
    console.log("toggleOption", currentState)
    if (currentState == "flex") { hide() }
    else if (currentState == "none") { show() }
    else { show() }
    function show() {
        console.log("show")
        customizer.style.display = "flex";
    }
    function hide() {
        console.log("hide")
        customizer.style.display = "none";

    }
}
window.toggleCustomizerFn = toggleCustomizerFn

export function toggleDarkMode() {
    let currentState = cssvar('color-scheme')
    if (window.DEBUG == 1) console.info(currentState)
    if (currentState == 'light') {
        cssvar('color-scheme', 'dark')
        cssvar('lightFactor', .3)
    }
    else {
        cssvar('color-scheme', 'light')
        cssvar('lightFactor', 1)
    }

}
window.toggleDarkMode = toggleDarkMode

export function resetTheme() {
    localStorage.clear()
    sessionStorage.clear()
}
window.resetTheme = resetTheme


function appendSliders() {
    console.info("appendSliders")
    var variables = [["Theme Color", 'hue'], ["Ascent Color", 'hueAscent'], ["Zoom", 'fontScale']]
    variables.forEach(variable => {
        append(customizer, gen(p, `${variable[1]}Control`, variable[0]))
        append(`#${variable[1]}Control`, [gen(span, `${variable[1]}Disp`), gen(input, variable[1], "", "slider themeslider", { "type": "range", "min": 0, "max": 360, "step": .1, "value": 0 })])
    })

}