import router from "./services/router.js";
import './blocks/about/about.js';
import LocalStorage from "./services/localStorage.js";
import "./blocks/projects/projects.js"

window.app = {}
app.router = router

window.addEventListener("DOMContentLoaded", async () => {

    await LocalStorage.loadProjects();
    app.router.init()
}
)
