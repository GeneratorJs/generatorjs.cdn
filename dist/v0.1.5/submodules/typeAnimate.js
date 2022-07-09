export default async function typeAnimate(elemid, textstr, delay = 50, start = 0) {
    var state = "typing"
    var elem = document.getElementById(elemid);
    if (elem == null) elem = elemid
    var cursor = gen(span, 'cursor', '', 'cursor');
    if (start < textstr.length) {
        start = start + 1;
        elem.innerHTML = textstr.slice(0, start);
        elem.appendChild(cursor);
        setTimeout(typeAnimate, delay, elemid, textstr, delay, start);
        if (start == textstr.length) {
            state = 'typed';
            cursor.remove();
            cursor.style.display = 'none'
            // console.log(state);
            return state;
        }
    }


    // console.log(state);
    // return state;
}