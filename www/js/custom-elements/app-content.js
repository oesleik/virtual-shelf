'use strict';

app.elements.AppContent = class extends app.elements.HTMLCustomElement {

	init() {
		this.innerHTML =
			'<main class="mdl-layout__content">' +
				'<section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">' +
					'<div class="page-content">Conteúdo página 1</div>' +
				'</section>' +
				'<section class="mdl-layout__tab-panel" id="scroll-tab-2">' +
					'<div class="page-content">Conteúdo página 2</div>' +
				'</section>' +
			'</main>';
	}

}

customElements.define('app-content', app.elements.VirtualShelf);