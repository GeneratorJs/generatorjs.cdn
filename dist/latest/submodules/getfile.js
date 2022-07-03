export default async function getfile(URL, storage) {
    if (typeof storage === 'undefined') storage = sessionStorage
    var name = URL
    var response = null
    try {
        if (storage.getItem(name) != null) {
            response = storage.getItem(name)
        } else if (storage.getItem(name) == null) {
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
                    if (window.DEBUG != 1 || window.DEBUG != true || typeof window.DEBUG !== "undefined") storage.setItem(name, response)
                }
            }
        }
    }
    catch (err) {
        console.log(`getfile(${URL}, ${storage})`)
        console.error(err)
    }
    return response
}