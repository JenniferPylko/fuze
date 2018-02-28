const template = function(strings, vars) {
    return strings[0] + vars.map((v) => {
        switch (typeof v) {
        case "function":
            return v()
        case "undefined":
            return "undefined"
        case "object":
            return Array.isArray(v) ? v.join("") : (v.toString ? v.toString() : (v.toJSON ? v.toJSON() : JSON.stringify(v)))
        default:
            return v
        }
    })
}

module.exports = template
