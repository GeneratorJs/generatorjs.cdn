export default function addCopyIcon(element = undefined) {
    try {
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

                    c.addEventListener('click', e => {
                        // console.log(e)
                        var copyText = e.target.innerText
                        // console.log(copyText)
                        navigator.clipboard.writeText(copyText)

                    })
                })
            }
        }, 2000)
    }
    catch (err) {
        console.error(err)
    }

}

// addCopyIcon()