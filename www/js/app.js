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

        if (auth.isUser()) {
            this.carregarPrateleiras();
            this.goTo("pesquisar-livros");
        } else {
            this.goTo("login");
        }

        document.querySelector("app-router").init();
    },

    goTo(path) {
        window.location.href = "#/" + path;
    },

    prepareEnv() {
        if (window.cordova) {
            window.open = window.cordova.InAppBrowser.open;
            api.baseUrl = "http://192.168.3.65/~oeslei.250995/virtual-shelf/public_html/api/v1";
        }
    },

    carregarPrateleiras() {
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