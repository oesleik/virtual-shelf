(function(pages, customElements, innerHTML, app, history, utils, api, restyle) {
	"use strict";

	pages.PageUsuario = class extends pages.PageMain {

		connectedCallback() {
			super.connectedCallback();
			this.usuarioId = this.getAttribute("id");

			innerHTML(this.querySelector("#page-title"), "Usuário");

			innerHTML(this.querySelector("#page-tabs"), `
				<a href="#informacoes" class="mdl-layout__tab is-active">Informações</a>
				<a href="#prateleiras" class="mdl-layout__tab">Prateleiras</a>`
			);

			innerHTML(this.querySelector("#page-content"), `
				<section id="informacoes" class="mdl-layout__tab-panel is-active"><carregando-conteudo></carregando-conteudo></section>
				<section id="prateleiras" class="mdl-layout__tab-panel"><carregando-conteudo></carregando-conteudo></section>`);

			api.get(`/usuarios/${this.usuarioId}`).then((usuario) => {
				var imgs = {
					google: "google-icon",
					facebook: "facebook-icon",
					twitter: "twitter-icon",
					email: "email-icon"
				};

				var formasContato = [];
				usuario.redes_sociais.forEach((perfil) => {
					if (perfil.exibir) {
						formasContato.push({
							provider: perfil.rede_social,
							url: perfil.url,
							image: `img/${imgs[perfil.rede_social]}.png`
						});
					}
				});

				if (usuario.exibir_email) {
					formasContato.push({
						provider: "email",
						link: `mailto:${usuario.email}`,
						image: `img/${imgs.email}.png`
					});
				}

				innerHTML(this.querySelector("#informacoes"), `
					<div class="usuario-imagem">
						<img src="${usuario.avatar}" />
					</div>
					<h3>${usuario.apelido}</h3>
					<h4>${usuario.nome} ${usuario.sobrenome}</h4>
					<div class="formasContato">
						${formasContato.map((forma) => `
							<div>
								<a href="${forma.link ? forma.link : "#"}" onclick="${forma.url ? `window.open('${forma.url}');`: ""} ${forma.link ? "" : "return false;"}">
									<img src="${forma.image}" alt="${forma.provider}" />
								</a>
							</div>`
						).join("")}
					</div>`);

				app.atualizarComponentes(this);
				return api.get(`/prateleiras/usuario/${usuario.id}`);
			}).then((prateleiras) => {
				var lista = prateleiras.map((prateleira) => {
					if (prateleira.publica) {
						return `<li class="mdl-list__item acao-visualizar-prateleira" prateleiraId="${prateleira.id}">
									<span class="mdl-list__item-primary-content">
										<span>${utils.escapeHtml(prateleira.nome)}</span>
									</span>
								</li>`;
					} else {
						return "";
					}
				}).join("");

				innerHTML(this.querySelector("#prateleiras"), `
					<ul class="demo-list-three mdl-list">
						${lista}
					</ul>`);

				Array.from(this.querySelectorAll(".acao-visualizar-prateleira")).forEach((element) => {
					element.addEventListener("click", this.exibirPrateleira.bind(this, element.getAttribute("prateleiraId")), false);
				});

				app.atualizarComponentes(this);
			});

			app.atualizarComponentes(this);

			this.refStyle = restyle({
				"#informacoes": {
					"padding": "30px 20px 20px"
				},
				".usuario-imagem": {
					"text-align": "center",
					"display": "block"
				},
				".usuario-imagem img": {
					"width": "60px",
					"border-radius": "50%"
				},
				"#informacoes h3": {
					"display": "block",
					"padding": "0",
					"margin": "12px 0 5px",
					"font-size": "26px",
					"text-align": "center",
					"line-height": "26px"
				},
				"#informacoes h4": {
					"display": "block",
					"padding": "0",
					"margin": "5px 0 15px",
					"font-size": "18px",
					"line-height": "18px",
					"text-align": "center",
					"color": "#999"
				},
				"#informacoes .formasContato": {
					"margin": "30px auto 0",
					"display": "table"
				},
				"#informacoes .formasContato div": {
					"padding": "0 5px",
					"display": "table-cell",
					"text-align": "center"
				},
				"#informacoes .formasContato a": {
					"padding": "3px 10px"
				},
				"#informacoes .formasContato img": {
					"height": "25px"
				}
			}, []);
		}

		disconnectedCallback() {
			this.refStyle.remove();
		}

		exibirPrateleira(prateleiraId) {
			app.goTo(`prateleiras/${prateleiraId}/usuario/${this.usuarioId}`);
		}

	};

	customElements.define("page-usuario", pages.PageUsuario);

}( window.pages, window.customElements, window.innerHTML, window.app, window.history, window.utils, window.api, window.restyle ));