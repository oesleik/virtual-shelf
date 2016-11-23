(function(pages, innerHTML, app) {
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
			innerHTML(this, `
				<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
					<div class="mdl-layout__header">
						<div class="mdl-layout__header-row">
							<span class="mdl-layout-title" id="page-title">Virtual Shelf</span>
						</div>
						<div class="mdl-layout__tab-bar mdl-js-ripple-effect" id="page-tabs"></div>
					</div>
					<div class="mdl-layout__drawer">
						<span class="mdl-layout-title">Virtual Shelf</span>
					</div>
					<div class="mdl-layout__content" id="page-content"></div>
				</div>`
			);

			app.atualizarComponentes(this);
		}

	};

	pages.PageDefault = class extends HTMLElement {

		constructor(self) {
			self = super(self);
			self.init();
			return self;
		}

		init() {}

		connectedCallback() {
			innerHTML(this, `
				<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
					<div class="mdl-layout__header">
						<div class="mdl-layout__header-row">
							<span class="mdl-layout-title" id="page-title">Virtual Shelf</span>
						</div>
					</div>
					<div class="mdl-layout__drawer">
						<span class="mdl-layout-title">Virtual Shelf</span>
					</div>
					<div class="mdl-layout__content" id="page-content"></div>
				</div>`
			);
		}

	};

}( window.pages = {}, window.innerHTML, window.app ));