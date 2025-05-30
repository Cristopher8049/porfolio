import { observerMixin } from "./observerMixin.js";

class ProjectStore {
    #projects = [];

    constructor() {
        if (ProjectStore.instance) {
            throw new Error("There is an instance")
        }
        this.init();
    }

    addLike(id) {
        const project = this.find(id);
        project.likes = Number(project.likes) + 1;
        project.like = "true";
        this.notify();
    }

    removeLike(id) {
        const project = this.find(id);
        project.likes = Number(project.likes) - 1;
        project.like = "false";

        this.notify();
    }

    setProjects(list) {
        this.#projects = list;
        this.notify();
    }

    addProject(proj) {
        this.#projects = [...this.#projects, proj];
        this.notify();
    }

    removeProject(id) {
        this.#projects = this.#projects.filter(p => p.id !== id);
        this.notify();
    }

    get allProjects() {
        return this.#projects;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectStore();
        }
        return this.instance;
    }
}

Object.assign(ProjectStore.prototype, observerMixin)



export default ProjectStore;