(function(pages, customElements, innerHTML, app, history, utils, auth, api) {
	"use strict";

	pages.PageEdicaoPrateleira = class extends pages.PageDefault {

		connectedCallback() {
			super.connectedCallback();
			this.prateleiraId = this.getAttribute("id");
			this.isEdicao = this.prateleiraId > 0;

			innerHTML(this.querySelector("#page-title"), "Prateleira");

			innerHTML(this.querySelector("#page-content"), `
				<form id="prateleira" onsubmit="return false;" class="form-full-width">
					<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" name="nome" id="nome">
						<label class="mdl-textfield__label" for="nome">Nome</label>
					</div>
					<div class="mdl-textfield mdl-textfield-checkbox">
						<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="publica">
						  <input type="checkbox" id="publica" name="publica" class="mdl-checkbox__input">
						  <span class="mdl-checkbox__label">Pública</span>
						</label>
					</div>
					<div class="actions">
						<button type="button" id="btn-salvar" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Salvar</button>
						<button type="button" id="btn-cancelar" class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancelar</button>
					</div>
				</form>`
			);

			app.atualizarComponentes(this);

			if (this.isEdicao) {
				this.obterDados();
			}

			this.querySelector("#btn-salvar").addEventListener("click", this.salvar.bind(this), false);
			this.querySelector("#btn-cancelar").addEventListener("click", this.cancelar.bind(this), false);
		}

		salvar() {
			var prateleira = utils.getFormValues("prateleira");

			if (this.isEdicao) {
			} else {
				api.add("/prateleiras/usuario/" + auth.getUser().id, prateleira).then((prateleira) => {
					storePrateleiras.push(prateleira);
					this.acessarPrateleira(prateleira.id);
				});
			}
		}

		acessarPrateleira(id) {
			document.querySelector("body").dispatchEvent(new CustomEvent("refreshedShelves", { detail: storePrateleiras }));
			app.goTo("prateleiras/" + id);
		}

		cancelar() {
			app.goTo("home");
		}

		obterDados() {
			utils.fillFormValues("prateleira", auth.getUser());
			app.atualizarComponentes(this);
		}

	};

	customElements.define("page-edicao-prateleira", pages.PageEdicaoPrateleira);

}( window.pages, window.customElements, window.innerHTML, window.app, window.history, window.utils, window.auth, window.api ));