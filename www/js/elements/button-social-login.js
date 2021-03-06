(function(elements, customElements, innerHTML, restyle, OAuth, api, app) {
	"use strict";

	elements.ButtonSocialLogin = class extends elements.HTMLElement {

		connectedCallback() {
			var provider, color;

			switch (this.getAttribute("provider")) {
				case "facebook":
					provider = "facebook";
					color = "#01579B";
					break;
				case "twitter":
					provider = "twitter";
					color = "#03A9F4";
					break;
				default: // google
					provider = "google";
					color = "#F44336";
			}

			innerHTML(this, `
				<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" style="background-color: ${color};">${this.innerHTML}</button>`
			);

			app.atualizarComponentes(this);
			this.querySelector("button").addEventListener("click", this.efetuarLogin.bind(this, provider), false);
		}

		efetuarLogin(provider) {
			var self = this;
			OAuth.initialize("ldh8aAt-ZnZprccwh7ZdtAGTJQw");

			OAuth.popup(provider)
				.then(function(response) {
					response.me().then(function(user) {
						var details = {
							provider,
							user,
							access: response
						};

						api.get("/perfis-sociais/" + provider + "/" + user.id)
							.then(function(perfilSocial) {
								details.perfilSocial = perfilSocial;
								self.dispatchEvent(new CustomEvent("userExists", { detail: details }));
							}, function() {
								self.dispatchEvent(new CustomEvent("userNotExists", { detail: details }));
							});
					});
				}, function(error) {
					// Usuário não autorizou acesso ao perfil
				});
		}

	};

	restyle({
		"button-social-login": {
			"display": "inline-block",
			"width": "100%",
			"max-width": "180px"
		},
		"button-social-login button": {
			"width": "100%",
			"fontWeight": "bold !important",
			"textTransform": "initial !important"
		}
	}, []);

	customElements.define("button-social-login", elements.ButtonSocialLogin);

}( window.elements, window.customElements, window.innerHTML, window.restyle, window.OAuth, window.api, window.app ));