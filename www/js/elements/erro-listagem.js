(function(elements, customElements, innerHTML, restyle) {
	"use strict";

	elements.ErroListagem = class extends elements.HTMLElement {

		connectedCallback() {
			innerHTML(this, `Ocorreu um problema ao se comunicar com o servidor<br /><br />Verifique sua conexão e tente novamente`);
		}

	};

	restyle({
		"erro-listagem": {
			"padding": "30px",
			"font-size": "1.1em",
			"text-align": "center",
			"display": "block"
		}
	}, []);

	customElements.define("erro-listagem", elements.ErroListagem);

}( window.elements, window.customElements, window.innerHTML, window.restyle ));