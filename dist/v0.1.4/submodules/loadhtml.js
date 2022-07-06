var { default: append } = await import("./append.js");
var { default: getfile } = await import("./getfile.js");


export default function loadhtml(URL, target, type = "over") {
    console.log(target)
    var htmlContent = getfile(URL);
    if (target != undefined) append(target, htmlContent, type)
}