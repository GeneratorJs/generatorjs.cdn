const parsemd = (md, callback) => {
        // var parsedmd = ""

        console.log("loading markdown")
        if (md.length > 2) {

            function cleanMdLinebreak(md) {
                // Clear extra linebreaks
                var cleanLinebreakPattern = /([\n]{3,})/gmi
                match1 = md.matchAll(cleanLinebreakPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    // log(p[0])
                    md = md.replaceAll(p[0], '\n\n')
                })

                var mdBlocks = md.split("\n\n")
                var processedmd = [""]
                for (i = 0; i < mdBlocks.length; i++) {
                    mdBlocks[i] = mdBlocks[i] + '\n\n'
                    processedmd[0] = processedmd[0] + mdBlocks[i]
                }
                mdBlocks = processedmd  // problem with splitting inside code blocks```
                return { md, mdBlocks };
                // log(processedmd[0])
                // return { md, processedmd };

            }




            function parseBlock(md) {


                // https://regex101.com/r/LIp0M9/1
                //classPattern
                var classPattern = /{:\s*([^}]*)}/g



                // // code
                // https://regex101.com/r/WpO7gY/1
                // codePattern = /```([^\s]*)([^```]*)```/gmi
                var codePattern = /`{3}([^\n]*)\n([^`]*)`{3}/gmi
                match1 = md.matchAll(codePattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    //               console.log(p)
                    md = md.replaceAll(p[0], `<pre><code class="${p[1]}, language-${p[1]}">${p[2]}</code></pre>`)
                })

                // For MathJax
                // https://regex101.com/r/hPFQIP/1
                // inlinecodePattern = /`([^`]*)`/gmi
                // var inlinecodePattern = /`([^`\n][^`]+)`[^`]/gmi
                //https://regex101.com/r/6JJNlx/1
                var inlinecodePattern = /(?<!`)`([^`]*?)`(?!`)/gmi
                match1 = md.matchAll(inlinecodePattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    // log(p)
                    md = md.replaceAll(p[0], `<code class='parsemd-code'>${p[1]}</code>`)
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
                var inlineMathPattern = /(?<!\$)\$([^$\n]+)\$(?!\$)/gm
                match1 = md.matchAll(inlineMathPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    // log(p)
                    md = md.replaceAll(p[0], `\\( ${p[1]} \\)`)
                })




                //tableParser
                // https://regex101.com/r/p2uS56/1
                // var tablePattern = /(\|.*\|)(\n\|.*\|)+/gmi
                var tablePattern = /(^\|.*?\|\s*\n+$)/gms
                match1 = md.matchAll(tablePattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    var table = p[0]
                    // https://regex101.com/r/I059re/1
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
                        thead = `<thead>${tableRowsParser(thead, alignment)}</thead>`
                        tbody = `<tbody>${tableRowsParser(tbody, alignment)}</tbody>`
                    }
                    else {
                        var alignment = null
                        var thead = ""
                        var tbody = `<tbody>${tableRowsParser(table, alignment)}</tbody>`
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
                        parsedRow = `<tr>\n\t${parsedRow}\n</tr>\n`
                        return parsedRow
                    }


                    var tab = `<table class="parse-md-table">${thead}\n${tbody}</table>`

                    md = md.replaceAll(p[0], tab)
                })






                // heading pattern
                // https://regex101.com/r/eXAQjk/1
                var headingPattern = /^([#]+) ([^\n]*)$/gmi
                match1 = md.matchAll(headingPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    // console.log(p[0])
                    // console.log(p[1])
                    // console.log(p[2])
                    md = md.replaceAll(p[0], `<h${p[1].length}>${p[2]}</h${p[1].length}>\n`)
                })


                // h1 pattern with====
                // https://regex101.com/r/q2Q4tD/1
                var headingPattern = /^([^\n]*)\n[=]{4,}\n$/gmi
                match1 = md.matchAll(headingPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    md = md.replaceAll(p[0], `<h1>${p[1]}</h1>`)
                })

                // h2 pattern with----
                // https://regex101.com/r/EDSCl6/1
                var headingPattern = /^([^\n]*)\n[-]{4,}$/gmi
                match1 = md.matchAll(headingPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    md = md.replaceAll(p[0], `<h2>${p[1]}</h2>`)
                })




                // Hline pattern ---
                // https://regex101.com/r/9sKxn2/1
                var headingPattern = /^([-|*|_]{3})\n{1,}$/gmi
                match1 = md.matchAll(headingPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    // log(p)
                    md = md.replaceAll(p[0], `<hr /><br />`)
                })

                // // imageurl
                // https://regex101.com/r/EXVZcK/1
                var imageUrlPattern = /!\[([^\]]*)]\("?([^\)"']*)"?\)/gm
                match1 = md.matchAll(imageUrlPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    //               console.log(p)
                    md = md.replaceAll(p[0], `<img src="${p[2]}" alt="${p[1]}" />`)

                })

                // // link
                https://regex101.com/r/APBkU8/1
                var linkPattern = /(?<!!)\[([^\]]*)\]\(([^\)]*)\)/gmi
                match1 = md.matchAll(linkPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    //                    log(p)
                    md = md.replaceAll(p[0], `<a href="${p[2]}">${p[1]}</a>`)

                })

                // // bold/italic/emph
                // https://regex101.com/r/lgaepf/1
                var italicPattern = /((\*|_){1,3})([^\*_\n]+?)\1/gmi
                match1 = md.matchAll(italicPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    if (p[1].length == 3) {
                        md = md.replaceAll(p[0], `<emph><strong>${p[3]}</strong></emph>`)
                    }
                    if (p[1].length == 2) {
                        md = md.replaceAll(p[0], `<strong>${p[3]}</strong>`)
                    }
                    if (p[1].length == 1) {
                        md = md.replaceAll(p[0], `<emph>${p[3]}</emph>`)
                    }
                })



                // // strikethrough
                // https://regex101.com/r/MLsQRh/1
                var strikethroughPattern = /~~([^~]*?)~~/img
                match1 = md.matchAll(strikethroughPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    md = md.replaceAll(p[0], `<del class='parsedmd-del'>${p[1]}</del>`)
                })


                // // reference
                // https://regex101.com/r/CZ2fjd/1
                var referrencePattern = /\[\^([^\]]*)][^:]/gmi
                match1 = md.matchAll(referrencePattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    // console.log(p)
                    md = md.replaceAll(p[0], `<sup><a href='#Reference-${p[1]}'>${p[1]}</a></sup>`)
                })






                // referencelist
                // https://regex101.com/r/oZ8gFY/1
                var referrencePatternList = /^\[\^([^\]]*)]:([^\n]*)$/gmi
                match1 = md.matchAll(referrencePatternList)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    // console.log(p[0])
                    md = md.replaceAll(p[0], `<li id='Reference-${p[1]}'> ${p[2]}</li>`)
                })









                // listBlockUnordered
                https://regex101.com/r/J3Yc3A/1
                var listBlockPattern = /^(\*\s[^\n]*\n){1,}$/gmi
                match1 = md.matchAll(listBlockPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    var block = p[0]
                    // listBlock
                    https://regex101.com/r/J3Yc3A/1
                    var listPattern = /^\*\s([^\n]*)$/gmi
                    list = block.matchAll(listPattern)
                    listEntry = Array.from(list)
                    listEntry.forEach(li => {
                        block = block.replaceAll(li[0], `<li>${li[1]}</li> `)
                    })





                    md = md.replaceAll(p[0], `<ul>${block}</ul>`)
                })




                // listBlockOrdered
                // https://regex101.com/r/axjYKK/1
                var listBlockPatternOl = /^(\d+.\s[^\n]*\n){1,}$/gmi
                match1 = md.matchAll(listBlockPatternOl)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    var block = p[0]
                    // listBlockOrdered
                    https://regex101.com/r/1uWUpl/1
                    var listPatternOl = /^\d+.\s([^\n]*)$/gmi
                    list = block.matchAll(listPatternOl)
                    listEntry = Array.from(list)
                    listEntry.forEach(li => {
                        block = block.replaceAll(li[0], `<li>${li[1]}</li>`)
                    })



                    // md = md.replaceAll(p[0], `<ol>${block}</ol>`)
                    md = md.replaceAll(p[0], htmltostring(gen("ol", "", block, 'parse-md-ol')))
                })
































                //connect consecutive list with line break
                //https://regex101.com/r/xLtvb3/1
                var connectListPattern = /<\/(ol|ul)[^\w\d\t\b]*?<\1[^>]*>/gm
                match1 = md.matchAll(connectListPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    // console.log(p[0])
                    md = md.replaceAll(p[0], `<br />`)
                })


                // paragraph pattern
                // https://regex101.com/r/eXAQjk/1
                // var paragraphPattern = /^(?!\s*$|\${2}|\\\[|#{1,6}\s|\*\s|\d+.\s|!|\[|>+\s+|-|\||`)([\s\S]*?)\n{ 2,}/gmi


                
                // paragraph pattern
                // https://regex101.com/r/Ah1UkH/1
                var paragraphPattern=/^(?!\s*$|\${2}|\\\[|#{1,6}\s|\*\s|\d+.\s|!|\[|>+\s+|-|\||```)([\s\S]*?)(?!```)\n{2,}/gmi

                match1 = md.matchAll(paragraphPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    console.log(p[0])
                    console.log(p[1])
                    console.log(p[2])
                    md = md.replaceAll(p[0], `<p>${p[1]}</p>`)
                })


                // BlockParagraph blockQuote
                https://regex101.com/r/82DjLH/1
                var BlockParaPattern = /^(>\s[^\n]*\n){1,}/img
                match1 = md.matchAll(BlockParaPattern)
                matchList = Array.from(match1)
                matchList.forEach(p => {
                    var block = p[0]
                    // log(block)
                    var ul = ''

                    // listBlockOrdered
                    https://regex101.com/r/1uWUpl/1
                    var BlockParaPatternline = /^>\s([^\n]*)$/img
                    list = block.matchAll(BlockParaPatternline)
                    listEntry = Array.from(list)
                    listEntry.forEach(li => {
                        // block = block.replaceAll(li[0], `<li>${li[1]}</li>`)
                        block = block.replaceAll(li[0], li[1])
                    })
                    block = htmltostring(gen("p", "", block, 'parse-md-blockquote-p'))



                    // md = md.replaceAll(p[0], `<ol>${block}</ol>`)
                    md = md.replaceAll(p[0], htmltostring(gen("blockquote", "", block, 'parse-md-blockquote')))
                    md = md.replaceAll("<p></p>", "")
                })









                return md
            }















            var { mdClean, mdBlocks } = cleanMdLinebreak(md)
            var output = ""
            mdBlocks.forEach(block => {
                var parsedBlock = parseBlock(block)
                // log(parsedBlock)
                // output = output + `<div>${parsedBlock}</div>`
                output = output + `${parsedBlock}`
            })






        }
        if (callback != undefined) callback(output)
        return output
    };