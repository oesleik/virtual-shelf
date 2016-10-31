(function(elements) {
	"use strict";

	elements.HTMLElement = class extends HTMLElement {

		constructor(self) {
			self = super(self);
			self.init();
			return self;
		}

		init() {}

	};

	elements.HTMLButtonElement = class extends HTMLButtonElement {

		constructor(self) {
			self = super(self);
			self.init();
			return self;
		}

		init() {}

	};

}( window.elements = {} ));