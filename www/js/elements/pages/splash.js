(function(pages, customElements, innerHTML, restyle, app, auth) {
	"use strict";

	pages.PageSplash = class extends pages.PageBlank {

		connectedCallback() {
			if (auth.isUser()) {
				setTimeout(() => {
					app.goTo("home");
				}, 1500);
			} else {
				app.goTo("login");
				return;
			}

			innerHTML(this, `
				<div class="container-logo">
					<img src="img/logo-login.png" />
					<br />
					Virtual Shelf
				</div>`
			);

			this.refStyle = restyle({
				"page-splash": {
					"position": "absolute",
					"top": 0,
					"right": 0,
					"bottom": 0,
					"left": 0
				},
				"page-splash .container-logo": {
					"textAlign": "center",
					"position": "absolute",
					"top": ["130px", "calc(50% - 150px)"],
					"right": 0,
					"left": 0,
					"fontSize": "28px",
					"fontWeight": "bold",
					"lineHeight": "1.5em",
					"color": "#333"
				}
			}, []);
		}

		disconnectedCallback() {
			this.refStyle.remove();
		}

	};

	customElements.define("page-splash", pages.PageSplash);

}( window.pages, window.customElements, window.innerHTML, window.restyle, window.app, window.auth ));