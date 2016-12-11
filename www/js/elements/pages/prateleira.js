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
				innerHTML(target, volumes.map((volume) => `<volume-box infoId="${data.store(volume)}"></volume-box>`).join(""));
			}, (error) => {
				innerHTML(target, "<erro-listagem></erro-listagem>");
			});

			app.atualizarComponentes(this);
		}

	};

	customElements.define("page-prateleira", pages.PagePrateleira);

}( window.pages, window.customElements, window.innerHTML, window.app, window.history, window.utils, window.auth, window.api ));