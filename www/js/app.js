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
        this.goTo("login");
        router.init();
    },

    goTo(path) {
        window.location.href = "#/" + path;
    },

    authenticate() {
        OAuth.popup("google")
            .then(function(result) {
                console.info(result);

                result.me()
                    .then(function(result) {
                        console.log(result);
                    });
            }, function(error) {
                console.error(error);
            });

        /*
        access_token: "jsdkfjk",
        expires_in: 3600,
        id_token: "jfkdsjfk",
        provider: "google",
        token_type: "Bearer"
        */

        /*
        avatar: "https://jksdjfkd",
        email: "fjsdkfj@jfkd",
        firstname: "jfkds",
        gender: 1,
        id: 234235423423,
        lastname: "jkjk",
        name: "jkjfdksfj sdjfkjsd",
        url: "https:/jskdf"
        */
    },

};

app.initialize();