document.addEventListener('DOMContentLoaded', () => {
    class Router {
        routes = [];
        mode = null;
        root = "/";

        constructor(options) {
            this.mode = window.history.pushState ? "history" : "hash";
            if (options.mode) this.mode = options.mode;
            if (options.root) this.root = options.root;
        }
    }
    console.log(window.history)
});

export default Router;