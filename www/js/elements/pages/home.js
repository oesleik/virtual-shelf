(function(pages, customElements, innerHTML, app) {
	"use strict";

	pages.PageHome = class extends pages.PageMain {

		connectedCallback() {
			super.connectedCallback();
			var usuario = auth.getUser();

			innerHTML(this.querySelector("#page-tabs"), `
				<a href="#scroll-tab-1" class="mdl-layout__tab is-active">Meus livros</a>
				<a href="#scroll-tab-2" class="mdl-layout__tab">Meus interesses</a>
				<a href="#scroll-tab-3" class="mdl-layout__tab">Alguma outra tab</a>`
			);

			innerHTML(this.querySelector("#page-content"), `
				<section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">
					<div class="page-content">Conteúdo página 1</div>
				</section>
				<section class="mdl-layout__tab-panel" id="scroll-tab-2">
					<div class="page-content">Conteúdo página 2</div>
				</section>`
			);

			app.atualizarComponentes(this);
		}

	};

	customElements.define("page-home", pages.PageHome);

}( window.pages, window.customElements, window.innerHTML, window.app ));