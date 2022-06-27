
//eel.expose(append)
export default function append(parentid, childhtml, position = 'after') {
    try {
        // console.log(parentid)
        // console.log(parentid instanceof Object)
        if (parentid instanceof Object == true) { var parentElement = parentid }
        else {
            var parentElement = document.querySelectorAll(parentid)[0];
        }
        // parentElement.innerHTML += ''
        // console.log(parent.innerHTML)
        // console.log(T.innerHTML)
        // console.clear()
        // log('append')

        var T = document.createElement('div')
        T.id = 'T'
        T.innerHTML = ""
        if (Array.isArray(childhtml) == true) {
            // console.log('array')
            for (let i = 0; i < childhtml.length; i++) {
                // console.log([i, childhtml.length])
                //if not html
                if (typeof childhtml[i] == 'string') {
                    // console.log(`string ${i}`)
                    T.innerHTML += childhtml[i]
                }

                if (typeof childhtml[i] != 'string') {
                    // console.log(`'not string'${i}`)
                    //HTML
                    if (childhtml[i].outerHTML != undefined) {
                        // console.log('not object')
                        T.innerHTML += childhtml[i].outerHTML
                    }
                    //JSON Object
                    if (childhtml[i].outerHTML == undefined) {
                        // console.log('object')
                        T.innerHTML += objtohtml(childhtml[i])
                    }
                }

            }

        }
        if (Array.isArray(childhtml) == false) {

            if (childhtml != undefined) {
                // console.log('not array')
                // console.log(childhtml)
                //HTML STRING
                if (typeof childhtml == 'string') {
                    // console.log('string')
                    T.innerHTML += childhtml
                }
                if (typeof childhtml != 'string') {
                    //HTML
                    // console.log(childhtml)
                    if (childhtml.outerHTML != undefined) {
                        T.innerHTML += childhtml.outerHTML
                    }
                    //JSON Object
                    if (childhtml.outerHTML == undefined) {
                        T.innerHTML += childhtml
                    }
                }
            }
        }

        // console.log(T)

        if (position == 'after') {
            parentElement.innerHTML = parentElement.innerHTML + T.innerHTML
            // console.log(T)
            // parentElement.innerHTML = T.innerHTML
        }
        if (position == 'before') {
            parentElement.innerHTML = T.innerHTML + parentElement.innerHTML
        }
        if (position == 'over') {
            if (T.innerHTML != null) parentElement.innerHTML = T.innerHTML
            if (T.innerHTML == null) parentElement.innerHTML = ''
        }
        if (position == 'replace') {
            parentElement.outerHTML = T.innerHTML
        }

        // return parentElement
    }
    catch (err) {
        console.log(`append(${parentid}, ${childhtml}, ${position})`)
        console.error(err)
    }

}

