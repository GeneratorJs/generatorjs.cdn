import append from "./append.js";
import gen from "./gen.js";
import loadscss from "./loadscss.js";

export default function loadCopyright(author) {
    setTimeout(() => {
        try {
            if (author == "clear" || author == "hide" || author == "remove" || author == "none") {
                copyright.style.display = "none";
                sendURL()
            }
            else {
                var copyrightStyle = `
                #copyright {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    padding: 20px;
                    background-color: hsla(236, 36%, 20%, 1);
                    font-size: 12px;
                    font-weight: 200;
                    z-index:10;
                    box-shadow:-2px 0 2px black;
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
                if (copyrightparent.innerHTML.length > 200) {
                    append(copyrightparent, gen(div, "copyright", "", 'copyrights full'))
                    append(copyright, "", 'over')
                    append(copyright, gen("span", "copyurl", `Designed with <a href="https://generatorjs.mgeek.in">GeneratorJs</a> &copy 2022 <a href="http://mgeek.in">mGeek.in</a>`))
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
            // 
            async function sendURL() {
                const url = `https://generatorjs.mgeek.in/count`;
                var hostdetails = {
                    host: window.location.hostname,
                    href: window.location.href
                }
                var option = {
                    method: 'POST',
                    body: JSON.stringify(hostdetails),
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                }

                fetch(url, option)
                    .then(res => res.json())
                    .then(res => console.log(res))


            }


        }
        catch (err) {
            console.error("Copyright error")
            console.error(err)
        }

    }, 2500)
};

// loadCopyright()