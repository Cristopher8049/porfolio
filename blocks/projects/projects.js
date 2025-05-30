import ProjectStore from "../../services/projectStore.js";
import LocalStorage from "../../services/localStorage.js";

class ProjectListComponent extends HTMLElement {
    constructor() {
        super();
        this.store = ProjectStore.getInstance();
        this.store.subscribe(() => this.render());
    }

    async connectedCallback() {
        const tmpl = document.getElementById('projects-template');
        if (!tmpl) {
            console.error('Template #projects-template no encontrado en el documento.');
            return;
        }
        const clone = tmpl.content.cloneNode(true);
        this.appendChild(clone);

        this.grid = this.querySelector('.projects__grid');

        await LocalStorage.loadProjects();
        this.render();
    }

    render() {
        const projects = this.store.allProjects;
        this.grid.innerHTML = '';

        projects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.id = p.id;
            card.innerHTML = `
        <img src="${p.image.src}" alt="${p.image.alt}" class="project-card__img" />
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.description}</p>
        <a href="${p.link}" class="project-card__link">View Project</a>
      `;
            this.grid.appendChild(card);
        });
    }
}

customElements.define('project-list', ProjectListComponent);
