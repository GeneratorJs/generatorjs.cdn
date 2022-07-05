export default function saveHTML(...inputs) {
    try {
        var id = inputs[0]
        if (inputs.length == 1) var filename = `./${id}.html`
        else if (inputs.length > 1) var filename = `./${inputs[1]}.html`.replaceAll(".html.html", ".html")
        var fileContent = document.querySelectorAll(id)
        if (fileContent.length == 0) console.info('No element found')
        else if (fileContent.length != 0) {
            const blob = new Blob([fileContent[0].outerHTML], { type: 'text/html' });
            save(filename, blob)
        }
    } catch (error) {
        console.log(`saveHTML(${inputs})`)
        console.error(error)

    }

}
export function save(filename, blob) {
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}
