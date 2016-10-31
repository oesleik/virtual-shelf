(function(pages, customElements, innerHTML) {
	"use strict";

	pages.PageHome = class extends pages.PageBlank {

		connectedCallback() {
			innerHTML(this,
				`<br /><a href="#/login" style="margin: 15px;">Página de login</a>`
			);
		}

	};

	customElements.define("page-home", pages.PageHome);

}( window.pages, window.customElements, window.innerHTML ));