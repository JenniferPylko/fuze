/**
 * Used to communicate with a server's API routes and store data in an object.
 * Format of route objects: {name, url, method}
 */
class Model extends EventTarget {
    /**
     * Constructs a Model instance with the specified routes and fields
     * @param {Array} routes The list of routes to register to this model
     * @param {Array} fields The list of fields this model has
     */
    constructor(routes, fields) {
        super()
        this.fields = []
        this.internalValues = {}
        this.events = []
        for (const route of routes) {
            this.addRoute(route)
        }
        for (const field of fields) {
            this.addField(field)
        }
    }

    /**
     * Defines a new route for the Model
     * @param {Object} route defines the route to create
     * @returns {void}
     */
    addRoute(route) {
        this[route.name] = async (data, fetchOptions) => {
            const response = await fetch(route.url, Object.assign(fetchOptions || {}, {method: route.method || "GET", body: Object.assign(this, data || {})}))
            const obj = await response.json()
            for (const field in obj) {
                if (obj.hasOwnProperty(field) && this.fields.includes(field)) {
                    this[field] = obj[field]
                }
            }
            this.dispatchEvent(new CustomEvent(route.name, {detail: response}))
            return response
        }
    }

    /**
     * Adds a new field to this Model
     * @param {String} field The name of the field
     * @returns {void}
     */
    addField(field) {
        this.fields.push(field)
        Object.defineProperty(this, field, {
            set [field](value) {
                this.internalValues[field] = value; this.dispatchEvent(new CustomEvent("update", {detail: {field, value}}))
            },
            get [field]() {
                return this.internalValues[field]
            }
        })
    }

    /**
     * Converts this model to a simple object
     * @returns {Object} This model as a simple object with only the fields specified in the constructor
     */
    toJSON() {
        const json = {}
        for (const field of this.fields) {
            json[field] = this[field]
        }
        return json
    }

    /**
     * Replaces this model's data with data from a json object
     * @param {Object} json The object to use as this model's data
     * @returns {void}
     */
    fromJSON(json) {
        for (const field of this.fields) {
            this.internalValues[field] = json[field]
        }
    }
}

module.exports = Model
