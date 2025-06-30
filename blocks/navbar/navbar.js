import BaseHTMLElement from "../base/BaseHTMLElement.js";

class NavbarComponent extends BaseHTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/navbar/navbar.template.html");

        // Lógica de menú hamburguesa
        const toggle = this.shadowRoot.querySelector("#nav-toggle");
        const menu = this.shadowRoot.querySelector("#nav-menu");

        toggle.addEventListener("click", () => {
            menu.classList.toggle("show-menu");
        });

        // Activar link actual (puede mejorarse con pathname)
        const links = this.shadowRoot.querySelectorAll(".nav__link");
        links.forEach((link) => {
            if (link.href === window.location.href) {
                link.classList.add("nav__link--active");
            }
        });
    }
}

customElements.define("navbar-component", NavbarComponent);
export default NavbarComponent;
