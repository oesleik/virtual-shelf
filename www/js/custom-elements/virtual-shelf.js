'use strict';

app.elements.VirtualShelf = class extends app.elements.HTMLCustomElement {

	init() {
		this.innerHTML = '<button type="button">Autenticar</button>';
			// '<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">' +
			// 	// '<app-header></app-header>' +
			// 	// '<app-drawer></app-drawer>' +
			// 	// '<app-content></app-content>' +
			// '</div>';
		this.querySelector('button').addEventListener('click', app.authenticate, false);
	}

}

customElements.define('virtual-shelf', app.elements.VirtualShelf);