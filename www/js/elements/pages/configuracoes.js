(function(pages, customElements, innerHTML, app, history, utils, auth, api) {
	"use strict";

	pages.PageConfiguracoes = class extends pages.PageDefault {

		connectedCallback() {
			super.connectedCallback();

			innerHTML(this.querySelector("#page-title"), `Configurações`);

			innerHTML(this.querySelector("#page-content"), `
				<form id="config" onsubmit="return false;" class="form-full-width">
					<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" name="nome" id="nome">
						<label class="mdl-textfield__label" for="nome">Nome</label>
					</div>
					<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" name="sobrenome" id="sobrenome">
						<label class="mdl-textfield__label" for="sobrenome">Sobrenome</label>
					</div>
					<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" name="apelido" id="apelido">
						<label class="mdl-textfield__label" for="apelido">Apelido</label>
					</div>
					<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" name="email" id="email">
						<label class="mdl-textfield__label" for="email">Email</label>
					</div>
					<div class="mdl-textfield mdl-textfield-checkbox">
						<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="exibir_email">
						  <input type="checkbox" id="exibir_email" name="exibir_email" class="mdl-checkbox__input">
						  <span class="mdl-checkbox__label">Exibir email</span>
						</label>
					</div>
					<div class="actions">
						<button type="button" id="btn-salvar" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Salvar</button>
						<button type="button" id="btn-cancelar" class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancelar</button>
					</div>
				</form>`
			);

			this.obterDados();
			app.atualizarComponentes(this);

			this.querySelector("#btn-salvar").addEventListener("click", this.salvar.bind(this), false);
			this.querySelector("#btn-cancelar").addEventListener("click", this.cancelar.bind(this), false);
		}

		salvar() {
			var config = utils.getFormValues("config");

			api.edit("/usuarios/" + auth.getUser().id, config).then((user) => {
				auth.setUser(user);
				history.back();
			});
		}

		cancelar() {
			history.back();
		}

		obterDados() {
			utils.fillFormValues("config", auth.getUser());
		}

	};

	customElements.define("page-configuracoes", pages.PageConfiguracoes);

}( window.pages, window.customElements, window.innerHTML, window.app, window.history, window.utils, window.auth, window.api ));