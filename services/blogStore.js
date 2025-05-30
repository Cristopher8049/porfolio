import { observerMixin } from "./observerMixin.js";

class BlogStore {
    #blogs = [];

    constructor() {
        if (BlogStore.instance) {
            throw new Error("There ir an intance");
        }
        this.init();
    }

    find(id) {
        return this.#blogs.find(project => project.id == id);
    }

    addLike(id) {
        const post = this.find(id);
        if (!post || post.liked) return;
        post.likes = Number(post.likes) + 1;
        post.liked = true;
        this.notify();
    }

    removeLike(id) {
        const post = this.find(id);
        if (!post || !post.liked) return;
        post.likes = Number(post.likes) - 1;
        post.liked = false;
        this.notify();
    }

    setPosts(list) {
        this.#blogs = list;
        this.notify();
    }

    addPost(post) {
        this.#blogs = [...this.#blogs, post];
        this.notify();
    }

    removePost(id) {
        this.#blogs = [...this.#blogs.filter(p => p.id !== id)];
        this.notify();
    }

    get allPosts() {
        return this.#blogs;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new BlogStore();
        }
        return this.instance;
    }
}

Object.assign(BlogStore.prototype, observerMixin);

export default BlogStore;