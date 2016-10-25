'use strict';

app.elements.VirtualShelf = class extends app.elements.HTMLCustomElement {

	init() {
		innerHTML(this,
			'<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">' +
				'<app-header></app-header>' +
				'<app-drawer></app-drawer>' +
				'<app-content></app-content>' +
			'</div>');
	}

}

customElements.define('virtual-shelf', app.elements.VirtualShelf);