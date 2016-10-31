(function(pages, customElements, innerHTML, restyle, OAuth, api) {
	"use strict";

	pages.PageLogin = class extends pages.PageBlank {

		connectedCallback() {
			innerHTML(this, `
				<div class="container-logo">
					<img src="img/logo-login.png" />
					<br />
					Virtual Shelf
				</div>
				<div class="container-acoes">
					Entrar com
					<div class="acoes">
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" style="background-color: #F44336;">Google+</button>
						<br />
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" style="background-color: #01579B;">Facebook</button>
						<br />
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" style="background-color: #03A9F4;">Twitter</button>
					</div>
				</div>`
			);

			this.querySelector("button").addEventListener("click", this.efetuarLogin.bind(this, "google"), false);

			this.refStyle = restyle({
				"page-login": {
					"position": "absolute",
					"top": 0,
					"right": 0,
					"bottom": 0,
					"left": 0
				},
				"page-login .container-logo": {
					"textAlign": "center",
					"position": "absolute",
					"top": ["130px", "calc(50% - 150px)"],
					"right": 0,
					"left": 0,
					"fontSize": "28px",
					"fontWeight": "bold",
					"lineHeight": "1.5em",
					"color": "#333"
				},
				"page-login .container-acoes": {
					"width": "100%",
					"height": "200px",
					"textAlign": "center",
					"position": "absolute",
					"right": 0,
					"bottom": 0,
					"left": 0
				},
				"page-login button": {
					"margin": "5px 0 !important",
					"width": "100%",
					"max-width": "180px",
					"fontWeight": "bold !important",
					"textTransform": "initial !important"
				}
			}, []);

			componentHandler.upgradeElements(this.querySelectorAll("button"));
		}

		disconnectedCallback() {
			this.refStyle.remove();
		}

		efetuarLogin(provider) {
			OAuth.initialize("ldh8aAt-ZnZprccwh7ZdtAGTJQw");

			OAuth.popup(provider)
				.then(function(result) {
					// console.info(result);

					result.me()
						.then(function(result) {
							// console.log(result);

							api.get("/perfis-sociais/" + provider + "/" + result.id)
								.then(function() {
									// console.log("Usuário encontrado");
								}, function() {
									// console.warn("Usuário não encontrado");
								});
						});
				}, function(error) {
					// console.warn(error);
				});
		}

	};

	customElements.define("page-login", pages.PageLogin);

}( window.pages, window.customElements, window.innerHTML, window.restyle, window.OAuth, window.api ));