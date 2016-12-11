(function(pages, customElements, innerHTML, app, history, utils, auth, api) {
	"use strict";

	pages.PagePrateleira = class extends pages.PageDefault {

		connectedCallback() {
			super.connectedCallback();
			this.prateleiraId = this.getAttribute("id");
			this.prateleira = null;

			storePrateleiras.forEach((prateleira) => {
				if (prateleira.id == this.prateleiraId) {
					this.prateleira = prateleira;
				}
			});

			if (this.prateleira === null) {
				app.goTo("home");
				return;
			}

			var target = this.querySelector("#page-content");

			innerHTML(this.querySelector("#page-title"), utils.escapeHtml(this.prateleira.nome));
			innerHTML(target, `<carregando-conteudo></carregando-conteudo>`);

			api.get(`/prateleiras/${this.prateleiraId}/usuarios/${auth.getUser().id}/volumes`).then((volumes) => {
				innerHTML(target, volumes.map((volume) => `<volume-box infoId="${data.store(volume)}" prateleiraId="${this.prateleiraId}"></volume-box>`).join(""));
			}, (error) => {
				innerHTML(target, "<erro-listagem></erro-listagem>");
			});

			innerHTML(this.querySelector("#page-header-actions"), `
				<button class="mdl-navigation__link mdl-button mdl-js-button mdl-button--icon" id="menu-acoes-header">
				  <i class="material-icons">more_vert</i>
				</button>
				<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="menu-acoes-header">
					<li class="mdl-menu__item" id="acao-editar">Editar</li>
					<li class="mdl-menu__item" id="acao-remover">Remover</li>
				</ul>`
			);

			this.querySelector("#acao-editar").addEventListener("click", this.editar.bind(this), false);
			this.querySelector("#acao-remover").addEventListener('click', this.remover.bind(this), false);

			app.atualizarComponentes(this);
		}

		editar() {
			app.goTo(`prateleiras/edit/${this.prateleiraId}`);
		}

		remover() {
			if (confirm("Confirma a remoção desta prateleira?")) {
				api.delete(`/prateleiras/${this.prateleiraId}/usuario/${auth.getUser().id}`);

				storePrateleiras.forEach((prateleira, idx) => {
					if (prateleira.id == this.prateleiraId) {
						storePrateleiras.splice(idx, 1);
						document.querySelector("body").dispatchEvent(new CustomEvent("refreshedShelves", { detail: storePrateleiras }));
						app.goTo("home");
					}
				});
			}
		}

	};

	customElements.define("page-prateleira", pages.PagePrateleira);

}( window.pages, window.customElements, window.innerHTML, window.app, window.history, window.utils, window.auth, window.api ));