export default async function getfile(URL, callback) {
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
    // try {
    //     if (typeof callback === "function") callback(response)
    // }
    // catch (e) {
    //     console.error(e)
    // }

    return response
}