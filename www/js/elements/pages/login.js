(function(pages, customElements, innerHTML, restyle, api, auth, app, ui) {
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
			var perfilSocial = event.detail.perfilSocial;

			api.get("/usuarios/" + perfilSocial.id_usuario)
				.then(function(usuario) {
					auth.setUser(usuario);
					app.goTo("home");
				}, function() {
					ui.alert("Ocorreu algum problema ao efetuar o login.\nPor favor, tente novamente mais tarde.");
				});
		}

		userNotExistsCallback(event) {
			var provider = event.detail.provider;
			var user = event.detail.user;
			var access = event.detail.access;

			var usuario = {
				"nome": user.firstname,
				"sobrenome": user.lastname,
				"apelido": user.firstname,
				"email": user.email,
				"avatar": user.avatar
			};

			var perfilSocial = {
				"id_usuario": 0,
				"id_usuario_rede": user.id,
				"email": user.email,
				"avatar": user.avatar,
				"url": user.url,
				"rede_social": provider
			};

			var login = {
				"id_usuario": 0,
				"id_perfil_social": 0,
				"token": access.access_token,
				"expires_in": access.expires_in,
				"refresh_token": access.refresh_token,
				"token_id": access.id_token,
				"token_type": access.token_type
			};

			api.add("/usuarios", usuario)
				.then(function(response) {
					usuario = response;
					perfilSocial.id_usuario = usuario.id;

					return api.add("/perfis-sociais", perfilSocial);
				})
				.then(function(response) {
					perfilSocial = response;
					login.id_usuario = usuario.id;
					login.id_perfil_social = perfilSocial.id;

					return api.add("/logins", login);
				})
				.then(function(response) {
					login = response;
					auth.setUser(usuario);
					app.goTo("home");
				})
				.then(null, function() {
					ui.alert("Ocorreu algum problema ao tentar efetuar seu cadastro.\nPor favor, tente novamente mais tarde.");
				});
		}

	};

	customElements.define("page-login", pages.PageLogin);

}( window.pages, window.customElements, window.innerHTML, window.restyle, window.api, window.auth, window.app, window.ui ));