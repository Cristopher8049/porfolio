const router = {
    init: () => {
        document.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const href = e.target.getAttribute("href");
                if (href) {
                    router.nav(href);
                }
            });
        });

        window.addEventListener("popstate", () => {
            router.nav(e.state.route, false);
        })
    },

    nav: (route, addToHistory = true) => {
        if (addToHistory) {
            history.pushState({ route }, "", route);
        }

        switch (route) {
            case "/":
                document.querySelector("#app").innerHTML = "<h1>Home</h1>";
                break;
            case "/about":
                document.querySelector("#app").innerHTML = "<h1>About</h1>";
                break;
            case "/projects":
                document.querySelector("#app").innerHTML = "<h1>Projects</h1>";
                break;
            case "/contact":
                document.querySelector("#app").innerHTML = "<h1>Contact</h1>";
                break;
            case "/blog":
                document.querySelector("#app").innerHTML = "<h1>Blog</h1>";
                break;
            default:
                document.querySelector("#app").innerHTML = "<h1>404 Not Found</h1>";
        }

    }

};

export default router;