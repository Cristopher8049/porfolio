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

    }

};

export default router;