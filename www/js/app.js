var app = {

    production: false,
    router: null,

    initialize() {
        this.bindEvents();
    },

    bindEvents() {
        document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);

        if (!this.production) {
            document.dispatchEvent(new Event("deviceready"));
        }
    },

    onDeviceReady() {
        var router = document.querySelector("app-router");
        this.goTo("splash");
        router.init();
    },

    goTo(path) {
        window.location.href = "#/" + path;
    }

};

app.initialize();