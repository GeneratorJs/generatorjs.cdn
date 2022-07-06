export default async function loadBasicHtmlVariables() {
    var listOfBasicHtmlTags = "div,p,span,b,i,img,video,picture,canvas,svg,audio,h1,h2,h3,h4,h5,h6,table,thead,tbody,tr,td,ul,li,ol,a,textarea,input,output,select,option,checkbox,radio,button,embed,object,iframe,kbd,code,dl,dt,dd,meta,pre,form,fieldset,legend,label,section,main,aside,header,footer,nav,meta,head,body,dialog,details,summary,figure,figcaption,sidebar,style,script,del,ins,wbr,mark,time";
    var list = listOfBasicHtmlTags.replaceAll(' ', ',').replaceAll(',,', ',')
    let start = 0;
    let end = list.length
    let comaAt = []
    for (let i = 0; i < list.length; i++) {
        if (list[i] == ',') comaAt[comaAt.length] = i
    }
    if (comaAt.length == 0) eval(eval(`const ${list}='${list}';`))
    if (comaAt.length > 0) {
        comaAt[comaAt.length] = end
        for (let i = 0; i < comaAt.length; i++) {
            var tag = list.slice(start, comaAt[i])
            start = comaAt[i] + 1
            if (tag.length > 0) {
                let expression = `window.${tag} = '${tag}'`
                window.eval(expression)
            }
        }
    }
}
loadBasicHtmlVariables()