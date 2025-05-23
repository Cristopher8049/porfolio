import router from "./services/router.js";

window.app = {}
app.router = router

window.addEventListener("DOMContentLoaded", () => {
    app.router.init()
}
)
