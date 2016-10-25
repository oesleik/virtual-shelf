'use strict';

app.pages.PageLogin = class extends app.elements.HTMLCustomElement {

	init() {
		innerHTML(this,
			'Hellow teste! <a href="#/home">go back</a>'
		);
	}

}

customElements.define('page-login', app.pages.PageLogin);