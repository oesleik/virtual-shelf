'use strict';

app.elements.VirtualShelf = class extends app.elements.HTMLCustomElement {

	init() {
		this.innerHTML =
			'<div style="text-align: center; margin: 100px 0 30px;">' +
	            '<img src="img/logo-splash.png" />' +
	        '</div>';
	}

}

customElements.define('virtual-shelf', app.elements.VirtualShelf);