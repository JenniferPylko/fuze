/**
 * Connects a view and a model in order to listen to events
 */
class Controller {
    /**
     * Attaches to the specified view and model
     * @param {Object} params Object containing the view and model to attach, in the format of {view, model}
     */
    constructor({view, model}) {
        this.view = view
        this.model = model
    }

    /**
     * Adds an event listener to the view
     * @param {Object} params {event, selector, callback, options}
     * @return {void}
     */
    addEventListener({event, selector, callback, options}) {
        this.view.addEventListener(event, (e) => {
            if (!selector || e.target.matches(selector)) {
                return callback(e)
            }
        }, options || {})
    }

    /**
     * Adds an event listener to the view's shadowRoot
     * @param {object} params {event, selector, callback, options{
     * @return {void}
     */
    addShadowEventListener({event, selector, callback, options}) {
        this.view.shadowRoot.addEventListener(event, (e) => {
            if (!selector || e.target.matches(selector)) {
                return callback(e)
            }
        }, options || {})
    }

    /**
     *  Adds an event listener to the model
     * @param {Object} params {event, callback, options}
     * @return {void}
     */
    addModelEventListener({event, callback, options}) {
        this.model.addEventListener(event, callback, options || {})
    }
}

module.exports = Controller
