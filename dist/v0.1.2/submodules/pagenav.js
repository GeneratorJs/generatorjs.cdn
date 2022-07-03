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
            top: 100%;
            height: calc(100vh - 100%);
            overflow:auto;
            right: 0px;
            width: minmax(400px, 30%);
            max-width: 80vw;
            
            color: white;
            // padding-top: 4em;
            // z-index: 20;
            filter: blur(4px);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding:2em;
            --leftpadding: min(8vw, 15em);
            padding-left: var(--leftpadding);
            transform: translateX(calc(100% - var(--leftpadding) + 10px));
            transition: all 200ms ease-out;

            h1{
                text-transform:uppercase;
            }
            #themeControl {
                position:sticky;
                // top:2em;
                display: flex;
                flex-direction: column;
                padding:1em;
                // padding-top: 1em;
                // margin-bottom: .5em;
                
                .themeControlUl{
                    margin-top:10px;
                    margin-bottom:10px;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content:space-around;
                    li {
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
                // flex-shrink:1;
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
                // z-index: 4;
                li>a {
                    --sat: 10%;
                    --light: 80%;
                    --lightLink: 10%;
                    color: hsl(var(--hueLink), var(--satLink), var(--lightLink));
                    background-color: hsl(var(--hueComp), var(--sat), var(--light));
                    margin-block: .2em;
                    max-width: 18em;
                    overflow-x:auto;
                    text-shadow:none;
                }

            }

            &:hover {
                padding-inline: 3em;
                --sat: 10%;
                --light: 5%;
                --alpha:.8;
                background-color: hsla(var(--hueComp,180), var(--sat), var(--light), var(--alpha));
                transform: translateX(0%);
                filter: blur(0px);

            }
            
            .hoverblock {
                display: block;
                padding: .5em;
                padding-inline: 1em;
                margin-block: .1em;
                background-color: hsl(var(--hueAscent), 20%, 90%);
                max-width: min(90%, 90vw);
                text-transform: uppercase;
                // perspective:100px;
                // perspective:100px;
                transform: perspective(100px) translateZ(-10px);

                &:hover {

                transform: perspective(100px) translateZ(0);
                    // transform: perspective(100px) translateZ(10px);
                    box-shadow: 2px 2px 15px rgba(0, 0, 0, .5);
                    z-index:calc(inherit + 2 );
                    padding-block:calc(inherit + .5em);
                    margin-block:calc(inherit + -.5em);

                }
            }                                           


            .copyurl{
                // position:sticky;
                padding-bottom:4em;
                font-size:12px;
                a{
                    color:aqua;
                }
            }

            
        }


}
`

        loadscss(pageNavStyle, 'pageNav')

        setTimeout(() => {
            try {

                loadPageNav()
                loadThemeControl()
                updatePageNavUl()
                loadCustomizer()
                // append(pageNav, gen("span", 'mGeekCopyright', "mGeek", "mGeek"))


                // document.querySelectorAll("header")[0].addEventListener('click', updatePageNav)

            }
            catch (err) { console.error(err) }
        }, 3000)
    }
    catch (err) { console.error(err) }











}


function loadPageNav(target = header) {
    if (document.getElementById("pageNav") == null) {
        append(target, gen(aside, "pageNav"))
    } else {
        append(pageNav, "", "over")
    }


}


function updatePageNavUl() {
    if (document.getElementById("pageNavUl") == null) {
        append(themeControl, gen("ul", "pageNavUl"))
    } else {
        append(pageNavUl, "", "over")
    }
    append(pageNavUl, "", "over")

    var sectionlist = document.querySelectorAll("main #hero>h1,main div h1,main section h1,footer h1")
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
    var ThemeButtonAndFunction = [["resetTheme()", 'restart_alt'], ["toggleDarkMode()", 'dark_mode'], ["toggleCustomizerFn()", 'tune']]
    ThemeButtonAndFunction.forEach(t => {
        append(themeControlUl, gen("li", "", t[1], 'material-symbols-outlined', { "onclick": t[0] }))
    })
    // }


    append(pageNav, gen(aside, "customizer", "", "customizer"))

    append(pageNav, gen("ul", "pageNavUl", ""))
    let d = new Date();
    let year = d.getFullYear();
    append(pageNav, gen("span", "", `&copy ${year} <a href="http://mgeek.in">mGeek.in</a>`, 'copyurl'))


}


window.updatePageNav = updatePageNav


// updatePageNav()







