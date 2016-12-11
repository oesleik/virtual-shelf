(function(elements, customElements, innerHTML, restyle, app) {
	"use strict";

	elements.CarregandoConteudo = class extends elements.HTMLElement {

		connectedCallback() {
			innerHTML(this, `<div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>`);
			app.atualizarComponentes(this);
		}

	};

	restyle({
		"carregando-conteudo": {
			"text-align": "center",
			"display": "block",
			"margin-top": "60px"
		},
		"carregando-conteudo .mdl-spinner:not(.is-upgraded).is-active:after": {
			"content": "''"
		}
	}, []);

	customElements.define("carregando-conteudo", elements.CarregandoConteudo);

}( window.elements, window.customElements, window.innerHTML, window.restyle, window.app ));