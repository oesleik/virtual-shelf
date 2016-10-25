'use strict';

app.pages.PageHome = class extends app.elements.HTMLCustomElement {

	init() {
		innerHTML(this,
			'Hellow world! <a href="#/login">testar</a>'
		);
	}

}

customElements.define('page-home', app.pages.PageHome);