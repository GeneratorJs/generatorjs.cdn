var copyIconStyle = `
.copy{
--h:var(--hue,0);
--s:var(--sat,80%);
--l:var(--light,15%);
    display: flex;
    position: relative;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: hsla(0, var(--s), calc(var(--l) * var(--lightFactor,1)), .2);
    border: 1px solid hsla(var(--h), var(--s), calc(var(--l) / var(--lightFactor)), 1);
    padding: 1em 2em;
    margin: 1em;
    border-radius: 1em;
    resize: both;
    max-width: 70em;
    font-family: "Courier", "Courier New", "Lucida Console", Inconsolata, terminal,consolas,arial;
    font-size: .8em;
    hyphens: auto;
    word-wrap: break-word;
    word-break: break-all;
    box-shadow:1px 1px 3px  hsla(var(--h), var(--s), calc(calc(100% - var(--l)) * var(--lightFactor,1)), .2);

    .copyIcon{
        position: absolute;
        top: 5px;
        right: 5px;
        passing:2px;
        border-radius:2px;
        user-select: none;
        color:white;
        cursor:pointer;
        :hover{
            background:grey;
            // color:aqua;
        }
    }
    .active.copyIcon{
        color:hsl(150,80%,70%);
    }
}


<span class="material-symbols-outlined">
content_copy
</span>
`

var googleIconUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`

export default function addCopyIcon(element = undefined) {
    try {
        loadscss(copyIconStyle, "copyIconStyle")
        loadcss(googleIconUrl)
        setTimeout(() => {
            console.info("addCopyIcon")
            if (element != undefined) {
                var codeblocks = []
                codeblocks[0] = element
            }
            else if (element == undefined) {

                var codeblocks = document.querySelectorAll('code,.code,pre,.pre,.copy')
            }
            if (codeblocks.length != 0) {



                codeblocks.forEach(c => {
                    // console.log(c)
                    c.classList.add("copy")

                    // c.addEventListener('click', e => {
                    //     // console.log(e)
                    //     var copyText = e.target.innerText.replaceAll("content_copy", "")
                    //     // console.log(copyText)
                    //     navigator.clipboard.writeText(copyText)

                    // })

                    c.append(gen(span, "", "content_copy", "material-symbols-outlined copyIcon", { "title": "click to copy", "onclick": "copyParentText(this.parentElement)" }))
                })


            }
        }, 2000)
    }
    catch (err) {
        console.error(err)
    }

}

function copyParentText(target) {
    try {
        var copyText = target.innerText
        navigator.clipboard.writeText(copyText.replaceAll(" content_copy", "").replaceAll("content_copy", ""))

        var copyIcon = target.querySelectorAll(".copyIcon")[0]
        copyIcon.classList.add("active")
        setTimeout(() => { copyIcon.classList.remove("active") }, 1500)
    }
    catch (e) { console.error(e) }
}

window.copyParentText = copyParentText
// addCopyIcon()