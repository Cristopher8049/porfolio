import BlogStore from "./blogStore.js";
import apiBlog from "./apiBlog.js";

const store = BlogStore.getInstance();

const LocalStorageBlog = {
    savePosts() {
        const data = JSON.stringify(store.allPosts);
        localStorage.setItem("blogPosts", data);
    },

    async loadPosts() {
        const raw = localStorage.getItem("blogPosts");
        let posts;
        let fromRemote = false;

        if (raw === null) {
            fromRemote = true;
            posts = await apiBlog.getPosts();
        } else {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                fromRemote = true;
                posts = await apiBlog.getPosts();
            } else {
                posts = parsed;
            }
        }

        store.setPosts(posts);
        if (fromRemote) this.savePosts();
    }
};

export default LocalStorageBlog;