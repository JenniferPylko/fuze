//Creates a Promise from an ajax request
//Options is formatted as follows:
//{
//    url,
//    method,
//    body,
//    responseType,
//    mimeType,
//    timeout,
//    headers: [key, value]
//}

const ajax = (options) => new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    options.mimeType && xhr.overrideMimeType(options.mimeType)
    xhr.responseType = options.responseType || ""
    xhr.timeout = options.timeout || 0
    xhr.addEventListente("load", () => resolve(xhr))
    xhr.open(options.method, options.url)
    options.headers.entries().map(([k, v]) => xhr.setRequestHeader(k, v))
    xhr.send(options.body || null)
})

//The following functions force the method to a specific value
ajax.get = (options) => ajax(Object.assign(options, {method: "GET"}))

ajax.post = (options) => ajax(Object.assign(options, {method: "POST"}))

ajax.put = (options) => ajax(Object.assign(options, {method: "PUT"}))

ajax.delete = (options) => ajax(Object.assign(options, {method: "DELETE"}))


//The following functions do the same as above, but additionally forces the response to be JSON, as well as the body, if applicable
ajax.getJSON = (options) => ajax(Object.assign(options, {method: "GET", mimeType: "application/json", responseType: "json"}))

ajax.postJSON = (options) => ajax(Object.assign(options, {method: "POST", mimeType: "application/json", responseType: "json", headers: {"Content-Type": "application/json"}}))

ajax.putJSON = (options) => ajax(Object.assign(options, {method: "PUT", mimeType: "application/json", responseType: "json", headers: {"Content-Type": "application/json"}}))

ajax.deleteJSON = (options) => ajax(Object.assign(options, {method: "DELETE", mimeType: "application/json", responseType: "json"}))

module.exports = ajax
