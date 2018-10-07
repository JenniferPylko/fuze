/**
 * Used to retrieve from and save collections to a server.
 */
class Collection extends Array {
    /**
     * Constructs a Collection instance with the specified model, fetch route, and save route
     * @param {Object} ModelClass The class of this collection's models. Should extend Fuze Model.
     * @param {Object} fetchRoute The route to fetch from. In the format {url, options}
     * @param {Object} saveRoute The route to save to. In the format {url, options}
     */
    constructor(ModelClass, fetchRoute, saveRoute) {
        super()
        if (fetchRoute) {
            this.fetch = async (fetchOptions) => {
                const response = await fetch(fetchRoute.url, Object.assign({method: "GET"}, Object.assign(fetchOptions || {}, fetchRoute.options || {})))
                const obj = await response.json()
                this.length = obj.length
                for (let i = 0; i < obj.length; ++i) {
                    const model = new ModelClass()
                    model.fromJSON(obj[i])
                    this[i] = model
                }
                this.dispatchEvent(new CustomEvent("fetch", {detail: response}))
                return response
            }
        }
        if (saveRoute) {
            this.save = async (fetchOptions) => {
                const response = await fetch(fetchRoute.url, Object.assign({method: "POST", body: this}, Object.assign(fetchOptions || {}, fetchRoute.options || {})))
                this.dispatchEvent(new CustomEvent("save", {detail: response}))
                return response
            }
        }
    }
}

module.exports = Collection
