import BlogStore from "../../services/blogStore.js";
import LocalStorageBlog from "../../services/localStorageBlog.js";

class BlogListComponent extends HTMLElement {
    constructor() {
        super();
        this.store = BlogStore.getInstance();
        this.store.subscribe(() => this.render());
    }

    async connectedCallback() {
        // Clona template desde el DOM
        const tmpl = document.getElementById('blog-template');
        if (!tmpl) {
            console.error('Template #blog-template not found');
            return;
        }
        const clone = tmpl.content.cloneNode(true);
        this.appendChild(clone);

        // Contenedor de posts
        this.grid = this.querySelector('.blog__grid');

        // Carga datos (LS o remoto) y renderiza
        await LocalStorageBlog.loadPosts();
        this.render();
    }

    render() {
        const posts = this.store.allPosts;
        this.grid.innerHTML = '';



        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'blog-post';
            article.dataset.id = post.id;

            article.innerHTML = `
        <img src="${post.image.src}" alt="${post.image.alt}" class="blog-post__image" />
        <div class="blog-post__content">
          <p class="blog-post__date">${post.date}</p>
          <h3 class="blog-post__title">${post.title}</h3>
          <p class="blog-post__excerpt">${post.excerpt}</p>
          <div class="blog-post__footer">
            <a href="${post.link}" class="blog-post__link">Read More</a>
            <div class="blog-post__like">
              <button class="blog-post__like-btn" aria-label="Like post">
               <i class='bx ${post.liked ? 'bxs-heart' : 'bx-heart'}'></i>
              </button>
              <span class="blog-post__like-count">${post.likes}</span>
            </div>
          </div>
        </div>
      `;

            // Toggle like/unlike con contador

            const likeBtn = article.querySelector('.blog-post__like-btn');
            likeBtn.addEventListener('click', () => {
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

customElements.define('blog-list', BlogListComponent);