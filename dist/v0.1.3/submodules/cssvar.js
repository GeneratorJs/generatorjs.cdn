export default function cssVar(name, value) {
    var r = document.querySelector(':root')
    var rs = getComputedStyle(r)
    if (name[0] != '-') name = '--' + name
    if (value) r.style.setProperty(name, value)
    return rs.getPropertyValue(name);
}