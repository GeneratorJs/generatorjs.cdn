// import loadscss from "./loadscss.js"; export { loadscss }; window.loadscss = loadscss
var { default: loadscss } = await import("./loadscss.js")
var { default: getfile } = await import("./getfile.js")
var { default: loadhtml } = await import("./loadhtml.js")
var { default: log } = await import("./log.js")
//eel.expose(load)
export default function load(srcList, pos) {

    try {
        if (pos == undefined) { var pos = 'head' }
        if (Array.isArray(srcList) == true) {
            if (srcList.length > 0) {

                for (var i = 0; i < srcList.length; i++) {
                    var extension = ""
                    var currentLink = srcList[i]
                    var extensionStart = 0
                    var extensionEnd = currentLink.length
                    for (let i = extensionEnd; i > 0; i--) {
                        if (currentLink[i] == ".") {
                            extensionStart = i;
                            extension = currentLink.slice(extensionStart, extensionEnd)
                            break
                        }
                    }
                    if (extension == ".js") {
                        loadjs(srcList[i], pos)
                    } else if (extension == ".css") {
                        loadcss(srcList[i], pos)
                    } else if (extension == ".scss") {
                        loadscss(getfile(currentLink))
                    } else if (extension == ".html") {
                        target = null
                        loadhtml(currentLink, target)
                    }

                    if (extension != ".js" && extension != ".css") {
                        // console.log('loading object')
                        loadobject(srcList[i], pos)
                    }
                }
            }
        } else if (Array.isArray(srcList) == false) {
            currentLink = srcList
            var extensionStart = 0
            var extensionEnd = currentLink.length
            var extension = ""
            if (currentLink.length > 0) {

                for (let i = extensionEnd; i > 0; i--) {
                    if (currentLink[i] == ".") {
                        extensionStart = i;
                        extension = currentLink.slice(extensionStart, extensionEnd)
                        break
                    }
                }

                if (extension == ".js") {
                    loadjs(currentLink, pos)
                } else if (extension == ".css") {
                    loadcss(currentLink, pos)
                } else if (extension == ".scss") {
                    loadscss(getfile(currentLink))

                }

                if (extension != ".js" && extension != ".css") {
                    // console.log('loading object')
                    loadobject(currentLink, pos)
                }
            }

        }


    }
    catch (err) {
        console.log(srcList)
        console.error(err)
    }

}

export var ListOfStyles = [
    // `https://generatorjs.mgeek.in/cdn/style/sitestyle.css`,
    // `https://generatorjs.mgeek.in/cdn/style/pagestyle.css`,
    `./cdn/style/sitestyle.css`,
    `./cdn/style/pagestyle.css`,
]
export var ListOfScripts = [
    `./defaults.js`,
]





export async function loadjs(src, pos) {
    var s = document.createElement("script");  // create a script DOM node
    s.type = 'text/javascript'
    s.src = src;  // set its src to the provided URL
    // s.async = true
    // s.defer = true
    s.setAttribute('async', '');
    s.setAttribute('defer', '');
    // document.head.appendChild(s);
    if (pos == 'head') {
        document.head.appendChild(s);
    } else if (pos == 'body') {
        document.body.appendChild(s);
    }
}
export async function loadcss(link, pos) {
    var s = document.createElement("link");  // create a script DOM node
    s.rel = 'stylesheet';
    // s.type = 'text/javascript';
    // s.href = srcList[i];  // set its src to the provided URL
    s.href = link;  // set its src to the provided URL

    // script.crossorigin = "anonymous";
    // script.integrity = "sha384-EzBXYPt0/T6gxNp0nuPtLkmRpmDBbjg6WmCUZRLXBBwYYmwAUxzlSGej0ARHX0Bo";
    // document.head.appendChild(s);
    // document.head.appendChild(s);
    if (pos == 'head') document.head.appendChild(s);
    if (pos == 'body') document.body.appendChild(s);
}

export async function loadobject(obj, pos) {
    var keylist = Object.keys(obj)
    for (i = 0; i < keylist.length; i++) {
        var s = document.createElement(meta);
        s.setAttribute('name', keylist[i]);
        if (keylist[i] == 'title' || keylist[i] == 'description' || keylist[i] == 'type' || keylist[i] == 'url' || keylist[i] == 'image' || keylist[i] == 'logo' || keylist[i] == 'site_name') {
            s.setAttribute('property', `og:${keylist[i]}`);
        }
        s.setAttribute('content', obj[keylist[i]]);
        if (pos == 'body') { document.body.appendChild(s); }
        if (pos == 'head') {
            document.head.appendChild(s);
            //opengraph
        }
    }

    // var s = document.createElement("link");  // create a script DOM node
    // s.rel = 'stylesheet';
    // s.href = srcList[i];  // set its src to the provided URL
    // if (pos == 'head') document.head.appendChild(s);
    // if (pos == 'body') document.body.appendChild(s);
}


export function loadDefaultApp() {
    append('app', '', 'over')
    // load(ListOfStyles);
    append("app",
        [
            gen("div", 'applog', "", "appcontainer"),
            gen("header", 'appheader', "", 'header appcontainer'),
            gen("main", 'appmain', "", 'main appcontainer'),
            gen("footer", 'appfooter', "", 'footer appcontainer'),
            gen("div", 'copyright')
        ]
    )
    append(
        "appmain", [gen('h1', "", 'Designed with GeneratorJs'),
        gen(a, '', 'Visit https://generatorjs.mgeek.in for more information', "", "https://generatorjs.mgeek.in")
    ]
    )

    // load(ListOfScripts);
}


// export function loadCopyright() {
//     append("copyright", [
//         gen("span", "copyurl", `Designed with <a href="https://generatorjs.mgeek.in">GeneratorJs</a> &copy 2022 <a href="http://mgeek.in">mGeek.in</a>`),
//         gen("span", "copyauthor", `Designed by <a href="http://mgeek.in/webmaster">Dr. Prateek Raj Gautam</a>`)
//     ], 'over')
// };




export function loaddefaultstyles() {
    load(ListOfStyles)
}
export function loaddefaultapp() {
    load(ListOfScripts)
}
// loaddefaultstyles()
// loaddefaultapp()
