import BaseHTMLElement from "../base/BaseHTMLElement.js";

class Hero extends BaseHTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/hero/hero.template.html");
    }
}

customElements.define("hero-component", Hero);
export default Hero;
