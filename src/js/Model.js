/**
 * Used to communicate with a server's API routes and store data in an object.\
 * Format of route objects: {name, url, method}
 */
class Model {
    /**
     * Constructs a Model instance with the specified routes and fields
     * @param {Array} routes The list of routes to register to this model
     * @param {Array} fields The list of fields this model has
     */
    constructor(routes, fields) {
        this.fields = fields || []
        for (const route of routes) {
            this[route.name] = async (data, fetchOptions) => {
                const response = await fetch(route.url, Object.assign(fetchOptions, {method: route.method, body: Object.assign(this.toJSON(), data)}))
                const obj = await response.json()
                for (const field in obj) {
                    if (obj.hasOwnProperty(field)) {
                        this[field] = obj[field]
                    }
                }
                return response
            }
        }
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
}

module.exports = Model
