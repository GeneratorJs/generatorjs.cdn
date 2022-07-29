const GeneratorExtras = {
    addCopyIcon: (element = null) => {

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
                box-shadow:1px 1px 3px  hsla(var(--h), var(--s), calc(calc(100% - var(--l)) * var(--lightFactor,1)), .2);
    
                .copyIcon{
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    width:10px;
                    height:12px;
                    padding:1px;
                    border-radius:2px;
                    user-select: none;
                    // color:white;
                    cursor:pointer;
                    background:white;
                    &:before{
                        content:"";
                        position:absolute;
                        // top:0;
                        // right:0;
                        border-radius:.1rem;
                        // outline:2px solid black;
                        background:white;

                    }
                    &:after{
                        content:"";
                        position:absolute;
                        width:100%;
                        height:100%;
                        border-radius:.1rem;
                        outline:2px solid black;
                        background:white;
                        transform:translate(3px,-4px);
                    }
                    &:hover{
                        background:hsl(150,80%,70%);
                    }
                }
                .active.copyIcon:after{
                    background:hsl(150,80%,70%);
                    
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
                        c.append(gen(span, "", "", "copyIcon", { "title": "click to copy", "onclick": "GeneratorExtras.copyParentText(this.parentElement)" }))
                    })
                }
            }, 2000)
        }
        catch (err) {
            console.error(err)
        }
        loadscss(copyIconStyle, "copyIconStyle")
    },


    copyParentText: (target) => {
        try {
            var copyText = target.innerText
            navigator.clipboard.writeText(copyText.replaceAll(" content_copy", "").replaceAll("content_copy", ""))

            var copyIcon = target.querySelectorAll(".copyIcon")[0]
            copyIcon.classList.add("active")
            setTimeout(() => { copyIcon.classList.remove("active") }, 1500)
        }
        catch (e) { console.error(e) }
    },


    typeAnimate: (elemid, textstr, delay = 50, start = 0) => {
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
                // console.log(state);
                return state;
            }
        }


        // console.log(state);
        // return state;
    },



    loadSpaceGame: (appendsection = null) => {

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

    },
    registerhost: (timeout = 1000 * 60 * 10) => {
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
    },
    loadCopyright: (author) => {
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
                    if (copyrightparent.innerHTML.length > 200) {
                        append(copyrightparent, gen(div, "copyright", "", 'copyrights'), "after")
                        append(copyright, "", 'over')
                        let d = new Date();
                        let year = d.getFullYear();
                        append(copyright, gen("span", "copyurl", `Designed with <a href="https://generatorjs.mgeek.in">GeneratorJs</a> &copy ${year} <a href="http://mgeek.in">mGeek.in</a>`))
                        if (author == undefined) {
                            append(copyright, gen("span", "copyauthor", "Designed by "))
                            append(copyauthor, gen("a", "copyrightauthor", "Dr. Prateek Raj Gautam", "", "https://webmaster.mgeek.in/"))
                        }
                        else {
                            append(copyright, author)

                        }
                    }
                    else (setTimeout(loadCopyright(), 1000 * 60 * 5))
                }

            }
            catch (err) {
                console.error("Copyright error")
                console.error(err)
            }

        }, 2500)
    },
    loadDefaults: () => {
        GeneratorExtras.addCopyIcon()
        // GeneratorExtras.updatePageNav()
        // GeneratorExtras.loadSpaceGame()
        GeneratorExtras.loadCopyright()
    },
    updatePageNav: () => {

    }



}



var functionList = 'addCopyIcon,copyParentText,loadCopyright,loadSpaceGame,updatePageNav'
functionList.split(",").forEach(v => {
    let expression = `${v}=Generator.$.${v}=Generator.${v}`
    // eval(expression)
    Function("return " + expression)()
})

GeneratorExtras.loadDefaults()

