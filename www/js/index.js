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
        // code
    },

};

app.initialize();