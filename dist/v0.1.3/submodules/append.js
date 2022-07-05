export default function append(parentid, childhtml, position = 'after') {
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

