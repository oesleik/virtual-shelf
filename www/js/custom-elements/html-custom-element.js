'use strict';

app.elements = {};

app.elements.HTMLCustomElement = class extends HTMLElement {

	constructor(self) {
		self = super(self);
		self.init();
		return self;
	}

	init() {}

}