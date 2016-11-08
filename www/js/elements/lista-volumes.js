(function(elements, customElements, innerHTML, restyle, utils) {
	"use strict";

	var counter = 0;

	elements.ListaVolumes = class extends elements.HTMLElement {

		connectedCallback() {
			counter++;

			this.lancarEventoPesquisar = utils.debounce(function() {
				this.dispatchEvent(new Event("filterChanged"));
			}, 800);

			innerHTML(this, `
				<div class="text-center">
					<div class="mdl-textfield mdl-js-textfield">
						<input class="mdl-textfield__input lista-volumes-pesquisa" type="text" id="lista-volumes-search-${counter}" onkeydown="this.closest('lista-volumes').pesquisarVolumes();">
						<label class="mdl-textfield__label" for="lista-volumes-search-${counter}">Pesquisar...</label>
					</div>
				</div>`
			);

			app.atualizarComponentes(this);
			// this.querySelector("button").addEventListener("click", this.efetuarLogin.bind(this, provider), false);
		}

		pesquisarVolumes() {
			this.lancarEventoPesquisar();
		}

		visualizarVolume(idVolume) {
			// code
		}

	};

	restyle({}, []);

	customElements.define("lista-volumes", elements.ListaVolumes);

}( window.elements, window.customElements, window.innerHTML, window.restyle, window.utils ));