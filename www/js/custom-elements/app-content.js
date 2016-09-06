'use strict';

app.elements.AppContent = class extends app.elements.HTMLCustomElement {

	init() {
		this.classList.add('mdl-layout__content');

		innerHTML(this,
			'<section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">' +
				'<div class="page-content">Conteúdo página 1</div>' +
			'</section>' +
			'<section class="mdl-layout__tab-panel" id="scroll-tab-2">' +
				'<div class="page-content">Conteúdo página 2</div>' +
			'</section>');
	}

}

customElements.define('app-content', app.elements.AppContent);