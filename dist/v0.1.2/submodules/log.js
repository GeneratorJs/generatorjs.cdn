import gen from "./gen.js"
import append from "./append.js"
import loadscss from "./loadscss.js"
var logStyle = `
#applog {

    font-size:.8rem;
    // display: flex;
    display: none;
    width:clamp(400px,50vh,80vh);
    flex-direction: column;
    position: fixed;
    right:20px;
    top:20px;
    z-index: 1000;
    padding: 1em;
    border-radius: 5px;
    color: #fff;
    background-color: hsla(225, 20%, 40%, 1);
    box-shadow:2px 2px 5px black;
    resize: both;
    overflow:auto;
    max-height:80vh;
    max-width:80vw;
    min-height:3em;

    >.log{
        position:relative;
        font-size:12px;
        font-family:"arial";
        padding: 1.5em;
        background-color: hsla(230, 80%, 5%, 1);
        margin:1em;
        box-shadow:1px 1px 2px black;
        border-radius: 5px;
        

    


}


.cross {

    cursor:pointer;
    margin:1em;
    position:absolute;
    top: 0px;
    right: 0px;
    padding:1em;
    max-width:15px;
    
    &:after{
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        height: 1px;
        width: 100%;
        transform: rotateZ(-45deg);
        background-color: white;
        
    }
    &:before {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        height: 1px;
        width: 100%;
        transform: rotateZ(45deg);
        background-color: white;
    }
}
`



export default function log(data = '', pos = "before") {
    try {
        var applog = document.getElementById("applog")
        if (applog == null || applog == undefined) {
            // document.getElementById("app").append(gen(div, "applog", "", "applog,applog"))
            append(app, gen("div", "applog", gen(span, "", "", "cross", { "onclick": "hide(this.parentElement)" }), "applog"))

            // append(app, gen("div", "applog", "", "applog", { "onclick": "hide(this)" }))
            loadscss(logStyle, "log")

        }
        if (data === 'clear' || data === 'hide' || data === null || data === undefined || data === "") {
            var applog = document.getElementById("applog")
            console.clear()
            applog.innerHTML = "";
            applog.style.display = 'none';
        } else {

            var applog = document.getElementById("applog")
            console.log(data)
            try {
                applog.style.display = 'flex';
                try {
                    temp.id = ""
                    append(applog, [gen("div", '', data), gen("span", '', data.outerHTML, 'log', { "onclick": "remove(this)" })], pos)
                }
                catch {
                    var logno = `log-${document.querySelectorAll(".log").length + 1}`
                    append(applog, gen("span", logno, data, 'log'), pos)
                    append(`#${logno}`, gen(span, "", "", "cross", { "onclick": "hide(this.parentElement)" }))
                }
            }
            catch (err) {
                append(applog, data, pos)
            }
        }


    }
    catch (err) {
        console.log(`log(${data}, ${pos})`)
        console.error(err)
    }
}


