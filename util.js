function getURLWithoutParameters() {
    return window.location.protocol + "//" + window.location.host + window.location.pathname;
}

function getURL() {
    return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
}

function getURLParam(param) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == param) {
            return pair[1];
        }
    }
    return (false);
}

function getElementsInHtmlString(htmlString, query) {
    var dom = createDocument(htmlString);
    // return a collection of elements that match the query
    return dom.querySelectorAll(query);
}

function createDocument(html) {
    var dom = document.implementation.createHTMLDocument("New Page");
    dom.documentElement.innerHTML = html;
    return dom;
}



