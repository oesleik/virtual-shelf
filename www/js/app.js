var app = {

    production: false,

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
        this.prepareEnv();

        this.goTo("splash");
        document.querySelector("app-router").init();
    },

    goTo(path) {
        window.location.href = "#/" + path;
    },

    prepareEnv() {
        if (this.production) {
            window.open = window.cordova.InAppBrowser.open;
        }
    },

    atualizarComponentes(elementos) {
        // executa no próximo frame para garantir que o elemento já esteja no DOM
        setTimeout(() => { window.componentHandler.upgradeElements(elementos); }, 0);
    }

};

app.initialize();