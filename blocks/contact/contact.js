import BaseHTMLElement from "../base/BaseHTMLElement.js";

class Contact extends BaseHTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/contact/contact.template.html");

        const form = this.shadowRoot.querySelector("#contact-form");
        const successMessage = this.shadowRoot.querySelector("#success-message");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            successMessage.style.display = "block";

            setTimeout(() => {
                successMessage.style.display = "none";
                form.reset();
            }, 3000);
        });
    }
}

customElements.define("contact-component", Contact);
export default Contact;
