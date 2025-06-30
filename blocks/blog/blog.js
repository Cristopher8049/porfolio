import BaseHTMLElement from "../base/BaseHTMLElement.js";
import BlogStore from "../../services/blogStore.js";
import LocalStorageBlog from "../../services/localStorageBlog.js";

class BlogListComponent extends BaseHTMLElement {
    constructor() {
        super();
        this.store = BlogStore.getInstance();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.store.subscribe(() => this.render());
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/blog/blog.template.html");

        this.grid = this.shadowRoot.querySelector(".blog__grid");

        await LocalStorageBlog.loadPosts();
        this.render();
    }

    render() {
        if (!this.grid) return;

        const posts = this.store.allPosts;
        this.grid.innerHTML = "";

        posts.forEach((post) => {
            const article = document.createElement("article");
            article.className = "blog-post";
            article.dataset.id = post.id;

            article.innerHTML = `
        <img src="${post.image.src}" alt="${post.image.alt}" class="blog-post__image" />
        <div class="blog-post__content">
          <p class="blog-post__date">${post.date}</p>
          <h3 class="blog-post__title">${post.title}</h3>
          <p class="blog-post__excerpt">${post.excerpt}</p>
          <div class="blog-post__footer">
            <a href="${post.link}" class="blog-post__link" target="_blank" rel="noopener noreferrer">Read More</a>
            <div class="blog-post__like">
              <button class="blog-post__like-btn" aria-label="Like post">
                <i class='bx ${post.liked ? "bxs-heart" : "bx-heart"}'></i>
              </button>
              <span class="blog-post__like-count">${post.likes}</span>
            </div>
          </div>
        </div>
      `;

            const likeBtn = article.querySelector(".blog-post__like-btn");
            likeBtn.addEventListener("click", () => {
                if (post.liked) {
                    this.store.removeLike(post.id);
                } else {
                    this.store.addLike(post.id);
                }
            });

            this.grid.appendChild(article);
        });
    }
}

customElements.define("blog-list", BlogListComponent);
export default BlogListComponent;
