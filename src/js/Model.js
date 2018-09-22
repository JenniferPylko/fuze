/**
 * Used to communicate with a server's API routes and store data in an object.\
 * Format of route objects: {name, url, method}
 */
class Model {
	constructor(routes, fields) {
		this.fields = fields || []
		for (let route of routes) {
			this[route.name] = async (data, fetchOptions) => {
				let response = await fetch(route.url, Object.assign(fetchOptions, {method: route.method, body: Object.assign(this.toJSON(), data)}))
				let obj = await response.json()
				for (let field in obj) {
					if (obj.hasOwnProperty(field)) {
						this[field] = obj[field]
					}
				}
				return response
			}
		}
	}
	toJSON() {
		let json = {}
		for (let field of this.fields) {
			json[field] = this[field]
		}
		return json
	}
}

module.exports = Model
