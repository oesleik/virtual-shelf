'use strict';

app.elements.HTMLCustomElement = class extends HTMLElement {

	constructor(self) {
		self = super(self);
		self.init();
		return self;
	}

	init() {}

}