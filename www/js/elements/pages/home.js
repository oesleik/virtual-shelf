"use strict";

app.pages.PageHome = class extends app.elements.HTMLCustomElement {

	init() {
		innerHTML(this,
			`<br /><a href="#/login" style="margin: 15px;">Página de login</a>`
		);
	}

}

customElements.define("page-home", app.pages.PageHome);