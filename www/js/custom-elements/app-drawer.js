'use strict';

app.elements.AppDrawer = class extends app.elements.HTMLCustomElement {

	init() {
		this.innerHTML =
			'<div class="mdl-layout__drawer">' +
				'<span class="mdl-layout-title">Virtual Shelf</span>' +
			'</div>';
	}

}

customElements.define('app-drawer', app.elements.VirtualShelf);