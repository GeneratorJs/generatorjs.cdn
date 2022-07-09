export default function jsonToElement(obj) {
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

