import ProjectStore from "./projectStore.js";
import apiProject from "./apiProject.js";

const store = ProjectStore.getInstance();

const LocalStorage = {
    saveProjects() {
        const data = JSON.stringify(store.allProjects);
        localStorage.setItem("projects", data);
    },

    async loadProjects() {
        const raw = localStorage.getItem("projects");
        let projects;
        let fromRemote = false;

        if (raw === null) {
            fromRemote = true;
            projects = await apiProject.getProjects();
        } else {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                fromRemote = true;
                projects = await apiProject.getProjects();
            } else {
                projects = parsed;
            }
        }

        store.setProjects(projects);
        if (fromRemote) this.saveProjects();

    }
};


export default LocalStorage;