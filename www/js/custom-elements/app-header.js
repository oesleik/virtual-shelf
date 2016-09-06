'use strict';

app.elements.AppHeader = class extends app.elements.HTMLCustomElement {

	init() {
		this.classList.add('mdl-layout__header');

		innerHTML(this,
			'<div class="mdl-layout__header-row">' +
				'<span class="mdl-layout-title">Virtual Shelf</span>' +
			'</div>' +
			'<div class="mdl-layout__tab-bar mdl-js-ripple-effect">' +
				'<a href="#scroll-tab-1" class="mdl-layout__tab is-active">Meus livros</a>' +
				'<a href="#scroll-tab-2" class="mdl-layout__tab">Meus interesses</a>' +
			'</div>');
	}

}

customElements.define('app-header', app.elements.AppHeader);