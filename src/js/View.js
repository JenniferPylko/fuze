/**
 * Handles interacting with sections of the DOM by creating a virtual element
 */
class View extends HTMLElement {
    /**
     * Creates the View
     * @param {Object} This View's template, shadowTemplate (if applicable), vars to pass into the template, and whether or not to render when constructed (defaults to true)
     */
    constructor({template = () => "", shadowTemplate, templateVars = {}, render = true}) {
        super()
        this.template = template
        this.shadowTemplate = shadowTemplate
        this.templateVars = templateVars
        this.shadowTemplate && this.attachShadow({mode: "open"})
        render && this.render()
    }

    /**
     * Renders HTML inside this view
     * @param {Object} vars Variables to pass into the template
     * @returns {void}
     */
    async render(vars) {
        this.innerHTML = this.template(Object.assign(Object.assign(this.templateVars, vars), {attributes: this.attributes}))
        this.shadowRoot && (this.shadowRoot.innerHTML = this.shadowTemplate(Object.assign(Object.assign(this.templateVars, vars), {attributes: this.attributes})))
        this.dispatchEvent(new CustomEvent("render"))
    }

    /**
     * Registers the view with the custom element registry
     * @param {String} tagName The name of the HTML tag to register. Follows the rules of custom element names
     * @param {Object} view The class of the View to register
     * @returns {void}
     */
    static RegisterView(tagName, view) {
        customElements.define(tagName, view)
    }
}

module.exports = View
