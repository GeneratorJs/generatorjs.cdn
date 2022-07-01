var { default: append } = await import("./append.js")
var { default: loadscss } = await import("./loadscss.js")
export default async function loadcustomizer() {
    var customizerStyle = `
#approot{
    display:flex;
    flex-direction:row;
}

#app{
    grid-area: app;
    // width:100%;
}
#customizer {
    display: grid;
    // display: none;
    grid-template-columns: 1fr;
    grid-template-rows: 100vh 1fr;
    background-color: hsl(120, 10%, 10%);
    color: hsl(120, 10%, 95%);
    padding: 10px;
    z-index: 11;
    font-size: 16px;
    max-width: min(300px, 80vw);

    >.sticky {
        position: sticky;
        top: 0px;
        height: 100vh;
        display: grid;
        grid-template-rows: auto 80vh auto 1fr;

        >h2 {
            padding: 0px;
            margin: 0px;
            position: sticky;
            top: 0px;
        }
    }




    #themeselectionfloat {
        display: inline-grid;
        display: grid;
        background-color: hsl(120, 10%, 10%);
        color: hsl(var(--hueTextLight), 10%, 95%);
        grid-template-columns: 1fr 10fr 1fr;
        grid-template-rows: auto auto 1fr;
        overflow-y: auto;
        padding-bottom: 50vh;

    }



    .slidecontainer {
        grid-column: 2/3;
        display: grid;
        padding: 10px;

        p {
            font-size: 24px;

            span {
                max-width: 80%;
            }
        }

    }




    .showCustomizer {
        cursor: pointer;
        position: relative;

        &:before {
            font-size: .8em;
            display: none;
            top: 100%;
        }

        &:hover::before {
            content: "Color Theme";
            text-transform: capitalize;
            font-size: .8em;
            position: absolute;
            top: 170%;
            opacity: 0.75;
            background-color: #323232;
            color: #fff;
            padding: 4px;
            border-radius: 3px;
            display: block;
            width: 6em;

        }
    }



    .showColorTheme {
        padding-inline: 2em;
    }

    #themeConfig {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
        grid-gap: 2em;

        >.button {
            padding: 5px;
            margin: 0px;
            max-width: minmax(50px, 200px);
            font-size: 12px;
        }
    }



    .vspace {
        display: block;
        padding-block: 12px;
        content: ""

        &:after {
            display: block;
            padding-block: 12px;
            content: ""
        }
    }
}
`
    // loadscss(customizerStyle)


    if (document.getElementById("customizer") == null) {
        append(pageNav, gen(div, "customizer", "", "customizer"))
    } else {
        append(customizer, gen(div, "customizer", "", "customizer"), "replace")
    }


    // append(themeControl, gen("h3", "", "Theme Control"))
    // append(customizer, gen("h1", "customizerh3", "customizer", ''))




}

export function toggleCustomizer() {
    app.style.left = "300px"
    customizer.style.default = "grid"
}

window.toggleCustomizer = toggleCustomizer