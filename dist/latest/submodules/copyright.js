import append from "./append.js";
import gen from "./gen.js";
import loadscss from "./loadscss.js";
var { default: registerhost } = await import("./registerhost.js")

export default function loadCopyright(author) {
    setTimeout(() => {
        try {
            if (author == "clear" || author == "hide" || author == "remove" || author == "none") {
                copyright.style.display = "none";
                registerhost()
            }
            else {
                var copyrightStyle = `
                #copyright {
                    opacity:.5;
                    box-sizing:border-box;
                    position:relative;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    padding: 20px;
                    background-color: hsla(236, 38%, 15%, 1);
                    color:white;
                    font-size: 12px;
                    font-weight: 200;
                    font-family:"Verdana","Helvetica","Courier New","Arial";
                    z-index:100;
                    box-shadow:-2px 0 2px black;
                    width:100%;
                    &:hover{
                        opacity:1;
                    }

                    p {
                        padding-left: 10px;
                        margin-left: 20px;
                        padding-right: 10px;
                        margin-right: 20px;
                    }
                    a {
                        color: aqua;
                    }
                }
                `
                loadscss(copyrightStyle, "copyright")


                var copyrightparent = document.querySelectorAll("#copyright,.copyright,footer,#footer,.footer")[0]
                // console.info(copyrightparent)
                if (copyrightparent.innerHTML.length > 200) {
                    append(copyrightparent, gen(div, "copyright", "", 'copyrights'), "after")
                    append(copyright, "", 'over')
                    let d = new Date();
                    let year = d.getFullYear();
                    append(copyright, gen("span", "copyurl", `Designed with <a href="https://generatorjs.mgeek.in">GeneratorJs</a> &copy ${year} <a href="http://mgeek.in">mGeek.in</a>`))
                    if (author == undefined) {
                        append(copyright, gen("span", "copyauthor", "Designed by "))
                        append(copyauthor, gen("a", "copyrightauthor", "Dr. Prateek Raj Gautam", "", "https://webmaster.mgeek.in/"))
                    }
                    else {
                        append(copyright, author)

                    }
                }
                else (setTimeout(loadCopyright(), 1000 * 60 * 5))
            }

        }
        catch (err) {
            console.error("Copyright error")
            console.error(err)
        }

    }, 2500)
};

loadCopyright()
window.loadCopyright = loadCopyright