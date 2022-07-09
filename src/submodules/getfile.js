export default async function getfile(URL, callback) {
    // if (typeof storage === 'undefined') 

    var name = URL
    var response = null
    try {
        if (sessionStorage.getItem(name) != null && sessionStorage.getItem(name) != "") {
            response = sessionStorage.getItem(name)
        } else if (sessionStorage.getItem(name) == null) {
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
                    // save to local stoage
                    if (window.DEBUG != 1 || window.DEBUG != true || typeof window.DEBUG !== "undefined") sessionStorage.setItem(name, response)
                }
            }
        }

        if (typeof callback === "function") callback(response)
    }
    catch (err) {
        console.log(`getfile(${URL}, ${storage})`)
        console.error(err)
    }
    return response
}