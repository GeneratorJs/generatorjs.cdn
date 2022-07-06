export default async function registerhost(timeout = 1000 * 60 * 10) {
    setTimeout(() => {
        try {
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
            console.info('domain registered')
        }
        catch (err) { }
    }, timeout)
}