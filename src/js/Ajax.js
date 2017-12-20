const Ajax = function(options) {
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest()
        options.mimeType && xhr.overrideMimeType(options.mimeType)
        xhr.responseType = options.responseType || ""
        xhr.timeout = options.timeout || 0
        xhr.addEventListente("load", () => resolve(xhr))
        xhr.open(options.method, options.url)
        options.headers.entries().map(([k, v]) => xhr.setRequestHeader(k, v))
        xhr.send(options.body || null)
    })
}

Ajax.Get = function(options) => {
    return Ajax(Object.assign(options, {method: "GET"}))
}

Ajax.Post = function(options) => {
    return Ajax(Object.assign(options, {method: "POST"}))
}

Ajax.Put = function(options) => {
    return Ajax(Object.assign(options, {method: "PUT"}))
}

Ajax.Delete = function(options) => {
    return Ajax(Object.assign(options, {method: "DELETE"}))
}

Ajax.GetJSON = function(options) => {
    return Ajax(Object.assign(options, {method: "GET", mimeType: "application/json", responseType: "json"}))
}

Ajax.PostJSON = function(options) => {
    return Ajax(Object.assign(options, {method: "POST", mimeType: "application/json", responseType: "json"}))
}

Ajax.PutJSON = function(options) => {
    return Ajax(Object.assign(options, {method: "PUT", mimeType: "application/json", responseType: "json"}))
}

Ajax.DeleteJSON = function(options) => {
    return Ajax(Object.assign(options, {method: "DELETE", mimeType: "application/json", responseType: "json"}))
}

module.exports = Ajax
