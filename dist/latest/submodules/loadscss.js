import gen from "./gen.js"
import append from "./append.js"

export default function loadscss(scss, styleid) {

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
        append('head', gen("style", styleid, css))
        return css
    }
    catch (err) {
        console.log(`loadscss(${scss}, ${styleid})`)
        console.error(err)
    }
}


/* comment cause problems*/
// empty nest cause problems
// ul{
//     li{
//         property;
//     }
// }

// thisworks
// ul{
    // property;
//     li{
//         property;
//     }
// }