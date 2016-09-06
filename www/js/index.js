var app = {

    production: false,

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        if (!this.production) {
            setTimeout(this.onDeviceReady, 0);
        }
    },

    onDeviceReady: function() {
        // OAuth.initialize('ldh8aAt-ZnZprccwh7ZdtAGTJQw');
    },

    authenticate: function() {
        OAuth.popup('google')
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
        access_token: 'jsdkfjk',
        expires_in: 3600,
        id_token: 'jfkdsjfk',
        provider: 'google',
        token_type: 'Bearer'
        */

        /*
        avatar: 'https://jksdjfkd',
        email: 'fjsdkfj@jfkd',
        firstname: 'jfkds',
        gender: 1,
        id: 234235423423,
        lastname: 'jkjk',
        name: 'jkjfdksfj sdjfkjsd',
        url: 'https:/jskdf'
        */
    },

};

app.initialize();