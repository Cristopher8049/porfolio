import router from "./services/router.js";
import LocalStorage from "./services/localStorage.js";
import LocalStorageBlog from "./services/localStorageBlog.js";

import ProjectStore from "./services/projectStore.js";
import BlogStore from "./services/blogStore.js";

import "./blocks/projects/projects.js";
import "./blocks/blog/blog.js";

window.app = {};
app.router = router;

window.addEventListener("DOMContentLoaded", async () => {
    const projectStore = ProjectStore.getInstance();
    projectStore.subscribe(LocalStorage.saveProjects);

    const blogStore = BlogStore.getInstance();
    blogStore.subscribe(LocalStorageBlog.savePosts);

    await LocalStorage.loadProjects();
    await LocalStorageBlog.loadPosts();

    app.router.init();
});