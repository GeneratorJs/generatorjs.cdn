import gen from "./gen.js"
import append from "./append.js"

export default function loadscss(scss) {
    scss = scss.replaceAll("&:", ":")
    try {
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
        for (var i = 0; i <= len; i++) {


            var testSymbol = scss[i]
            // if (testSymbol == "/") {
            //     // to be implemented
            //     // if (scss.substr(i, 2) == "//") comment = 1
            //     if (scss.substr(i, 2) == "/*") comment = 2
            // }
            if (comment > 0) {
                if (comment == 1) {
                    // console.log(scss.substr(i, 2))
                    // error in this part
                    if (scss.substr(i, 2) == "\n" || scss.substr(i, 2) == "\r") comment = 0
                }
                if (comment == 2) {
                    if (scss.substr(i, 2) == "*/") comment = 0
                }
            }
            if (comment == 0) {
                if (testSymbol == '{') {
                    idEnd = i
                    var currentId = scss.substr(idStart, idEnd - idStart)
                    if (id.length > 0) {
                        cssSelectorChain = ""


                        id.forEach((e) => {
                            cssSelectorChain = cssSelectorChain + " " + e
                        })
                        cssSelectorChain = cssSelectorChain.replaceAll(" :", ":").replaceAll(" &:", ":")
                        var currentCss = ""
                        currentCss = scss.substr(cssBegin, cssEnd - cssBegin)
                        if (currentCss.replaceAll("}", " ").replaceAll("\n", " ").trim().length != 0) {
                            // console.log(currentCss)
                            var idCss = cssSelectorChain + currentCss + "}\n"
                            idCss = idCss
                            css = css + "\n" + idCss

                            if (scss[cssBegin] == "{" && scss[cssEnd + 1] == ";") {

                                console.log(NestingLevel, id.length)

                            }

                        }
                    }
                    if (currentId != undefined) id.push(currentId.trim().replaceAll("\n", " "))

                    cssEnd = i
                    cssBegin = i
                    NestingLevel++
                }
                if (testSymbol == ';' || testSymbol == '}') {
                    idStart = i + 1;
                    cssEnd = i + 1
                    if (testSymbol == '}') {
                        if (scss[cssBegin - 1] != scss[cssEnd - 1]) {
                            cssSelectorChain = ""
                            id.forEach((e) => {
                                cssSelectorChain = cssSelectorChain + " " + e
                            })
                            cssSelectorChain = cssSelectorChain.replaceAll("  ", " ").replaceAll(" :", ":").replaceAll(" &:", ":")

                            var currentCss = ""
                            currentCss = scss.substr(cssBegin, cssEnd - cssBegin)

                            if (currentCss.replaceAll("}", " ").replaceAll("\n", " ").trim().length != 0) {
                                var idCss = cssSelectorChain + currentCss
                                css = css + "\n" + idCss
                            }
                            ////
                            NestingLevel--
                            // id.pop()
                            cssBegin = i + 1
                        }

                        id.pop()
                    }
                }
            }
        }
        // console.log(css)
        css.replaceAll("  ", " ").replaceAll(" :", ":").replaceAll(" &:", ":")
        append('head', gen("style", "", css))
        return css
    }
    catch (err) { console.error(err) }
}