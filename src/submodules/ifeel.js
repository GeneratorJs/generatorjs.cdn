export default async function js(inputstr) {
    try {
        eval(inputstr)
    }
    catch (err) {
        console.log(inputstr); console.error(err)
    }
}