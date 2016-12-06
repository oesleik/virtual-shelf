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
						${getLayoutHeader()}
						<div class="mdl-layout__tab-bar mdl-js-ripple-effect" id="page-tabs"></div>
					</div>
					${getLayoutDrawer()}
					${getLayoutContent()}
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
						${getLayoutHeader()}
					</div>
					${getLayoutDrawer()}
					${getLayoutContent()}
				</div>`
			);
		}

	};

	function getLayoutHeader() {
		return `<div class="mdl-layout__header-row">
					<span class="mdl-layout-title" id="page-title">Virtual Shelf</span>
				</div>`;
	}

	function getLayoutDrawer() {
		return `<div class="mdl-layout__drawer">
					<span class="mdl-layout-title">Virtual Shelf</span>
					<nav class="mdl-navigation">
						<a class="mdl-navigation__link" href="#/pesquisar-livros">Pesquisar livros <i class="material-icons">search</i></a>
						<a class="mdl-navigation__link" href="#/configuracoes">Configurações <i class="material-icons">settings</i></a>
					</nav>
				</div>`;
	}

	function getLayoutContent() {
		return `<div class="mdl-layout__content" id="page-content"></div>`;
	}

}( window.pages = {}, window.innerHTML, window.app ));