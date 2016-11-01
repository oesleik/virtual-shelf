(function(pages, customElements, innerHTML) {
	"use strict";

	pages.PageHome = class extends pages.PageBlank {

		connectedCallback() {
			var usuario = auth.getUser();

			innerHTML(this, `
				Seja bem vindo, ${usuario.nome}`
			);
		}

	};

	customElements.define("page-home", pages.PageHome);

}( window.pages, window.customElements, window.innerHTML ));