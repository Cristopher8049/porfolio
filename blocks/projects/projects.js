import BaseHTMLElement from "../base/BaseHTMLElement.js";
import ProjectStore from "../../services/projectStore.js";
import LocalStorage from "../../services/localStorage.js";

class ProjectListComponent extends BaseHTMLElement {
    constructor() {
        super();
        this.store = ProjectStore.getInstance();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.store.subscribe(() => this.render());
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/projects/projects.template.html");

        this.grid = this.shadowRoot.querySelector(".projects__grid");

        await LocalStorage.loadProjects();
        this.render();
    }

    render() {
        if (!this.grid) return;

        const projects = this.store.allProjects;
        this.grid.innerHTML = "";

        projects.forEach((p) => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.dataset.id = p.id;
            card.innerHTML = `
        <img src="${p.image.src}" alt="${p.image.alt}" class="project-card__img" />
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.description}</p>
        <a href="${p.link}" class="project-card__link" target="_blank" rel="noopener noreferrer">View Project</a>
      `;

            this.grid.appendChild(card);
        });
    }
}

customElements.define("project-list", ProjectListComponent);
export default ProjectListComponent;
