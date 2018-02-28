/**
 * Handles interacting with sections of the DOM by creating a virtual element
 */
class View {
    /**
     * Creates the View
     * @param {String} tag The name of the HTML tag to create
     */
    constructor(tag = "span") {
        this.el = document.createElement(tag)
    }

    /**
     * Renders into the target element
     * @param {HTMLElement} targetElement the element to append this View's element to
     * @returns {void}
     */
    render(targetElement) {
        targetElement.appendChild(this.el)
    }
}

module.exports = View
