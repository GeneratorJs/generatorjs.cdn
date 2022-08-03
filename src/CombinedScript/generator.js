function GeneratorJs() {
    var self = {}
    self = (...args) => {
        console.log(args.length)
        if (args.length == 1) {
            let selector = args[0];
            return document.querySelectorAll(selector)
        }
        else if (args.length == 2) {
            let selector = args[0]; let index = args[1];
            return document.querySelectorAll(selector)[index];
        }
        // self.loadBasicHtmlVariables()
    };
    self.eval = (expression) => {
        Function("return " + expression)();
        // eval(expression)
    };
    self.loadBasicHtmlVariables = () => {
        // console.info("loadBasicHtmlVariables")
        let listOfBasicHtmlTags = "div,p,span,b,i,img,video,picture,canvas,svg,audio,h1,h2,h3,h4,h5,h6,table,thead,tbody,tr,td,ul,li,ol,a,textarea,input,output,select,option,checkbox,radio,button,embed,object,iframe,kbd,code,dl,dt,dd,meta,pre,form,fieldset,legend,label,section,main,aside,header,footer,nav,meta,head,body,dialog,details,summary,figure,figcaption,sidebar,style,script,del,ins,wbr,mark,time";
        let list = listOfBasicHtmlTags.replaceAll(' ', ',').replaceAll(',,', ',')
        list.split(",").forEach(tag => {
            if (tag.length > 0) {
                var expression = `window.${tag} = '${tag}'`
                self.eval(expression)
            }

        })
    };

    self.append = (parentid, childhtml, position = 'after') => {
        try {
            if (parentid instanceof Object == true) { var parentElement = parentid }
            else {
                var parentElement = document.querySelectorAll(parentid)[0];
            }

            var T = document.createElement('div')
            T.id = 'T'
            T.innerHTML = ""
            if (Array.isArray(childhtml) == true) {
                for (let i = 0; i < childhtml.length; i++) {
                    if (typeof childhtml[i] == 'string') {
                        T.innerHTML += childhtml[i]
                    }

                    if (typeof childhtml[i] != 'string') {
                        if (childhtml[i].outerHTML != undefined) {
                            T.innerHTML += childhtml[i].outerHTML
                        }
                        if (childhtml[i].outerHTML == undefined) {
                            T.innerHTML += objtohtml(childhtml[i])
                        }
                    }

                }

            }
            if (Array.isArray(childhtml) == false) {

                if (childhtml != undefined) {
                    if (typeof childhtml == 'string') {
                        T.innerHTML += childhtml
                    }
                    if (typeof childhtml != 'string') {
                        if (childhtml.outerHTML != undefined) {
                            T.innerHTML += childhtml.outerHTML
                        }
                        if (childhtml.outerHTML == undefined) {
                            T.innerHTML += childhtml
                        }
                    }
                }
            }


            if (position == 'before') {
                parentElement.innerHTML = T.innerHTML + parentElement.innerHTML
            } else if (position == 'over') {
                if (T.innerHTML != null) parentElement.innerHTML = T.innerHTML
                if (T.innerHTML == null) parentElement.innerHTML = ''
            } else if (position == 'replace') {
                parentElement.outerHTML = T.innerHTML
            } else if (position == 'after') {
                parentElement.innerHTML = parentElement.innerHTML + T.innerHTML
            } else if (position == 'parent') {
                var oldElement = parentElement.outerHTML
                parentElement.innerHTML = ""
                T.childNodes[0].innerHTML += oldElement
                parentElement.outerHTML = T.innerHTML
            } else {
                parentElement.innerHTML = parentElement.innerHTML + T.innerHTML
            }
        }
        catch (err) {
            console.log(`append(${parentid}, ${childhtml}, ${position})`)
            console.error(err)
        }

    }

        ;


    self.gen = (elementtype, idin, htmlin, classin, src, event) => {
        try {
            if (htmlin != undefined) {
                // console.log(htmlin.isArray)
                if (Array.isArray(htmlin) != true) {
                    var element = document.createElement(elementtype);
                    if (idin != undefined && idin != "") {
                        element.id = idin;
                    }
                    if (htmlin.nodeName === undefined) {
                        // console.log(typeof (htmlin))
                        if (typeof (htmlin) != "object") {
                            if (elementtype == 'code' || elementtype == 'pre') {
                                element.innerText = htmlin;
                            } else if (elementtype == 'input') {
                                element.value = htmlin;
                            } else if (elementtype == 'img') {
                                element.alt = htmlin;
                            }
                            else {
                                element.innerHTML = htmlin;
                            }
                        }
                        if (typeof (htmlin) == "object") {
                            element.innerHTML = htmlin;
                            if (elementtype == 'input') element.value = htmlin;
                            if (elementtype == 'img') element.alt = htmlin;
                        }
                    };
                    if (htmlin.nodeName != undefined) {
                        element.append(htmlin);
                    };
                    if (classin != undefined && classin != "") {
                        // element.classList.add(classin);
                        element.classList += classin.replaceAll(',', ' ').replaceAll(', ', ' ');
                    }
                }
                //generate multiple element if array
                if (Array.isArray(htmlin) == true) {
                    // console.log(htmlin)
                    // var element = [];

                    var element = document.createElement("div")
                    let arrayholder = document.createElement("div", "arrayholder", "")
                    // console.log(htmlin.length)
                    var checkfirstinput = htmlin[0]

                    for (var jj = 0; jj < htmlin.length; jj++) {

                        //if not object 
                        if (typeof checkfirstinput != 'object') {
                            var elementarray = document.createElement(elementtype);
                            if (idin != undefined && idin != "") {
                                elementarray.id = `${idin}-${jj}`;
                            }

                            //Array of html elements
                            if (htmlin[jj].nodeName === undefined) {
                                // console.log(typeof (htmlin))
                                if (typeof (htmlin) != "object") {
                                    elementarray.innerHTML = htmlin[jj];
                                    if (elementtype == 'input') elementarray.value = htmlin[jj];
                                    if (elementtype == 'img') element.alt = htmlin[jj];
                                }
                                if (typeof (htmlin) == "object") {
                                    elementarray.innerHTML = htmlin[jj];
                                    if (elementtype == 'input') elementarray.value = htmlin[jj];
                                    if (elementtype == 'img') element.alt = htmlin[jj];
                                }
                            };
                            //Array of strings non html
                            if (htmlin[jj].nodeName != undefined) {
                                elementarray.append(htmlin[jj]);
                                // console.log(htmlin);
                                // console.log(htmlin.nodeName);
                            };
                            if (classin != undefined && classin != "") {
                                // element.classList.add(classin);
                                elementarray.classList += classin.replaceAll(',', ' ').replaceAll(', ', ' ');
                            }
                        }

                        // if object
                        if (typeof checkfirstinput == 'object') {
                            // elementarray = objtohtml(htmlin[jj])
                            elementarray = jsonToElement(htmlin[jj])
                            var elementtypeholder = document.createElement(elementtype)
                            elementtypeholder.append(elementarray)
                            elementarray = elementtypeholder
                        }
                        arrayholder.innerHTML += elementarray.outerHTML

                    }
                    element = arrayholder.innerHTML
                    // console.log(element)
                }


            }

            if (htmlin == undefined) {
                var element = document.createElement(elementtype);
                if (idin != undefined && idin != "") {
                    element.id = idin;
                }
                if (classin != undefined && classin != "") {
                    // element.classList.add(classin);
                    element.classList += classin.replaceAll(',', ' ').replaceAll(', ', ' ');
                }
            }
            // var src = { "id": "testid" }
            if (src != undefined) {
                if (src instanceof Object == true) {
                    var objArray = Object.entries(src);
                    objArray.forEach(A1 => {
                        element.setAttribute(A1[0], A1[1])
                    })

                }
                else if (src instanceof Object == false) {
                    if (elementtype == 'a') { element.href = src } else { element.src = src }
                }
            }


            return element;

        }
        catch (err) {
            console.error("Error during gen(", elementtype, idin, htmlin, classin, src, ")", err
            )
        }
    }

        ;


    self.jsonToElement = (obj) => {
        // obj={"tag":"a","id":"idname","href":"url","class","class1,class2,class3"}
        // objectToElement(obj)
        // console.log(obj)
        try {
            let elem = document.createElement(div)
            if (Array.isArray(obj) != true) {
                var keylist = Object.keys(obj)
                var tag = div
                if (obj.tag != undefined) tag = obj.tag
                elem = document.createElement(tag)
                keylist.forEach((key) => {
                    eval(`elem.${key}=obj.${key}`)
                })
            }
            if (Array.isArray(obj) == true) {
                var placeholder = document.createElement(div)
                // var elem = document.createElement(div)
                for (i = 0; i < obj.length; i++) {
                    objCurrent = obj[i]
                    var keylist = Object.keys(objCurrent)
                    var tag = div
                    if (objCurrent.tag != undefined) tag = objCurrent.tag
                    elem = document.createElement(tag)
                    keylist.forEach((key) => {
                        eval(`elem.${key}=objCurrent.${key}`)
                    })

                    // placeholder += elem.outerHTML
                    placeholder.append(elem)

                }

                elem = placeholder
                // console.log(elem.outerHTML)

            }

            return elem
        }
        catch { console.error("jsonToElement(", obj, ")") }
    }

        ;


    self.cssvar = (name, value) => {
        var r = document.querySelector(':root')
        var rs = getComputedStyle(r)
        if (name[0] != '-') name = '--' + name
        if (value) r.style.setProperty(name, value)
        return rs.getPropertyValue(name);
    }

        ;
    self.getfile = (URL, callback) => {
        // if (typeof storage === 'undefined') 

        var name = URL
        var response
        try {
            if (sessionStorage.getItem(name) != null && sessionStorage.getItem(name) != "") {
                response = sessionStorage.getItem(name)
                if (response != null && response != "") {
                    if (typeof callback === "function") callback(response)
                }
            } else if (sessionStorage.getItem(name) == null || sessionStorage.getItem(name) == "") {
                let xhr = new XMLHttpRequest();
                var method = "GET"
                xhr.open(method, URL)
                xhr.send()
                xhr.onload = async function () {
                    // console.log(name + xhr.status)
                    // alert(`${xhr.onerror}Loaded: ${xhr.status} ${xhr.response} `);
                    if (xhr.status >= 200 && xhr.status < 400) {
                        response = await xhr.response
                        xhr.DONE
                        if (response != null && response != "") {
                            sessionStorage.setItem(name, response)
                            if (typeof callback === "function") callback(response)
                        }
                    }
                }
            }


        }
        catch (err) {
            console.log(`getfile(${URL}, ${callback})`)
            console.error(err)
        }


        return response
    }

        ;
    self.load = (srcList, pos = "head") => {

        try {
            if (pos == undefined) { var pos = 'head' }
            if (Array.isArray(srcList) == true) {
                if (srcList.length > 0) {

                    for (var i = 0; i < srcList.length; i++) {
                        var extension = ""
                        var currentLink = srcList[i]
                        var extensionStart = 0
                        var extensionEnd = currentLink.length
                        for (let i = extensionEnd; i > 0; i--) {
                            if (currentLink[i] == ".") {
                                extensionStart = i;
                                extension = currentLink.slice(extensionStart, extensionEnd)
                                break
                            }
                        }
                        if (extension == ".js") {
                            self.loadjs(srcList[i], pos)
                        } else if (extension == ".css") {
                            self.loadcss(srcList[i], pos)
                        } else if (extension == ".scss") {
                            // loadscss(getfile(currentLink))
                            self.getfile(currentLink, (res) => { loadscss(res, currentLink) })
                        } else if (extension == ".html") {
                            self.loadhtml(currentLink, pos)
                        } else {
                            // console.log('loading object')
                            self.loadMetaFromObject(srcList[i], pos)
                        }
                    }
                }
            } else if (Array.isArray(srcList) == false) {
                currentLink = srcList
                var extensionStart = 0
                var extensionEnd = currentLink.length
                var extension = ""
                if (currentLink.length > 0) {

                    for (let i = extensionEnd; i > 0; i--) {
                        if (currentLink[i] == ".") {
                            extensionStart = i;
                            extension = currentLink.slice(extensionStart, extensionEnd)
                            break
                        }
                    }

                    if (extension == ".js") {
                        self.loadjs(currentLink, pos)
                    } else if (extension == ".css") {
                        self.loadcss(currentLink, pos)
                    } else if (extension == ".scss") {
                        // loadscss(getfile(currentLink))
                        self.getfile(currentLink, (res) => { loadscss(res, currentLink) })
                    } else if (extension == ".html") {
                        self.loadhtml(currentLink, pos)
                    } else {
                        // console.log('loading object')
                        self.loadMetaFromObject(currentLink, pos)
                    }
                }

            }


        }
        catch (err) {
            console.log(srcList)
            console.error(err)
        }

    }

        ;
    self.loadjs = (src, pos = 'head') => {
        var s = document.createElement("script");  // create a script DOM node
        s.type = 'text/javascript'
        s.src = src;  // set its src to the provided URL
        // s.async = true
        // s.defer = true
        s.setAttribute('async', '');
        s.setAttribute('defer', '');
        // document.head.appendChild(s);
        if (pos == 'head') {
            document.head.appendChild(s);
        } else if (pos == 'body') {
            document.body.appendChild(s);
        }
    };


    self.loadcss = (link, pos = 'head') => {
        var s = document.createElement("link");  // create a script DOM node
        s.href = link;  // set its src to the provided URL
        s.rel = 'stylesheet'
        s.type = 'text/css';


        if (pos == 'head') document.head.appendChild(s);
        if (pos == 'body') document.body.appendChild(s);
    }

        ;
    self.loadMetaFromObject = (obj, pos) => {
        var keylist = Object.keys(obj)
        for (i = 0; i < keylist.length; i++) {
            var s = document.createElement(meta);
            s.setAttribute('name', keylist[i]);
            if (keylist[i] == 'title' || keylist[i] == 'description' || keylist[i] == 'type' || keylist[i] == 'url' || keylist[i] == 'image' || keylist[i] == 'logo' || keylist[i] == 'site_name') {
                s.setAttribute('property', `og:${keylist[i]}`);
            }
            s.setAttribute('content', obj[keylist[i]]);
            if (pos == 'body') { document.body.appendChild(s); }
            if (pos == 'head') {
                document.head.appendChild(s);
                //opengraph
            }
        }


    }

        ;


    self.loadscss = (scss, styleid) => {

        try {

            if (styleid != undefined) {
                styleid = "style-added-from-loadscss-" + styleid
                if (document.getElementById(styleid) != null) {
                    append(document.getElementById(styleid), "hi", "replace")
                }
            } else { styleid = "" }
            scss = scss
            var css = ""
            var len = scss.length;
            // var bracketidStart = []
            // var bracketEnd = []
            var NestingLevel = 0
            var idStart = 0;
            var id = []
            var idStart = 0
            var idEnd = 0
            var cssSelectorChain = ""
            var cssBegin = 0;
            var cssEnd = 0;
            var comment = 0
            var mediaQuery = 0
            var importStatement = 0
            var importStart;
            var importEnd;
            var mediaId = ""
            for (var i = 0; i <= len; i++) {


                var testSymbol = scss[i]
                if (testSymbol == "/") {
                    if (scss.substr(i, 2) == "//") {
                        comment = 1;
                    }
                    else if (scss.substr(i, 2) == "/*") {
                        comment = 2;
                    }
                }
                if (comment > 0) {
                    if (comment == 1) {
                        if (scss.substr(i, 1) == "\n" || scss.substr(i, 1) == "\r") {
                            comment = 0
                            idStart = i
                        }
                    }
                    if (comment == 2) {
                        if (scss.substr(i, 1) == "*/") { comment = 0 }
                        idStart = i
                    }
                }
                if (comment == 0) {
                    // media querry start

                    if (testSymbol == '@') {
                        if (scss.substr(i, 10).includes("media")) mediaQuery = 1;               //mediaQuerryStarted
                        else if (scss.substr(i, 10).includes("import")) {
                            importStatement = 1;               //import statement
                            importStart = i;
                        }

                    }
                    //cssBracketStart
                    if (importStatement == 1) {
                        if (scss.substr(i, 1) == ';' || scss.substr(i, 1) == '\n') {
                            importEnd = i;
                            importStatement = 0;
                            css += scss.substr(importStart, importEnd - importStart) + "\n"
                        }
                    }
                    else if (importStatement == 0) {
                        if (testSymbol == '{') {

                            idEnd = i
                            var currentId = scss.substr(idStart, idEnd - idStart)

                            if (id.length > 0) {
                                // cssSelectorChain = ""
                                // for (let i_id = mediaQuery; i_id < id.length; i_id++) {
                                //     cssSelectorChain = cssSelectorChain + " " + id[i_id]
                                // }
                                // cssSelectorChain = cssSelectorChain.replaceAll(" :", ":").replaceAll(" &:", ":")
                                cssSelectorChain = idToCssSelectorChain(id, mediaQuery)
                                var currentCss = ""
                                currentCss = scss.substr(cssBegin, cssEnd - cssBegin)
                                if (currentCss.replaceAll("}", " ").replaceAll("\n", " ").trim().length != 0) {
                                    var idCss = cssSelectorChain + currentCss + "}\n"
                                    idCss = idCss
                                    css = css + "\n" + idCss

                                    if (scss[cssBegin] == "{" && scss[cssEnd + 1] == ";") {

                                        // console.log(NestingLevel, id.length)

                                    }

                                }
                            }
                            if (currentId != undefined) {

                                id.push(currentId.trim().replaceAll("\n", " "))
                                if (mediaQuery == 1) {
                                    if (id.length == 0) {
                                        mediaId = id[0]
                                        console.log(mediaId)
                                        css = css + "\n" + mediaId + "{\n"
                                    }
                                }
                            }

                            cssEnd = i
                            cssBegin = i
                            NestingLevel++
                        }
                        if (testSymbol == ';' || testSymbol == '}') {
                            idStart = i + 1;
                            cssEnd = i + 1
                            if (testSymbol == '}') {
                                if (scss[cssBegin - 1] != scss[cssEnd - 1]) {
                                    // cssSelectorChain = ""
                                    // for (let i_id = mediaQuery; i_id < id.length; i_id++) {
                                    //     cssSelectorChain = cssSelectorChain + " " + id[i_id]
                                    // }

                                    // cssSelectorChain = cssSelectorChain.replaceAll("  ", " ").replaceAll(" :", ":").replaceAll(" &:", ":")

                                    cssSelectorChain = idToCssSelectorChain(id, mediaQuery)
                                    var currentCss = ""
                                    currentCss = scss.substr(cssBegin, cssEnd - cssBegin)

                                    if (currentCss.replaceAll("}", " ").replaceAll("\n", " ").trim().length != 0) {
                                        var idCss = cssSelectorChain + currentCss
                                        css = css + "\n" + idCss
                                    }
                                    NestingLevel--
                                    cssBegin = i + 1
                                }

                                id.pop()
                                if (mediaQuery == 1) {
                                    if (id.length == 0) {

                                        mediaId = id[0]
                                        css = css + "\n}\n"

                                    }
                                }
                            }
                        }
                    }
                }
            }





            function idToCssSelectorChain(id, mediaQuery) {
                cssSelectorChain = ""
                for (let i_id = mediaQuery; i_id < id.length; i_id++) {
                    var currentId = id[i_id];
                    if (currentId.includes(",")) {

                        currentId = currentId.replaceAll(" ,", ',').replaceAll(", ", ',')
                        var idParts = currentId.split(",")
                        var expandedChain = ""
                        idParts.forEach(idPart => {
                            expandedChain += cssSelectorChain + " " + idPart + ", "
                        });
                        // log(expandedChain.substring(0, expandedChain.length - 2))
                        cssSelectorChain = expandedChain.substring(0, expandedChain.length - 2)
                    }
                    else { cssSelectorChain = cssSelectorChain + " " + id[i_id] }
                }
                cssSelectorChain = cssSelectorChain.replaceAll(" :", ":").replaceAll(" &:", ":")

                return cssSelectorChain
            }


            // console.log(css)
            css = css.replaceAll("  ", " ").replaceAll(" :", ":").replaceAll(" &", "").replaceAll("\n&", "").replaceAll("  ", " ").replaceAll("  ", " ")
            css = css.replaceAll("{", "{\n").replaceAll("{\n\n", "{\n").replaceAll("}", "\n}").replaceAll("\n\n}", "\n}")
            // css = css.replaceAll(">", "&gt;")
            css = css.replaceAll(">", " > ").replaceAll("  >", " >").replaceAll(">  ", "> ")
            css = css.replaceAll("{", " {\n").replaceAll("  {", " {").replaceAll("{\n\n", "{\n")
            self.append('head', self.gen("style", styleid, css))
            return css
        }
        catch (err) {
            console.log(`loadscss(${scss}, ${styleid})`)
            console.error(err)
        }
    };


    self.log = (data = '', pos = "before") => {
        try {
            var applog = document.getElementById("applog")
            if (applog == null || applog == undefined) {
                // document.getElementById("app").append(gen(div, "applog", "", "applog,applog"))
                self.append(app, self.gen("div", "applog", self.gen(span, "", "close", "cross material-symbols-outlined", { "onclick": "GeneratorJs().hide(this.parentElement)" }), "applog"))

                // append(app, gen("div", "applog", "", "applog", { "onclick": "hide(this)" }))
                self.loadscss(self.logStyleScss, "log")

            }
            if (data === 'clear' || data === 'hide' || data === null || data === undefined || data === "") {
                var applog = document.getElementById("applog")
                console.clear()
                applog.innerHTML = "";
                applog.style.display = 'none';
            } else {

                var applog = document.getElementById("applog")
                console.log(data)

                try {
                    var datastring = self.verb(data)
                }
                catch (e) {
                    datastring = data
                }
                data = datastring
                try {
                    applog.style.display = 'flex';
                    try {
                        temp.id = ""
                        self.append(applog, [self.gen("div", '', data), self.gen("span", '', data.outerHTML, 'log', { "onclick": "GeneratorJs().remove(this)" })], pos)
                    }
                    catch {
                        var logno = `log-${document.querySelectorAll(".log").length + 1}`
                        self.append(applog, self.gen("span", logno, data, 'log'), pos)
                        self.append(`#${logno}`, self.gen(span, "", "close", "cross material-symbols-outlined", { "onclick": "GeneratorJs().hide(this.parentElement)" }))
                    }
                }
                catch (err) {
                    self.append(applog, data, pos)
                }
            }


        }
        catch (err) {
            console.log(`log(${data}, ${pos})`)
            console.error(err)
        }
    };



    self.remove = (c) => {
        if (c != null) self.append(c, "", 'replace')
    };


    self.hide = (c) => {
        if (c != null) c.style.display = "none"
    };


    self.verb = (input) => {
        var op = input.outerHTML.toString().replaceAll("&", '&amp;').replaceAll('</', '&lt;&#47;').replaceAll("<", "&lt;").replaceAll(">", '&gt;')
        return op
    };

    self.htmltostring = (input) => {
        var op = input.outerHTML.toString()
        return op
    };



    self.logStyleScss = `
#applog {

    position:relative;
    font-size:.8rem;
    display: none;
    width:clamp(400px,50vh,80vh);
    flex-direction: column;
    position: fixed;
    right:20px;
    top:20px;
    z-index: 1000;
    padding: .5em 1em;
    border-radius: 5px;
    color: #fff;
    background-color: hsla(328, 88%, 64%, 1);
    box-shadow:2px 2px 5px black;
    resize: both;
    overflow:auto;
    max-height:90vh;
    max-width:90vw;
    min-height:3em;
    font-family: "Courier", "Courier New", "Lucida Console", Inconsolata, terminal,consolas,arial;
    word-spacing: 1em;
    user-select:none;

    

    >.log{
        user-select:text;
        position:relative;
        font-size:14px;
        font-family:"arial";
        padding: .5em 1em;
        background-color: hsla(239, 40%, 42%, 1);
        margin:.5em;
        box-shadow:1px 1px 2px black;
        border-radius: 5px;
        color: #fff;
        
    }
    .cross {
        user-select:none;
        cursor:pointer;
        position:absolute;
        top: 0px;
        right: 0px;
        &:hover{
            color:red;
        }
        
    }
}

`;


    self.loadFunctions = (RequiredFunctions) => {
        if (RequiredFunctions == undefined) RequiredFunctions = 'append,cssvar,gen,getfile,hide,jsonToElement,loadcss,loadjs,loadscss,load,log,remove'
        RequiredFunctions.split(",").forEach(v => {
            // let expression = `window.${v}=self.${v}`

            var expression = `window.${v} = GeneratorJs().${v}`
            self.eval(expression)
            // Function("return " + expression)()
        })
    };

    self.init = (RequiredFunctions) => {
        self.loadBasicHtmlVariables();
        self.loadFunctions(RequiredFunctions);
        console.info('GeneratorJs Ready')
    };
    // self.init();
    self.loadBasicHtmlVariables()
    return self
}




