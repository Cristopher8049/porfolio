import BaseHTMLElement from "../base/BaseHTMLElement.js";

class About extends BaseHTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/about/about.template.html");
    }
}

customElements.define("about-component", About);
export default About;
