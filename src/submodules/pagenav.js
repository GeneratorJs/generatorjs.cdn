var { default: append } = await import("./append.js")
var { default: loadscss } = await import("./loadscss.js")
var { default: loadCustomizer } = await import("./customizer.js")
export default function updatePageNav() {




    try {



        var googleRoundIcon = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`
        if (document.getElementById("googleIconsPageNav") == null) append("head", gen("link", "googleIconsPageNav", "", "", { "rel": "stylesheet", "href": googleRoundIcon }))
        var pageNavStyle = `

#pageNav {
    --hueComp:120;
    --hueAscent:40;
    --hue:180;
    --hueLink:40;
    --satLink:80%;
    outline-top:1px solid aqua;
    position: absolute;
    top: calc(100% + 3px);
    right: 0px;
    width: minmax(300px, 30%);
    max-width: 80vw;
    height: calc(100vh - 100%);
    color: white;
    // padding-top: 4em;
    // z-Index: calc(inherit + -1);
    filter: blur(4px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding:20px;
    --leftpadding: min(8vw, 15em);

    padding-left: var(--leftpadding);

    transform: translateX(calc(100% - var(--leftpadding) + 10px));
    transition: all 200ms ease-out;


    #themeControl {

        position:relative;
        top:0%;
        display: flex;
        flex-direction: column;
        padding-inline: 2em;
        padding-block: 1em;
        margin-bottom: .5em;
z-Index:+1;
        .themeControlUl{
            // padding-block: 1em;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;

            li {
                padding-inline: 25px;
                // margin-inline: 30px;
                cursor:pointer;
            }
        }


        .material-symbols-rounded {
            font-variation-settings:
                'FILL'0,
                'wght'400,
                'GRAD'0,
                'opsz'48
        }
    
        .material-symbols-outlined {
            font-variation-settings:
                'FILL'0,
                'wght'400,
                'GRAD'0,
                'opsz'48
        }
    }
    #pageNavUl {
        position:relative;
        --hueComp:40;
        // background-color: hsla(var(--hueComp,50), 20%, 10%, 0.5);
        display: flex;
        flex-direction: column;
        min-height: 40vh;
        max-height: min(calc(100% - 2em), calc(100vh - 2em));
        overflow-y: auto;
        padding-top: 1em;
        padding-bottom: 110%;
        z-index: 4;
        li>a {
            --sat: 10%;
            --light: 80%;
            --lightLink: 10%;
            color: hsl(var(--hueLink), var(--satLink), var(--lightLink));
            background-color: hsl(var(--hueComp), var(--sat), var(--light));
            margin-block: .5em;
            max-width: 18em;
            padding-inline: .5em;
            margin-inline: 1em;
            overflow-x:auto;
            text-shadow:none;
        }

    }

    &:hover {
        padding-inline: 3em;
        --sat: 10%;
        --light: 5%;
        background-color: hsla(var(--hueComp), var(--sat), var(--light), .8);
        transform: translateX(0%);
        filter: blur(0px);

    }
    
    .hoverblock {
        display: block;
        padding: .2em;
        padding-inline: 1em;
        margin-block: .1em;
        background-color: hsl(var(--hueAscent), 20%, 90%);
        max-width: min(90%, 90vw);
        text-transform: uppercase;
        perspective:100px;

        &:hover {
            transform: perspective(100px) translateZ(10px);
            box-shadow: 2px 2px 15px rgba(0, 0, 0, .5);
            z-index:calc(inherit + 2 );
            padding-block:calc(inherit + .5em);
            margin-block:calc(inherit + -.5em);

        }
    }






#mGeekCopyright{
    display:flex;
    flex-direction:row;
    justify-content:right;
    font-size:10px;
    a{
    color:aqua;
    }
    
}



    // a+.activesection {
    //     --sat: 40%;
    //     --light: 60%;
    //     background-color: hsl(var(--hueComp), var(--sat), var(--light));
    // }
}
`

        loadscss(pageNavStyle, 'pageNav')

        setTimeout(() => {
            try {

                loadPageNav()
                loadThemeControl()
                updatePageNavUl()
                append(pageNav, gen("div", "mGeekCopyright", `&copy <a href="http://mgeek.in"> mGeek.in</a>`))

                // loadCustomizer()
                // append(pageNav, gen("div", 'customiser', "", "customiser"))

                document.querySelectorAll("header")[0].addEventListener('click', updatePageNav)

            }
            catch (err) { console.error(err) }
        }, 2000)
    }
    catch (err) { console.error(err) }











}


function loadPageNav(target = header) {
    if (document.getElementById("pageNav") == null) {
        append(target, gen("div", "pageNav"))
    } else {
        append(pageNav, "", "over")
    }


}


function updatePageNavUl() {
    if (document.getElementById("pageNavUl") == null) {
        append(pageNav, gen("ul", "pageNavUl"))
    } else {
        append(pageNavUl, "", "over")
    }
    append(pageNavUl, "", "over")

    var sectionlist = document.querySelectorAll("main #hero>h1,main div h1,main section h1,main footer h1")
    sectionlist.forEach(element => {
        var pageNavUl = document.getElementById("pageNavUl")
        append(pageNavUl, gen("li", "", gen(a, "", element.innerHTML, 'hoverblock', `#${element.parentElement.id}`.replaceAll("##", "#"))))
    });
}


function loadThemeControl() {
    if (document.getElementById("themeControl") == null) {
        append(pageNav, gen("div", "themeControl"))
    } else {
        append(themeControl, "", "over")
    }


    // append(themeControl, gen("h3", "", "Theme Control"))
    append(themeControl, gen("ul", "themeControlUl", "", 'themeControlUl'))
    var ThemeButtonAndFunction = [["resetTheme", 'restart_alt'], ["toggleDarkMode", 'dark_mode'], ["toggleCustomizer", 'tune']]
    ThemeButtonAndFunction.forEach(t => {
        append(themeControlUl, gen("li", "", t[1], 'material-symbols-outlined', { "onclick": t[0] }))
    })
    // }



    append(pageNav, gen("ul", "pageNavUl", ""))

}


window.updatePageNav = updatePageNav


updatePageNav()







