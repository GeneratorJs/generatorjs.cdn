function parsemdtemp(...args) {
    var testpatterns = [
        {
            name: "heading",
            regex: /^#+ (.*)/gmi,
            type: "block",
            title: "h1"
        },
    ]


    function tokenize(text) {
        var tokens = []
        for (var i = 0; i < testpatterns.length; i++) {
            var pattern = testpatterns[i]
            var match = text.matchAll(pattern.regex);
            
                var token = {
                    type: pattern.type,
                    title: pattern.title,
                    content: match
                }

            tokens.push(token)
            
        }
        return tokens
    }


var inputMd = args[0]


// var mdLines = inputMd.split("\n").filter(function (el) {  // Remove empty lines
//     return el != "";
// });


var mdLines = inputMd.split(/\n+/g)
var tokens = []

mdLines.forEach(function (line, index) {
    var token = tokenize(line)
    if (token.length > 0) {
        tokens.push(token)
    }


})

console.log(tokens)

// if (args.length > 1) {
//     var cb = args[1]
//     cb(tokens)
// }









return tokens



}

export { parsemdtemp }