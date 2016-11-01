(function(pages) {
	"use strict";

	pages.PageBlank = class extends HTMLElement {

		constructor(self) {
			self = super(self);
			self.init();
			return self;
		}

		init() {}

	};

	pages.PageMain = class extends HTMLElement {

		constructor(self) {
			self = super(self);
			self.init();
			return self;
		}

		init() {}

		connectedCallback() {
			// adicionar estrutura inicial da página
		}

	};

}( window.pages = {} ));