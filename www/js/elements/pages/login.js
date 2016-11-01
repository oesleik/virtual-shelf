(function(pages, customElements, innerHTML, restyle) {
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
						<button-social-login provider="google">Google+</button-social-login>
						<br />
						<button-social-login provider="facebook">Facebook</button-social-login>
						<br />
						<button-social-login provider="twitter">Twitter</button-social-login>
					</div>
				</div>`
			);

			Array.from(this.querySelectorAll("button-social-login")).forEach((button) => {
				button.addEventListener("userExists", this.userExistsCallback, false);
				button.addEventListener("userNotExists", this.userNotExistsCallback, false);
			});

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
				"page-login button-social-login": {
					"margin": "5px 0 !important",
				}
			}, []);
		}

		disconnectedCallback() {
			this.refStyle.remove();
		}

		userExistsCallback(event) {
			// console.log("Usuário encontrado");
			// console.log(event);
		}

		userNotExistsCallback(event) {
			// console.log("Usuário não encontrado");
			// console.log(event);
		}

	};

	customElements.define("page-login", pages.PageLogin);

}( window.pages, window.customElements, window.innerHTML, window.restyle, window.OAuth, window.api ));