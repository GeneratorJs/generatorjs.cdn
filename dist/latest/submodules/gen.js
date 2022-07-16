
//eel.expose(gen)
import jsonToElement from "./jsontoelement.js"; export { jsonToElement }; window.jsonToElement = jsonToElement

export default function gen(elementtype, idin, htmlin, classin, src, event) {
    try {
        if (htmlin != undefined) {
            // console.log(htmlin.isArray)
            if (Array.isArray(htmlin) != true) {
                var element = document.createElement(elementtype);
                if (idin != undefined && idin != "") {
                    element.id = idin;
                }
                if (htmlin.nodeName === undefined) {
                    // console.log(typeof (htmlin))
                    if (typeof (htmlin) != "object") {
                        if (elementtype == 'code' || elementtype == 'pre') {
                            element.innerText = htmlin;
                        } else if (elementtype == 'input') {
                            element.value = htmlin;
                        } else if (elementtype == 'img') {
                            element.alt = htmlin;
                        }
                        else {
                            element.innerHTML = htmlin;
                        }
                    }
                    if (typeof (htmlin) == "object") {
                        element.innerHTML = htmlin;
                        if (elementtype == 'input') element.value = htmlin;
                        if (elementtype == 'img') element.alt = htmlin;
                    }
                };
                if (htmlin.nodeName != undefined) {
                    element.append(htmlin);
                };
                if (classin != undefined && classin != "") {
                    // element.classList.add(classin);
                    element.classList += classin.replaceAll(',', ' ').replaceAll(', ', ' ');
                }
            }
            //generate multiple element if array
            if (Array.isArray(htmlin) == true) {
                // console.log(htmlin)
                // var element = [];

                var element = document.createElement("div")
                let arrayholder = document.createElement("div", "arrayholder", "")
                // console.log(htmlin.length)
                var checkfirstinput = htmlin[0]

                for (var jj = 0; jj < htmlin.length; jj++) {

                    //if not object 
                    if (typeof checkfirstinput != 'object') {
                        var elementarray = document.createElement(elementtype);
                        if (idin != undefined && idin != "") {
                            elementarray.id = `${idin}-${jj}`;
                        }

                        //Array of html elements
                        if (htmlin[jj].nodeName === undefined) {
                            // console.log(typeof (htmlin))
                            if (typeof (htmlin) != "object") {
                                elementarray.innerHTML = htmlin[jj];
                                if (elementtype == 'input') elementarray.value = htmlin[jj];
                                if (elementtype == 'img') element.alt = htmlin[jj];
                            }
                            if (typeof (htmlin) == "object") {
                                elementarray.innerHTML = htmlin[jj];
                                if (elementtype == 'input') elementarray.value = htmlin[jj];
                                if (elementtype == 'img') element.alt = htmlin[jj];
                            }
                        };
                        //Array of strings non html
                        if (htmlin[jj].nodeName != undefined) {
                            elementarray.append(htmlin[jj]);
                            // console.log(htmlin);
                            // console.log(htmlin.nodeName);
                        };
                        if (classin != undefined && classin != "") {
                            // element.classList.add(classin);
                            elementarray.classList += classin.replaceAll(',', ' ').replaceAll(', ', ' ');
                        }
                    }

                    // if object
                    if (typeof checkfirstinput == 'object') {
                        // elementarray = objtohtml(htmlin[jj])
                        elementarray = jsonToElement(htmlin[jj])
                        var elementtypeholder = document.createElement(elementtype)
                        elementtypeholder.append(elementarray)
                        elementarray = elementtypeholder
                    }
                    arrayholder.innerHTML += elementarray.outerHTML

                }
                element = arrayholder.innerHTML
                // console.log(element)
            }


        }

        if (htmlin == undefined) {
            var element = document.createElement(elementtype);
            if (idin != undefined && idin != "") {
                element.id = idin;
            }
            if (classin != undefined && classin != "") {
                // element.classList.add(classin);
                element.classList += classin.replaceAll(',', ' ').replaceAll(', ', ' ');
            }
        }
        // var src = { "id": "testid" }
        if (src != undefined) {
            if (src instanceof Object == true) {
                var objArray = Object.entries(src);
                objArray.forEach(A1 => {
                    element.setAttribute(A1[0], A1[1])
                })

            }
            else if (src instanceof Object == false) {
                if (elementtype == 'a') { element.href = src } else { element.src = src }
            }
        }


        return element;

    }
    catch (err) {
        console.error("Error during gen(", elementtype, idin, htmlin, classin, src, ")", err
        )
    }
};
