'use strict';

app.elements.AppDrawer = class extends app.elements.HTMLCustomElement {

	init() {
		this.classList.add('mdl-layout__drawer');
		innerHTML(this, '<span class="mdl-layout-title">Virtual Shelf</span>');
	}

}

customElements.define('app-drawer', app.elements.AppDrawer);