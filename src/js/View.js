class View {
    constructor(tag = "span") {
        this.el = document.createElement(tag)
    }
    render(targetElement) {
        targetElement.appendChild(this.el)
    }
}

module.exports = View
