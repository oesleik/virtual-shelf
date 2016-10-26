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

})( window.pages = {} );