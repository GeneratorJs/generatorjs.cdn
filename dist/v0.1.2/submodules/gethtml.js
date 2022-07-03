export default async function getHTML(name, target = null, type, storage = sessionStorage) {
    if (type == null) type = 'innerHTML'
    var response = ""
    if (storage.getItem(name) != null) {
        response = storage.getItem(name)
        if (target != null) {

            if (type == "innerHTML") {
                document.getElementById(target).innerHTML = response
            }
            if (type == "outerHTML") {
                document.getElementById(target).outerHTML = response
            }
            if (type == "append") document.getElementById(target).innerHTML += response
        }
    }
    if (storage.getItem(name) == null) {
        let xhr = new XMLHttpRequest();
        URL = `./${name}.html`
        method = "GET"
        await xhr.open(method, URL)
        await xhr.send()
        xhr.onload = async function () {
            console.log(name + xhr.status)
            // alert(`${xhr.onerror}Loaded: ${xhr.status} ${xhr.response} `);
            if (xhr.status >= 200 && xhr.status < 400) {
                response = await xhr.response
                // save to local stoage
                await xhr.DONE
                if (window.DEBUG != 1 || DEBUG != true) storage.setItem(name, response)

                if (target != null) {
                    // alert(target)
                    // alert(response)
                    // alert(type)
                    if (type == "innerHTML") {
                        document.getElementById(target).innerHTML = await response
                    }
                    if (type == "outerHTML") {
                        document.getElementById(target).outerHTML = await response
                    }
                    if (type == "append") document.getElementById(target).innerHTML += await response
                }
            }
        }

    }


    return response
}