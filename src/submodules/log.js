import gen from "./gen.js"
import append from "./append.js"
import loadscss from "./loadscss.js"
var logStyle = `
#applog {

    position:relative;
    font-size:.8rem;
    // display: flex;
    display: none;
    width:clamp(400px,50vh,80vh);
    flex-direction: column;
    position: fixed;
    right:20px;
    top:20px;
    z-index: 1000;
    padding: .5em 1em;
    border-radius: 5px;
    color: #fff;
    background-color: hsla(328, 88%, 64%, 1);
    box-shadow:2px 2px 5px black;
    resize: both;
    overflow:auto;
    max-height:90vh;
    max-width:90vw;
    min-height:3em;
    font-family: "Courier", "Courier New", "Lucida Console", Inconsolata, terminal,consolas,arial;
    word-spacing: 1em;
    user-select:none;

    

    >.log{
        user-select:text;
        position:relative;
        font-size:14px;
        font-family:"arial";
        padding: .5em 1em;
        background-color: hsla(239, 40%, 42%, 1);
        margin:.5em;
        box-shadow:1px 1px 2px black;
        border-radius: 5px;

        color: #fff;
        
    }
    .cross {
        user-select:none;
        cursor:pointer;
        position:absolute;
        top: 0px;
        right: 0px;
        &:hover{
            color:red;
        }
        
    }
       
    


}


`



export default function log(data = '', pos = "before") {
    try {
        var applog = document.getElementById("applog")
        if (applog == null || applog == undefined) {
            // document.getElementById("app").append(gen(div, "applog", "", "applog,applog"))
            append(app, gen("div", "applog", gen(span, "", "close", "cross material-symbols-outlined", { "onclick": "hide(this.parentElement)" }), "applog"))

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
                var datastring = verb(data)
            }
            catch (e) {
                datastring = data
            }
            data = datastring
            try {
                applog.style.display = 'flex';
                try {
                    temp.id = ""
                    append(applog, [gen("div", '', data), gen("span", '', data.outerHTML, 'log', { "onclick": "remove(this)" })], pos)
                }
                catch {
                    var logno = `log-${document.querySelectorAll(".log").length + 1}`
                    append(applog, gen("span", logno, data, 'log'), pos)
                    append(`#${logno}`, gen(span, "", "close", "cross material-symbols-outlined", { "onclick": "hide(this.parentElement)" }))
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


