var app = {

    production: false,


    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        if (!this.production) {
            this.onDeviceReady();
        }
    },

    onDeviceReady: function() {
        // code
    },

};

app.initialize();