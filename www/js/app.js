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
        this.loadData();
        this.goTo(auth.isUser() ? "home" : "login");
        document.querySelector("app-router").init();
    },

    goTo(path) {
        window.location.href = "#/" + path;
    },

    prepareEnv() {
        if (window.cordova) {
            window.open = window.cordova.InAppBrowser.open;
        }
    },

    loadData() {
        api.get("/prateleiras/usuario/" + auth.getUser().id).then((prateleiras) => {
            storePrateleiras = prateleiras;
            document.querySelector("body").dispatchEvent(new CustomEvent("refreshedShelves", { detail: prateleiras }));
        });
    },

    atualizarComponentes(elementos) {
        // executa no próximo frame para garantir que o elemento já esteja no DOM
        setTimeout(() => { window.componentHandler.upgradeElements(elementos); }, 0);
    },

    logout() {
        auth.setUser(null);
        this.goTo("login");
    }

};

app.initialize();