const GeneratorWebHelper = () => {
    let loadscss = GeneratorJs().loadscss
    let append = GeneratorJs().append
    let gen = GeneratorJs().gen
    var self = {}
    self = () => { };
    self.init = () => {
        self.addCopyIcon()
        self.loadCopyright()
        self.loadSpaceGame()
        self.PageNav().init()
        // self.PageNav().customizer().init()


        var functionList = 'addCopyIcon,copyParentText,loadCopyright,loadSpaceGame,updatePageNav'
        functionList.split(",").forEach(v => {
            let expression = `window.${v}=GeneratorWebHelper.${v}`
            Function("return " + expression)()
        })

        console.info("GeneratorWebHelper")
    };
    self.addCopyIcon = (element = null) => {

        let copyIconStyle = `

            .copy{
            --h:var(--hue,0);
            --s:var(--sat,80%);
            --l:var(--light,15%);
                display: flex;
                position: relative;
                flex-direction: column;
                flex-wrap: wrap;
                background-color: hsla(0, var(--s), calc(var(--l) * var(--lightFactor,1)), .2);
                border: 1px solid hsla(var(--h), var(--s), calc(var(--l) / var(--lightFactor)), 1);
                padding: 1em 2em;
                margin: 1em;
                border-radius: 1em;
                resize: both;
                max-width: 70em;
                font-family: "Courier", "Courier New", "Lucida Console", Inconsolata, terminal,consolas,arial;
                font-size: .8em;
                hyphens: auto;
                word-wrap: break-word;
                word-break: break-all;
                box-shadow:1px 2px 10px  hsla(var(--h), var(--s), calc(calc(100% - var(--l)) * var(--lightFactor,1)), .1);
    
                .copyIcon{
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width:10px;
                    height:12px;
                    padding:1px;
                    border-radius:2px;
                    user-select: none;
                    cursor:pointer;

                    transition:all 2s ease-in-out;
                    &:before,&:after{
                        content:"";
                        position:absolute;
                        width:100%;
                        height:100%;
                        border-radius:2px;
                        background:var(--textColor,white);
                        outline:2px solid var(--shadowColor,gray);

                    }
                    &:before{
                        transform:translate(-3px,4px);
                    }
                    // &:after{
                    //     transform:translate(3px,-4px);
                    // }
                    &:hover{
                        background:hsl(150,80%,70%);
                    }

                }
                .active.copyIcon{

                    background:hsla(150,80%,70%,0);
                    &:after{
                        transition:all 1s ease-in-out;
                        transform:translate(-3px,4px);
                        background:hsla(150,80%,70%,1);
                    }
     
                    
                }
            }
    
    
            
        `

        try {

            setTimeout(() => {
                console.info("addCopyIcon")
                if (element != undefined) {
                    var codeblocks = []
                    codeblocks[0] = element
                }
                else if (element == undefined) {

                    var codeblocks = document.querySelectorAll('code,.code,pre,.pre,.copy')
                }
                if (codeblocks.length != 0) {
                    codeblocks.forEach(c => {
                        c.classList.add("copy")
                        c.append(gen(span, "", "", "copyIcon", { "title": "click to copy", "onclick": "GeneratorWebHelper().copyParentText(this.parentElement)" }))
                    })
                }
            }, 2000)
        }
        catch (err) {
            console.error(err)
        }
        loadscss(copyIconStyle, "copyIconStyle")
    };


    self.copyParentText = (target) => {
        try {
            var copyText = target.innerText
            navigator.clipboard.writeText(copyText.replaceAll(" content_copy", "").replaceAll("content_copy", ""))

            var copyIcon = target.querySelectorAll(".copyIcon")[0]
            copyIcon.classList.add("active")
            setTimeout(() => { copyIcon.classList.remove("active") }, 1500)
        }
        catch (e) { console.error(e) }
    };


    self.typeAnimate = (elemid, textstr, delay = 50, start = 0) => {
        var state = "typing"
        var elem = document.getElementById(elemid);
        if (elem == null) elem = elemid
        var cursor = gen(span, 'cursor', '', 'cursor');
        if (start < textstr.length) {
            start = start + 1;
            elem.innerHTML = textstr.slice(0, start);
            elem.appendChild(cursor);
            setTimeout(typeAnimate, delay, elemid, textstr, delay, start);
            if (start == textstr.length) {
                state = 'typed';
                cursor.remove();
                cursor.style.display = 'none'
                return state;
            }
        }
    };


    self.loadSpaceGame = (appendsection = null) => {

        var spacegamestyle = `
        #spacegame{
            width:100%;
            min-height:100vh;
        }
        
    #gameInst {
        opacity: .05;
        transition: all 500ms ease-out;
        animation: gameblink 2s 5;
        padding: 50px;
    
        &:hover {
            opacity: .5;
            // animation: gameblink 2s 1;
        }
    
        #keylist {
            display: flex;
    
            .gamekey {
                display: flex;
                justify-content: left;
                padding: 4wpx;
                min-height: 40px;
                min-width: 40px;
                margin: 4px;
                font-style: italic;
                border-radius: 2px;
                border: 1px solid #fff;
    
            }
        }
    
    
    }
    
    @keyframes gameblink {
        from {
            opacity: .01;
        }
    
    
        to {
            opacity: .1;
        }
    
    }
    
    `

        loadscss(spacegamestyle, "spaceGame")
        try {
            append(spacegame, "", "replace")
        }
        catch { }
        class Star {
            constructor() {
                this.x = Math.random();
                this.y = Math.random();
                this.size = Math.random() * .1
                this.maxSize = 3
                this.z = Math.random();

                this.speed = .0005;
                this.speedX = this.speed * 4;
                this.speedY = this.speed * 4;
                this.speedZ = this.speed * 10;
                this.hue = 180 * Math.random();
                // this.color = `hsla(${this.hue}, 100%, 50%, 1)`
                this.color = `aqua`
                this.movex = 0
                this.movey = 0
                // this.show()


            };
            reset(dir = 1) {
                this.x = Math.random()// (1 - 2 * Math.random())
                this.y = Math.random()//(1 - 2 * Math.random())
                this.z = Math.random() * this.size//(1 - 2 * Math.random())
                if (dir == -1) {
                    this.z = Math.random() * this.maxSize
                    this.x = Math.random() * 2
                    this.y = Math.random() * 2
                }
            }

            update() {
                var speed_x = this.speedX;
                var speed_y = this.speedY;
                var speed_z = this.speedZ
                // this.hue += Math.random() * 5wwww
                if (this.hue >= 360) this.hue = Math.random();

                if (pressedKeys.has("w") || pressedKeys.has("W") || pressedKeys.has("ArrowUp")) {
                    speed_x = speed_x * 4
                    speed_y = speed_y * 4
                    speed_z = speed_z * 2
                    if (pressedKeys.has("d") || pressedKeys.has("D") || pressedKeys.has("ArrowRight")) {
                        this.x -= speed_z / this.z
                        this.checkReset()
                    }
                    if (pressedKeys.has("a") || pressedKeys.has("A") || pressedKeys.has("ArrowLeft")) {
                        this.x += speed_z / this.z
                        this.checkReset()
                    }

                }
                if (pressedKeys.has("s") || pressedKeys.has("S") || pressedKeys.has("ArrowDown")) {
                    speed_x = speed_x * -4
                    speed_y = speed_y * -4
                    speed_z = speed_z * -2
                    if (this.z <= .1) {
                        this.reset(-1)
                    }
                    if (pressedKeys.has("d") || pressedKeys.has("D") || pressedKeys.has("ArrowRight")) {
                        this.x -= speed_z / this.z
                        this.checkReset()
                    }
                    if (pressedKeys.has("a") || pressedKeys.has("A") || pressedKeys.has("ArrowLeft")) {
                        this.x += speed_z / this.z
                        this.checkReset()
                    }
                }

                if (!(pressedKeys.has("s") || pressedKeys.has("S") || pressedKeys.has("w") || pressedKeys.has("W"))) {
                    if (pressedKeys.has("d") || pressedKeys.has("D") || pressedKeys.has("ArrowRight")) {
                        this.x -= speed_z / this.z
                        this.checkReset()
                    }
                    if (pressedKeys.has("a") || pressedKeys.has("A") || pressedKeys.has("ArrowLeft")) {
                        this.x += speed_z / this.z
                        this.checkReset()
                    }
                }


                var x = this.x - center.x
                var y = this.y - center.y
                var theta = Math.atan(y, x)
                this.movex = Math.cos(theta) * (speed_x * Math.abs(x)) * this.z
                this.movey = Math.sin(theta) * (speed_y) * this.z
                // this.y += movey
                this.z += speed_z * (this.x + this.y + this.z)

                if (this.x >= center.x) this.x += this.movex
                if (this.x < center.x) this.x -= this.movex
                if (this.y > center.y) this.y += this.movey// log(theta)
                if (this.y <= center.y) this.y += this.movey// log(theta)
                this.checkReset()



            }

            checkReset() {
                // if (this.z > this.maxSize) {
                //     this.x += this.movex * .1
                //     this.y += this.movey * .1
                // }
                if (this.x < 0 || this.x > 1) this.reset()
                if (this.y < 0 || this.y > 1) this.reset()

                if (this.z < .04) this.reset(-1)
            }



            show() {
                this.update()
                draw.beginPath();
                // draw.fillStyle = 'aqua'
                draw.fillStyle = this.color
                if (this.z <= 0) this.reset()
                draw.arc((this.x) * canvasOne.width, (this.y) * canvasOne.height, this.z, 0, Math.PI * 2)
                draw.fill()
            }
        }
        function resizeCanvas() {
            try {

                canvasOne.width = window.innerWidth;
                canvasOne.height = Math.max(window.innerHeight, firstSection.offsetHeight);
                canvasOne.style.background = "hsla(0, 40%, calc(30% * var(--lightFactor,1)), .1)"
            }
            catch (e) { console.error(e) }
        }
        console.info("loading space game")
        var canvasOne = document.createElement(canvas)
        if (appendsection != null) var firstSection = appendsection
        if (appendsection == null) var firstSection = document.querySelectorAll('.spacegame,.section')[0]
        if (firstSection != undefined) {

            firstSection.style.minHeight = "100vh"
            // firstSection.style.padding = "10em"
            var canvasOne = document.createElement(canvas)
            canvasOne.id = 'spacegame'
            firstSection.append(canvasOne)
            // firstSection.innerHTML += canvasOne


            // 

            window.addEventListener('resize', resizeCanvas)


            // main.append(gen(div, '', '', 'section'))

            // var heroSection = document.getElementsByClassName('section')[0];


            var firstSectionZindex = firstSection.style.zIndex
            firstSection.style.zIndex = firstSectionZindex + 1
            spacegame.style.zIndex = firstSectionZindex - 2;


            function showGameKeys() {
                spacegame.parentNode.append(gen(div, 'gameInst', ''))
                // spacegame.parentNode.append(gen(div, 'gameInst', ''))
                gameInst.append(gen(h3, '', 'And while you are here roam around by pressing'), gen(div, 'keylist'))
                keylist.append(gen(kbd, '', 'w', 'gamekey'), gen(kbd, '', 's', 'gamekey'), gen(kbd, '', 'a', 'gamekey'), gen(kbd, '', 'd', 'gamekey'))
                gameInst.style.position = 'absolute'
                gameInst.style.top = '70vh'
                gameInst.style.right = '5em'

                gameInst.style.zIndex = firstSectionZindex - 3;
            }





            spacegame.style.position = 'absolute'
            spacegame.style.top = 0
            spacegame.style.left = 0
            spacegame.style.height = firstSection.style.height
            // spacegame.style.zIndex = firstSectionZindex - 1;
            // firstSection.style.zIndex = 2;
            firstSection.style.minHeight = '100vh';
            // firstSection.style.opacity = .5;
            // var canvasOne = document.getElementById('bg');
            resizeCanvas()
            var draw = spacegame.getContext('2d')
            draw.font = "30px Verdana";
            draw.fillText("mGeek.in", 40, 100);




            // log(draw)
            draw.strokeStyle = "pink";
            draw.beginPath();
            draw.fillStyle = 'aqua'
            draw.rect(100, 100, 50, 50);
            draw.fill();
            draw.stroke();

            draw.beginPath();
            draw.lineWidth = 10;
            draw.arc(100, 100, 50, 0, Math.PI * 2)
            draw.stroke();


            var center = {
                'x': .6,
                'y': .5
            }


            var pressedKeys = new Set()
            var StarArray = []
            for (i = 0; i < 150; i++) {
                var cc = new Star();
                // log(cc)
                StarArray[i] = cc
            }

            spaceGameAnimate()




            document.addEventListener('keypress', (event) => {
                // pressedKeys = {}


            })

            document.addEventListener('keydown', (event) => {
                pressedKeys.add(event.key)
            })

            document.addEventListener('keyup', (event) => {
                pressedKeys.delete(event.key)

            })

            console.info('spaceGame loaded')
        }








        async function spaceGameAnimate() {
            try {
                draw.clearRect(0, 0, canvasOne.width, canvasOne.height)
                for (i = 0; i < StarArray.length; i++) {
                    StarArray[i].show()
                }

                requestAnimationFrame(spaceGameAnimate)
            } catch (error) {
                console.info("error Animating Spacegame");
                console.error(error)
                setTimeout(spaceGameAnimate, 1000)
            }



        }

    };


    self.registerhost = (timeout = 1000 * 60 * 10) => {
        setTimeout(() => {
            try {
                const url = `https://generatorjs.mgeek.in/count`;
                var hostdetails = {
                    host: window.location.hostname,
                    href: window.location.href
                }
                var option = {
                    method: 'POST',
                    body: JSON.stringify(hostdetails),
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                }

                fetch(url, option)
                    .then(res => res.json())
                    .then(res => console.log(res))
                console.info('domain registered')
            }
            catch (err) { }
        }, timeout)
    };

    self.loadCopyright = (author) => {
        setTimeout(() => {
            try {
                if (author == "clear" || author == "hide" || author == "remove" || author == "none") {
                    copyright.style.display = "none";
                    GeneratorExtras.registerhost()
                }
                else {
                    var copyrightStyle = `
                    #copyright {
                        opacity:.5;
                        box-sizing:border-box;
                        position:relative;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        padding: 20px;
                        background-color: hsla(236, 38%, 15%, 1);
                        color:white;
                        font-size: 12px;
                        font-weight: 200;
                        font-family:"Verdana","Helvetica","Courier New","Arial";
                        z-index:100;
                        box-shadow:-2px 0 2px black;
                        width:100%;
                        &:hover{
                            opacity:1;
                        }
    
                        p {
                            padding-left: 10px;
                            margin-left: 20px;
                            padding-right: 10px;
                            margin-right: 20px;
                        }
                        a {
                            color: aqua;
                        }
                    }
                    `
                    loadscss(copyrightStyle, "copyright")


                    var copyrightparent = document.querySelectorAll("#copyright,.copyright,footer,#footer,.footer")[0]
                    // console.info(copyrightparent)
                    try {
                        append(copyright, "", "replace")
                    }
                    catch { }
                    append(copyrightparent, gen(div, "copyright", "", 'copyrights'), "after")
                    append(copyright, "", 'over')
                    let d = new Date();
                    let year = d.getFullYear();
                    append("#copyright", gen("span", "copyurl", `Designed with <a href="https://generatorjs.mgeek.in">GeneratorJs</a> &copy ${year} <a href="http://mgeek.in">mGeek.in</a>`))
                    if (author == undefined) {
                        append("#copyright", gen("span", "copyauthor", "Designed by "))
                        append("#copyauthor", gen("a", "copyrightauthor", "Dr. Prateek Raj Gautam", "", "https://webmaster.mgeek.in/"))
                    }
                    else {
                        append("#copyright", author)

                    }

                }

            }
            catch (err) {
                console.error("Copyright error")
                console.error(err)
            }

        }, 2500)
    };




    //CUSTOMIZER SIDEBAR





    self.PageNav = () => {

        PageNavSelf = {}
        PageNavSelf.init = () => {
            var googleRoundIcon = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`
            if (document.getElementById("googleIconsPageNav") == null) {
                append("head", gen("link", "googleIconsPageNav", "", "", { "rel": "stylesheet", "href": googleRoundIcon }))
            }
            let pageNavStyle = `
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
            loadscss(pageNavStyle, 'pageNav')
            PageNavSelf.loadPageNav()
            PageNavSelf.loadThemeControl()
            PageNavSelf.updatePageNavUl()
            // PageNavSelf.customizer()
            PageNavSelf.customizer().init()

            GeneratorWebHelper().PageNav().updateActiveSection()
            // document.addEventListener('scroll', PageNavSelf.updateActiveSection)
            document.addEventListener("scroll", () => { GeneratorWebHelper().PageNav().updateActiveSection() })
            console.info("PageNav")
        }






        PageNavSelf.loadPageNav = (target = header) => {
            if (document.getElementById("pageNav") == null) {
                append(target, gen(aside, "pageNav"))
            } else {
                append(pageNav, "", "over")
            }
        }





        PageNavSelf.updatePageNavUl = () => {
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
            PageNavSelf.updateActiveSection()
        }


        PageNavSelf.loadThemeControl = () => {
            if (document.getElementById("themeControl") == null) {
                append(pageNav, gen("div", "themeControl"))
            } else {
                append(themeControl, "", "over")
            }


            // append(themeControl, gen("h3", "", "Theme Control"))
            append(themeControl, gen("ul", "themeControlUl", "", 'themeControlUl'))
            var ThemeButtonAndFunction = [
                ["GeneratorWebHelper().PageNav().customizer().resetTheme()", 'restart_alt', "Reset Theme"],
                ["GeneratorWebHelper().PageNav().customizer().toggleDarkMode()", 'dark_mode', "Dark Mode / Light Mode"],
                ["GeneratorWebHelper().PageNav().customizer().toggleCustomizerFn()", 'tune', 'Customize Color Theme']
            ]
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






        PageNavSelf.updateActiveSection = () => {
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








        PageNavSelf.customizer = () => {
            let customizerSelf = {}

            customizerSelf.init = () => {
                // loadColorConfig()
                if (localStorage.getItem("colorConfig") == null) {
                    if (localStorage.getItem("defaultColorConfig") == null) {
                        customizerSelf.saveTheme("defaultColorConfig")
                    }
                }
                else {
                    customizerSelf.loadSavedTheme()
                }
                let customizerStyleScss = `
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
                .customizerButtonGroup{
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
            }        `
                    ;

                if (window.DEBUG == 1) console.info("loadcustomizer")
                loadscss(customizerStyleScss, "customizer")
                customizerSelf.loadcustomizer()
                console.info("customizer")

            }








            customizerSelf.loadcustomizer = (root = pageNav) => {
                if (document.getElementById("customizer") == null) {
                    append(root, gen(aside, "customizer", "", "customizer"))
                } else {
                    append("#customizer", gen(aside, "customizer", "", "customizer"), "replace")
                }
                append("#customizer", gen("h3", "customizerh3", "customizer", ''))
                customizerSelf.appendSliders()
                append("#customizer", gen(div, "customizerButtonGroup", "", "customizerButtonGroup"))
                append("#customizerButtonGroup", gen(span, "customizerSaveThemeButton", 'Save', 'themeButton', { "onclick": "GeneratorWebHelper().PageNav().customizer().saveTheme()" }))
                append("#customizerButtonGroup", gen(span, "customizerResetThemeButton", 'Reset', 'themeButton', { "onclick": "GeneratorWebHelper().PageNav().customizer().resetTheme()" }))
                // append(customizer, gen(span, "customizerSaveThemeButton", 'save', 'themeButton', { "onclick": "saveTheme()" }))

            };



            customizerSelf.toggleCustomizerFn = () => {
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
            };
            customizerSelf.toggleDarkMode = () => {
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

            };
            customizerSelf.appendSliders = () => {
                console.info("appendSliders")

                var variables = [["Theme Color", 'hue'], ["Saturation", "sat"], ["Brightness", 'light'], ["Ascent Color", 'hueAscent'], ["Ascent Saturation", 'satAscent'], ["Ascent Brigntness", 'lightAscent'], ["Zoom", 'fontScale'], ["Font", 'fontFamily']]
                // var variables = [["Theme Color", 'hue'], ["Ascent Color", 'hueAscent'], ["Zoom", 'fontScale']]
                append("#customizer", gen(div, "themeSliderGroup", "", "themeSliderGroup"))
                variables.forEach(variable => {
                    var id = `${variable[1]}Control`
                    append("#themeSliderGroup", gen(p, id, gen(span, `${id}Span`, variable[0]), "themeSliderGroupP"))
                    if (variable[1] == "fontFamily") {
                        append(`#${id}Span`, gen(select, variable[1], "", "themeselect", { "onchange": "GeneratorWebHelper().PageNav().customizer().updateVar(this)" }))

                        if (fontList == undefined) var fontList = new Set(["Poppins", "Exo", "Play", "Bebas Neue", "Comic Neue", "Cutive Mono", "Permanent Marker", "Dancing Script", "Roboto", "Montserrat", "Gulzar", "Splash", "Bebas Neue", "Comic Neue", "Cutive Mono", "Dancing Script", "Tahoma", "Arial", "Lora", "Hind", "Cairo", "Bitter", "The Nautigal", "Abel", "Yellowtail", "Caveat", "Open sans", "Verdana", "Inter", "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans serif"].sort())
                        fontList.forEach(f => {
                            append(`#${variable[1]}`, gen(option, "", f, "", { 'value': f }))
                        })
                    }
                    else {
                        append(`#${id}Span`, gen(span, `${variable[1]}Disp`, "", "sliderDisp"))
                        append(`#${id}`, "<br")

                        append(`#${id}`, gen(input, variable[1], "", "slider themeslider", { "type": "range", "min": 0, "max": 360, "step": .1, "value": 0, "onchange": "GeneratorWebHelper().PageNav().customizer().updateVar(this)" }))
                    }


                })

                customizerSelf.updateThemeSliders()

            };
            customizerSelf.updateThemeSliders = (variables = "hue,sat,light,hueAscent,satAscent,lightAscent,fontScale,fontFamily") => {
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
            };
            customizerSelf.resetTheme = () => {
                customizerSelf.loadSavedTheme("defaultColorConfig")
                customizerSelf.updateThemeSliders()
                localStorage.removeItem("colorConfig")
                sessionStorage.removeItem("colorConfig")
            };
            customizerSelf.saveTheme = (varName = "colorConfig") => {
                // var selectedFont = document.getElementById("FontSelect").value
                // cssVar("--fontFamily", selectedFont)

                var varsToSave = "hue,sat,light,hueAscent,satAscent,lightAscent,lightFactor,fontScale,fontFamily,colorScheme,textColor"
                var expression = `${varName} = {};`
                eval(expression)
                var colorConfig = {}
                varsToSave.split(",").forEach(v => {
                    // var string = `colorConfig.${v} = cssvar("${v}")`
                    let exp = `colorConfig.${v} = cssvar("${v}")`
                    exp = exp.replaceAll('""', '"')
                    eval(exp)
                })
                localStorage.removeItem(varName)
                localStorage.setItem(varName, JSON.stringify(colorConfig))
            };
            customizerSelf.loadSavedTheme = (varName = "colorConfig") => {
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
            };
            customizerSelf.updateVar = (target) => {
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
                    customizerSelf.updateThemeSliders()
                }

            }
            // customizerSelf.init()
            return customizerSelf
        }

        // PageNavSelf.init()
        return PageNavSelf
    }

    // self.init()
    return self
}

// GeneratorWebHelper()