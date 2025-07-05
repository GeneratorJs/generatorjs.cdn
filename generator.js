function GeneratorJs() {
    //grab start
    const grab = (parentidstr) => {
        var match = parentidstr.match(/^([^\[]*)\[*(\d*)\]*$/mi)
        var parentid = match[1]
        if (match[2].length > 0) var no = match[2]

        var parentElement = null;
        try {
            if (parentid instanceof Object == true) { parentElement = parentid }
            else {
                parentElement = document.querySelectorAll(parentid);
            }
        }
        catch (err) {
            console.log(`grab(${parentidstr})`)
            console.error(err)
        }
        if (no) return parentElement[no]
        else return parentElement


    };
    //grab end




    //parsemdbeta start
    const parsemdbeta = (mdinput, callback) => {

        //subfunctions start
        var blockPattern = {
            code: /^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi,
            // html1:/^\s*<(?!\/)([^>\s]*)[^>]*>[\s\S]*?<\/\1>[\s\n]*/mi,
            html1: /^<(?!\/)([^>\s]*)[^>]*>[\s\S]*?<\/\1>[\s\n]*/mi,
            html2: /<(br|hr|img|area|base|col|embed|input|link|meta|param|source|track|wbr)[^\>]*?>\s*\n*/i,
            // heading1: /^\s*\#{1,6}\s+([^\n]*)[\s\n]*/i,
            // heading2: /^\s*(\w[^\n]*)\n(-|\=){4,}[\s\n]*/im,
            heading1: /^\#{1,6}\s+([^\n]*)[\s\n]*/i,
            heading2: /^(\w[^\n]*)\n(-|\=){4,}[\s\n]*/im,
            block: /^^\s*>\s+([^\n]*)[\s\n]*/i,
            checklist: /^\s*(?:^\s*-\s+\[(?:\s*|[xX*])\]\s+[^\n]*\n?)+/m,
            table: /^\s*(?:^\s*\|.*\|\s*\n?)+/m,
            list: /^\s*(?m:^(?:\s*(?:\*|-|\d+\.)\s+[^\n]+)(?:\n|$))+/m,
            reference: /^\n+\-{3,}$/im,
            // paragraph:/^\s*[^\n]+(\s|\n)*/im,
            paragraph: /^(^[^-#|>\s][^\n]*(?:\n[^-#|>\s][^\n]*)*)/im,
            empty: /^\s*[\s\n]*/m,
            unknown: /^\s*.*\n*$/mi
        }


        var checkSequence = "code,html1,html2,heading1,heading2,block,checklist,list,reference,table,paragraph,empty,unknown".split(",")


        const checkBlockTypeStage1 = (mdinput) => {

            function matchMarkdownBlock(text) {
                for (const type of checkSequence) {
                    const regex = blockPattern[type];
                    const match = text.match(regex);
                    if (match && match.index === 0) { // Ensure match starts at beginning
                        return { type, match: match[0], unprocessed: text.slice(match[0].length) };
                    }
                }
                return { type: "unknown", match: "", unprocessed: text }; // Return unknown if no match found
            }



            for (var i = 0; i <= checkSequence.length; i++) {
                var type = checkSequence[i];
                var pattern = blockPattern[type];
                res = matchMarkdownBlock(mdinput);
                if (pattern == null || pattern == undefined) {
                    continue;
                }
            }
            return res
        }

        const renderpattern = {
            code: /^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi,
            heading1: /^\#{1,6}\s+([^\n]*)[\s\n]*/i,
            heading2: /^(\w[^\n]*)\n(-|\=){4,}[\s\n]*/im,
            block: /^^\s*>\s+([^\n]*)[\s\n]*/i,
            checklist: /^\s*(?:^\s*-\s+\[(?:\s*|[xX*])\]\s+[^\n]*\n?)+/m,
            table: /^\s*(?:^\s*\|.*\|\s*\n?)+/m,
            list: /^\s*(?m:^(?:\s*(?:\*|-|\d+\.)\s+[^\n]+)(?:\n|$))+/m,
            reference: /^\n+\-{3,}$/im,
            paragraph: /^(^[^-#|>\s][^\n]*(?:\n[^-#|>\s][^\n]*)*)/im,

        }



        const coderender = (block) => {
            var pattern = /^\s*```([^\n]*)\n([^`]*)```[\s\n]*/mi;
            const match = block.match(pattern);
            if (match) {
                var matchArray = Array.from(match)
                var res = gens(pre, "", gens(code, "", matchArray[2], `language-${matchArray[1]},${matchArray[1]}`))
                return res
            }
        }

        const tablerender = (table) => {


            var tableHeadBodySepratorPattern = /(^\|)(?=(:|-))([^\w\d\s]*?)(\|\s*$)/gm
            var sep = table.matchAll(tableHeadBodySepratorPattern)
            var sep = Array.from(sep)
            if (sep.length > 0) {
                var Sep = sep[0][0]
                var alignment = Sep.substr(1, Sep.length - 2)
                alignment = alignment.replaceAll(":---:", "center").replaceAll(":---", "left").replaceAll("---:", "right").replaceAll("---", "justify")
                alignment = alignment.split("|")
                var T = table.split(Sep)
                var thead = T[0]
                var tbody = T[1]
                thead = `\n\t<thead>${tableRowsParser(thead, alignment)}\n</thead>`
                tbody = `\n\t<tbody>${tableRowsParser(tbody, alignment)}\n</tbody>`
            }
            else {
                var alignment = null
                var thead = ""
                var tbody = `\n\t<tbody>${tableRowsParser(table, alignment)}\n</tbody>`
            }
            // tableRow
            function tableRowsParser(table, alignment = null) {
                // https://regex101.com/r/zRBXEm/1
                var tableRowPattern = /(^\|)(?!(:|-))([^\n]*?)(\|\s*$)/gm
                var rows = table.matchAll(tableRowPattern)
                rowsList = Array.from(rows)
                rowsList.forEach(Row => {
                    if (alignment == null) {
                        alignment = []
                        for (i = 0; i < Row[3].split("|").length; i++) {
                            alignment.push("center")
                        }
                    }

                    var R = RowParser(Row[3], alignment)
                    table = table.replaceAll(Row[0], R)
                })
                return table
            }

            function RowParser(Row, alignment) {
                var parsedRow = ""
                var Col = Row.split("|")
                Col.forEach((cell, i) => {
                    parsedRow = parsedRow + `<td class='${alignment[i]}'>${cell}</td>`
                })
                parsedRow = `\n\t<tr>\n\t${parsedRow}\n</tr>\n`
                return parsedRow
            }


            var table = `\n<table class="parse-md-table">${thead}\n${tbody}\n</table>`
            return textformat(table)
        }


        const blockquoterender = (block) => {
            var pattern = /^^\s*>\s+([^\n]*)[\s\n]*/i;
            const match = block.match(pattern);
            if (match) {

                var matchArray = Array.from(match)
                var res = gens("blockquote", "", matchArray[1])
                return textformat(res)
            }
        }

        const paragraphrender = (block) => {
            var pattern = /^(^[^-#|>\s][^\n]*(?:\n[^-#|>\s][^\n]*)*)/im;
            const match = block.match(pattern);



            function processIndentedLines(text) {
                return text
                    .split('\n')  // Split into lines
                    .map(line => {
                        // Check if line starts with tab or 4+ spaces
                        if (/^(\t| {4,})/.test(line)) {
                            return `<span class="tab">${line}</span>`;
                        }
                        return line;
                    })
                    .join('\n')  // Join back with line breaks
                    .replaceAll(/\n{2,}/g, '<br>')  // Convert remaining line breaks to <br>
                    .replaceAll(/\s{2,}$/g, '<br>')
            }


            if (match) {
                var matchArray = Array.from(match)
                var paratext = processIndentedLines(matchArray[1])
                var formatted = textformat(paratext)
                var res = gens(p, "", formatted)
                return res

            }
        }



        const heading1render = (block) => {
            var pattern = /^(\#{1,6})\s+([^\n]*)[\s\n]*/i;
            const match = block.match(pattern);
            if (match) {
                var matchArray = Array.from(match)
                var res = `<h${matchArray[1].length + 1}>${matchArray[2]}</h${matchArray[1].length + 1}>`
                return textformat(res)
            }
        }

        const heading2render = (block) => {
            var pattern = /^(\w[^\n]*)\n((-|\=){4,})[\s\n]*/im;
            const match = block.match(pattern);
            if (match) {
                var matchArray = Array.from(match)
                if (matchArray[2][2] == "-") var htype = 1
                else if (matchArray[2][2] == "=") var htype = 2
                var res = `<h${htype}>${matchArray[1]}</h${htype}>`

                return textformat(res)
            }
        }


        const listrender = (md) => {
            var ullistBlockPattern = /(^[\s\t]*(\*|-)\s+[^\n]*){1,}/mi
            var ollistBlockPattern = /(^[\s\t]*\d+.\s+[^\n]*){1,}/mi
            if (md.match(ollistBlockPattern)) {
                var listblocktype = "ol"
            } else if (md.match(ullistBlockPattern)) {
                var listblocktype = "ul"
            }


            md = md.split(/\n+/)

            md = md.map(line => {
                var parseline = line

                //toplevel or 

                if (!line.match(/^([\t\s]+)[^\n]*/)) {
                    var matchol = line.match(/^([\t\s]*)(\d+).\s+([^\n]*)$/)
                    if (matchol) {
                        parseline = `<ol><li class="no-${matchol[2]}">${matchol[3]}</li></ol>`
                    }
                    else {
                        var matchul = line.match(/^([\t\s]*)(\*|-)\s+([^\n]*)$/)
                        if (matchul) {
                            parseline = `<ul><li>${matchul[3]}</li></ul>`
                        }
                    }
                }
                // sublevel
                else {
                    var matchol = line.match(/^([\t\s]*)(\d+).\s+([^\n]*)$/)
                    // var parseline = line
                    if (matchol) {
                        parseline = `<${listblocktype}><ol><li class="no-${matchol[2]}">${matchol[3]}</li></ol></${listblocktype}>`
                    }
                    else {
                        var matchul = line.match(/^([\t\s]*)(\*|-)\s+([^\n]*)$/)
                        if (matchul) {
                            parseline = `<${listblocktype}><ul><li>${matchul[3]}</li></ul></${listblocktype}>`
                        }
                    }
                }
                return parseline
            })

            var res = md.join("\n\n").replaceAll(/<\/ul>\n+<ul>/g, "").replaceAll(/<\/ol>\n+<ol>/g, "").replaceAll("</ol><ol>", "").replaceAll("</ul><ul>", "")
            return textformat(res)
        }

        const textformat = (md) => {

            var inlinecodePattern = /(?<!`)`([^`]*?)`(?!`)/gmi;
            match1 = md.matchAll(inlinecodePattern)
            matchList = Array.from(match1)
            matchList.forEach(p => {
                md = md.replaceAll(p[0], `<code class='parsemd-code code-inline'>${p[1]}</code>`)
            })


            // // blockMath
            //https://regex101.com/r/QdJcQS/1
            var blockMathPattern = /\${2}([^$\n]+)\${2}/gm
            match1 = md.matchAll(blockMathPattern)
            matchList = Array.from(match1)
            matchList.forEach(p => {
                // log(p)
                md = md.replaceAll(p[0], `\\[ ${p[1]} \\]`)
            })


            // // inlineMath
            //https://regex101.com/r/QdJcQS/1
            // var inlineMathPattern = /(?<!\$)\$([^$\n]+)\$(?!\$)/gm
            var inlineMathPattern = /(?<!\$)\$([^$\n]+)\$(?!\$)/mg;

            match1 = md.matchAll(inlineMathPattern)
            matchList = Array.from(match1)
            matchList.forEach(p => {
                // log(p)
                md = md.replaceAll(p[0], `\\( ${p[1]} \\)`)
            })



            // // imageurl
            // https://regex101.com/r/EXVZcK/1

            var imageUrlPattern = /!\[([^\]]*)]\("?([^\)"']*)"?\)/gm
            match1 = md.matchAll(imageUrlPattern)
            matchList = Array.from(match1)
            matchList.forEach(p => {
                //               console.log(p)
                md = md.replaceAll(p[0], `\n<img src="${p[2]}" alt="${p[1]}" />`)

            })

            // // link
            // https://regex101.com/r/APBkU8/1
            // var linkPattern = /[^!]\[([^\]]*)\]\(([^\)]*)\)/gmi
            var linkPattern = /(?<!!)\[([^\]]*)\]\(([^\)]*)\)/gmi

            match1 = md.matchAll(linkPattern)
            matchList = Array.from(match1)
            matchList.forEach(p => {
                //                    log(p)
                md = md.replaceAll(p[0], `<a href="${p[2]}">${p[1]}</a>`)

            })


            // // bold/italic/emph
            // https://regex101.com/r/3GWtGB/1
            var italicPattern = /(?<=\W+)((\*|_){1,3})(\S[^\*_\n]+?\S)\1(?=\W)/gmi
            // var italicPattern = /([\s]+)((\*|_){1,3})([^\*_\n]+?)\1(?=\W)/gmi
            match1 = md.matchAll(italicPattern)
            matchList = Array.from(match1)
            matchList.forEach(p => {
                if (p[1].length == 3) {
                    md = md.replaceAll(p[0], `<em><strong>${p[3]}</strong></em>`)
                }
                if (p[1].length == 2) {
                    md = md.replaceAll(p[0], `<strong>${p[3]}</strong>`)
                }
                if (p[1].length == 1) {
                    md = md.replaceAll(p[0], `<em>${p[3]}</em>`)
                }
            })

            // // strikethrough
            // https://regex101.com/r/MLsQRh/1
            var strikethroughPattern = /~~(.*)~~/igm
            // var strikethroughPattern =/~~([\s\S]*?)~~/gm;
            match1 = md.matchAll(strikethroughPattern)
            matchList = Array.from(match1)
            matchList.forEach(p => {
                md = md.replace(p[0], `<del class='parsedmd-del'>${p[1]} </del>`)
            })



            // reference
            https://regex101.com/r/eLzXSC/1                                 
            var referencelinkPattern = /(?<!!)\[([^\]]*)\]\s{0,3}\[([^\]]*)\]/gmi

            match1 = md.matchAll(referencelinkPattern)
            matchList = Array.from(match1)
            matchList.forEach(p => {
                //                    log(p)
                md = md.replaceAll(p[0], `<a href="#${p[2]}">${p[1]}</a>`)

            })

            // Blockreferencelist
            // https://regex101.com/r/xu97SN/1
            var listBlockPattern = /(^ *(\[[^\]]*\]:)\s+[^\n]*){1,}/gmi
            match1 = md.matchAll(listBlockPattern)
            matchList = Array.from(match1)
            matchList.forEach(p => {
                var block = p[0]
                // referencelistBlock
                // https://regex101.com/r/JC0xSx/1
                var listPattern = /^\[([^\]]*)\]:\s+([^\n]*)$/gmi
                list = block.matchAll(listPattern)
                listEntry = Array.from(list)
                listEntry.forEach(li => {
                    block = block.replaceAll(li[0], `\n\t<span id="${li[1]}">${li[2]}</span> `)
                })

                // subreferencelist
                // https://regex101.com/r/DYvI2z/1
                var sublistPattern = /^ +(\*|-)\s+([^\n]*)$/gmi
                list = block.matchAll(sublistPattern)
                listEntry = Array.from(list)
                listEntry.forEach(li => {
                    //                        block = block.replaceAll(li[0], `\n<ul>\n\t<li>${li[1]}</li></ul>`) trying sub list
                    block = block.replaceAll(li[0], `\n<ul>\n\t<li>${li[2]}</li></ul>`)
                })

                // md = md.replaceAll(p[0], `\n<ul>${block}</ul>`)
                md = md.replaceAll(p[0], `\n${block}`)
            })
            return md

        }

        //subfunctions end























        var checkboxno = grab("input").length
        var lex = []



        // identify block type and content
        while (mdinput.length > 0) {
            var res = checkBlockTypeStage1(mdinput);
            if (res != null) {
                var type = res.type;
                var content = res.match;
                var unprocessed = res.unprocessed;


                if (content.length > 0) {

                    mdinput = unprocessed;
                    lex.push({
                        type: type,
                        content: content,
                    })
                }
            }
        }


        lex = lex.filter(o => o.type !== "empty")


        //foreachitem in lex
        for (var j = 0; j < lex.length; j++) {
            var block = lex[j]
            var rend = ""
            //renderhtml
            if (block.type == "html1" || block.type == "html2") {
                var rend = block.content
            }
            //rendercode
            else if (block.type == "code") {
                var rend = coderender(block.content)
            }
            //rendertable
            else if (block.type == "table") {
                var rend = tablerender(block.content)
            }
            //renderlist
            else if (block.type == "list") {
                var rend = listrender(block.content)
            }
            //renderblockquote
            else if (block.type == "block" || block.type == "blockquote") {
                var rend = blockquoterender(block.content)
            }
            //rendertab
            else if (block.type == "tab") {
                // var rend = tablerender(block.content)
            }
            //renderparagraph
            else if (block.type == "paragraph") {
                var rend = paragraphrender(block.content)
            }
            else if (block.type == "heading1") {
                var rend = heading1render(block.content)
            }
            else if (block.type == "heading2") {
                var rend = heading2render(block.content)
            }

            lex[j].render1 = rend
        }

        var rend1join = ""
        for (var j = 0; j < lex.length; j++) {
            rend1join = `${rend1join}${lex[j].render1}`
        }

        callback(rend1join)
        return rend1join;


    }
    //parsemdbeta end


    //append start
    const append = (parentid, childhtml, position = 'after') => {
        position = position.toLowerCase()
        try {
            if (parentid instanceof Object == true) { var parentElement = parentid }
            else {
                var parentElement = document.querySelectorAll(parentid)[0];
            }
            // var parentElement = self.get(parentid)[0]
            var T = document.createElement('div')
            T.id = 'T'
            T.innerHTML = ""
            // array
            if (Array.isArray(childhtml) == true) {

                childhtml.forEach((child, index) => {
                    if (typeof child == 'string') {
                        T.innerHTML += child
                    }
                    else if (typeof child != 'string') {
                        if (child.outerHTML != undefined) {
                            T.innerHTML += child.outerHTML
                        }
                        if (child.outerHTML == undefined) {
                            T.innerHTML += objtohtml(child)
                        }
                    }
                    //may be removed
                    else if (self.isHTML(child)) {
                        T.innerHTML += child.outerHTML
                    }
                    // console.log(T.innerHTML)
                });


            }
            // non array
            else if (Array.isArray(childhtml) == false) {

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


            if (position == 'before' || position == 'b') {
                parentElement.innerHTML = T.innerHTML + parentElement.innerHTML
            } else if (position == 'over' || position == 'o') {
                if (T.innerHTML != null) parentElement.innerHTML = T.innerHTML
                if (T.innerHTML == null) parentElement.innerHTML = ''
            } else if (position == 'replace' || position == 'r') {
                parentElement.outerHTML = T.innerHTML
            } else if (position == 'after' || position == 'a') {
                parentElement.innerHTML = parentElement.innerHTML + T.innerHTML
            } else if (position == 'parent' || position == 'p') {
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

    };
    //append 

    //gen start
    const gen = (elementtype, idin, htmlin, classin, src, event) => {
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
                            // if (elementtype == 'code' || elementtype == 'pre') {
                            if (elementtype == 'code') {
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
    };
    //gen end    
    //gen end


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


    //get depricated
    self.get = (parentid) => {
        console.error("get is depricated, use grab instead")
        var parentElement = null;
        try {
            if (parentid instanceof Object == true) { parentElement = parentid }
            else {
                parentElement = document.querySelectorAll(parentid);
            }
        }
        catch (err) {
            console.log(`grab(${parentid})`)
            console.error(err)
        }
        return parentElement

    };

    //grab
    self.grab = grab;

    //new parsemd from parsemdbeta
    self.parsemd = parsemdbeta

    // check if content is html
    self.isHTML = (content) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = content;
        return tempElement.children.length > 0;
    }


    // append
    self.append = append;

















    //gen start
    self.gen = gen;


    self.gens = (...args) => {
        var el = self.gen(...args)
        var elstr = el.outerHTML.toString()
        return elstr
    }

    self.genp = (...args) => {
        var el = self.gens(...args)
        var elstr = el.replaceAll("&", '&amp;').replaceAll('</', '&lt;&#47;').replaceAll("<", "&lt;").replaceAll(">", '&gt;')
        return elstr
    }



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
                return elem
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

                return elem.innerHTML
            }

        }
        catch { console.error("jsonToElement(", obj, ")") }
    }

        ;

    //cssvar read and modify css vars
    self.cssvar = (name, value) => {
        var r = document.querySelector(':root')
        var rs = getComputedStyle(r)
        if (name[0] != '-') name = '--' + name
        if (value) r.style.setProperty(name, value)
        return rs.getPropertyValue(name);
    };


    //getremotefile and use data
    self.getfile = (URL, callback) => {

        var name = URL
        var response
        try {
            if (window.DEBUG != 1 && sessionStorage.getItem(name) != null && sessionStorage.getItem(name) != "") {
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
                            // sessionStorage.setItem(name, response)
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

        if (styleid != undefined) {
            var path = styleid

            for (i = styleid.length; i > 0; i--) {
                if (styleid[i] == '/') {
                    path = styleid.substring(0, i)
                    break
                }
            }
        }



        // var singleLineCommentsPattern = /\/\/([^\n]*)\n/gmi
        var importPattern = /^@([\w]*)[^"|']["|'](.*[^"|'])["|']/gmi
        var importFilenames = scss.matchAll(importPattern)
        var importFilenameList = Array.from(importFilenames)
        //LoadIncludes
        importFilenameList.forEach(n => {
            var fileImportUrl = n[2].replaceAll('./', '');
            var fullPath = `${path}/${fileImportUrl}.scss`
            scss = scss.replaceAll(n[0], '')

            load(fullPath)
        })

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
                    // log(currentId)
                    if (currentId.includes(",")) {

                        currentId = currentId.replaceAll(" ,", ',').replaceAll(", ", ',')
                        var idParts = currentId.split(",")
                        var expandedChain = ""
                        idParts.forEach(idPart => {
                            expandedChain += cssSelectorChain + " " + idPart + ", "
                        });


                        cssSelectorChain = expandedChain.substring(0, expandedChain.length - 2)
                    }
                    else {

                        // if (cssSelectorChain.includes("pdf")){
                        var newChain = ""
                        cssSelectorChain.split(",").forEach(part => {
                            if (newChain != "") { newChain += ", " }
                            newChain += part + " " + id[i_id]
                        })
                        cssSelectorChain = newChain
                        // }
                        // else{

                        // cssSelectorChain = cssSelectorChain + " " + id[i_id] 
                        // }
                    }
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
                self.append("body", self.gen("div", "applog", self.gen(span, "", "close", "cross material-symbols-outlined", { "onclick": "GeneratorJs().hide(this.parentElement)" }), "applog"))

                // append(app, gen("div", "applog", "", "applog", { "onclick": "hide(this)" }))
                self.loadscss(self.logStyleScss, "log")

            }
            // if (data === 'clear' || data === 'hide' || data === null || data === undefined || data === "") {
            if (data === 'clear' || data === 'hide') {
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
        if (RequiredFunctions == undefined) RequiredFunctions = 'get,grab,append,cssvar,gen,gens,genp,getfile,hide,jsonToElement,loadcss,loadjs,loadscss,load,log,remove,parsemd,verb,htmltostring'
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
