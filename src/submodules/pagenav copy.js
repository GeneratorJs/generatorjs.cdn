const PageNav = () => {

    self = {}
    self.init = () => {
        var googleRoundIcon = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`
        if (document.getElementById("googleIconsPageNav") == null) {
            append("head", gen("link", "googleIconsPageNav", "", "", { "rel": "stylesheet", "href": googleRoundIcon }))
        }
        loadscss(self.pageNavStyle, 'pageNav')
        self.loadPageNav()
        self.loadThemeControl()
        self.updatePageNavUl()
        self.customizer()

        document.addEventListener('scroll', self.updateActiveSection)
    }


    self.pageNavStyle = `
        #pageNav {
            font-family:Open sans, Arial,sans-serif,Verdana;
            font-size:1rem;
            --hueComp:120;
            --hueAscent:40;
            --hue:180;
            --hueLink:40;
            --satLink:80%;
            position: absolute;
            top: 100%;
            height: calc(100vh - 100%);
            overflow:auto;
            right: 0px;
            width: minmax(400px, 30%);
            max-width: 80vw;
            
            color: white;
            filter: blur(4px);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;;
            --leftpadding: min(8vw, 150px);
            padding-left: var(--leftpadding);
            transform: translateX(calc(100% - var(--leftpadding)));
            transition: all 200ms ease-out;

            overflow-x: hidden;
            overflow-y: auto;
            
            width: var(--leftpadding);



            *{
                text-decoration:none;
                link-style:none;
            }
           h1{
                text-transform:uppercase;
            }
            #themeControl {
                position:sticky;
                display: flex;
                flex-direction: column;
                padding:10px;
                
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
                max-height: min(calc(100% - 20px), calc(100vh -20px));
                overflow-y: auto;
                padding-top: 10px;
                padding-bottom: 110%;
                // z-index: 4;
                li>a {
                    --sat: 10%;
                    --light: 80%;
                    --lightLink: 10%;
                    // color: hsl(var(--hueLink,var(--hueAscent,180)), var(--satLink,var(--satAscent,60%)), var(--lightLink,var(--lightAscent,60%)));
                    // background-color: hsl(var(--hueComp,40), var(--sat,15%), var(--light,70%));
                    margin-block: 10px;
                    max-width: max(18em,100%);
                    overflow-x:auto;
                    text-shadow:none;
                }

            }

            &:hover,&:focus-within{

            border-top:2px solid aqua;
                padding-inline: 30px;
                --sat: 10%;
                --light: 5%;
                --alpha:.8;
                background-color: hsla(var(--hueComp,180), var(--sat), var(--light), var(--alpha));
                transform: translateX(0%);
                filter: blur(0px);
                width: auto;
            }
            
            .hoverblock {
                display: block;
                padding: 5px;
                padding-inline: 10px;
                background-color: hsl(var(--hueAscent,30), 20%, 90%);
                color: hsl(var(--hueLink,var(--hueAscent,180)), var(--satLink,var(--satAscent,60%)), var(--lightLink,var(--lightAscent,60%)));
                max-width: min(90%, 90vw);
                text-transform: uppercase;
                // perspective:100px;
                // perspective:100px;
                transform: perspective(100px) translateZ(-10px);

                &:hover {

                transform: perspective(100px) translateZ(0);
                    // transform: perspective(100px) translateZ(10px);
                    box-shadow: 2px 2px 15px rgba(0, 0, 0, .5);
                    // z-index:calc(inherit + 2 );
                    padding-block:calc(inherit + 5px);
                    margin-block:calc(inherit + -5px);

                }
            }                                           


            .copyurl{
                padding-bottom:40px;
                font-size:12px;
                a{
                    color:aqua;
                }
            }

            
        }

        .active.hoverblock:before{
                content:"";
                position:absolute;
                height:100%;
                width:100%;
                top:0px;
                right:0px;
                border-top:5px solid aqua;
                color:hsl(var(--hueAscent,180),60%,50%);

   
            
        }

        // .active+.hoverblock{
        //     padding-block:calc(inherit + 10px);
        //     margin-block:calc(inherit + -10px);
        //     transform: perspective(100px) translateZ(-5px);
        //     color:red;
        // }

    }
    `



    self.loadPageNav(target = header) {
        if (document.getElementById("pageNav") == null) {
            append(target, gen(aside, "pageNav"))
        } else {
            append(pageNav, "", "over")
        }
    }





    self.updatePageNavUl() {
        if (document.getElementById("pageNavUl") == null) {
            append(themeControl, gen("ul", "pageNavUl"))
        } else {
            append(pageNavUl, "", "over")
        }
        append(pageNavUl, "", "over")

        var sectionlist = document.querySelectorAll("main #hero>h1,main div h1,main section h1,footer h1")
        sectionlist.forEach(element => {
            var pageNavUl = document.getElementById("pageNavUl")
            append(pageNavUl, gen("li", "", gen(a, "", element.innerHTML, 'pageNavUlLiA hoverblock', `#${element.parentElement.id}`.replaceAll("##", "#")), "pageNavUlLi"))
        });
        updateActiveSection()
    }


    self.loadThemeControl() {
        if (document.getElementById("themeControl") == null) {
            append(pageNav, gen("div", "themeControl"))
        } else {
            append(themeControl, "", "over")
        }


        // append(themeControl, gen("h3", "", "Theme Control"))
        append(themeControl, gen("ul", "themeControlUl", "", 'themeControlUl'))
        var ThemeButtonAndFunction = [["resetTheme()", 'restart_alt', "Reset Theme"], ["toggleDarkMode()", 'dark_mode', "Dark Mode / Light Mode"], ["toggleCustomizerFn()", 'tune', 'Customize Color Theme']]
        ThemeButtonAndFunction.forEach(t => {
            append(themeControlUl, gen("li", "", t[1], 'material-symbols-outlined', { "onclick": t[0], "title": t[2], "tabindex": "0" }))
        })
        // }


        append(pageNav, gen(aside, "customizer", "", "customizer"))

        append(pageNav, gen("ul", "pageNavUl", ""))
        let d = new Date();
        let year = d.getFullYear();
        append(pageNav, gen("span", "", `&copy ${year} <a href="http://mgeek.in">mGeek.in</a>`, 'copyurl'))


    }






    self.updateActiveSection() {
        let windowTop = document.documentElement.scrollTop
        let windowHeight = window.innerHeight
        let windowBottom = windowTop + windowHeight

        var sectionlist = document.querySelectorAll("main #hero>h1,main div h1,main section h1,footer h1")
        var pageNavUlLiA = document.querySelectorAll('.pageNavUlLiA')
        sectionlist.forEach(sec => {
            let sectionTop = sec.parentElement.offsetTop
            let sectionBottom = sec.parentElement.offsetTop + sec.parentElement.offsetHeight
            // if (windowTop > sectionTop && windowBottom < sectionTop) {
            if (windowTop > sectionTop) {
                let currentId = sec.parentElement.id
                pageNavUlLiA.forEach(link => {
                    link.classList.remove('active')
                    if (link.href.includes(`#${currentId}`)) {
                        link.classList.add('active')
                    }
                })

            }
        })
    }





    self.init()
    return self
}





















