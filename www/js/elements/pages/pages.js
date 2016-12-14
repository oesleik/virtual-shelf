(function(pages, innerHTML, app) {
	"use strict";

	document.querySelector("body").addEventListener("refreshedShelves", atualizarMenuLateral);

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
				<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
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
					<div class="mdl-layout-spacer"></div>
					<nav class="mdl-navigation" id="page-header-actions"></nav>
				</div>`;
	}

	function getLayoutDrawer() {
		return `<div class="mdl-layout__drawer">
					<span class="mdl-layout-title">Virtual Shelf</span>
					<nav class="mdl-navigation">
						${getLayoutNavDrawer()}
					</nav>
				</div>`;
	}

	function getLayoutNavDrawer() {
		return `
			<a class="mdl-navigation__link mdl-menu__item--full-bleed-divider" href="#/pesquisar-livros">Home <i class="material-icons">home</i></a>
			${""/*<a class="mdl-navigation__link" href="#/prateleira/{id}">Favoritos <i class="material-icons">star_border</i></a>*/}
			${storePrateleiras.map((prateleira) => `<a class="mdl-navigation__link" href="#/prateleiras/${prateleira.id}">${prateleira.nome} <span class="prateleira-icon-spacer"></span></a>`).join("")}
			<a class="mdl-navigation__link mdl-menu__item--full-bleed-divider" href="#/prateleiras/add">Nova prateleira <i class="material-icons">library_add</i></a>
			<a class="mdl-navigation__link" href="#/configuracoes">Configurações <i class="material-icons">settings</i></a>
			<a class="mdl-navigation__link" href="#" onclick="app.logout(); return false;">Sair <i class="material-icons">exit_to_app</i></a>`;
	}

	function getLayoutContent() {
		return `<div class="mdl-layout__content" id="page-content">
					<carregando-conteudo></carregando-conteudo>
				</div>`;
	}

	function atualizarMenuLateral() {
		var target = document.querySelector(".mdl-layout > .mdl-layout__drawer .mdl-navigation");

		if (target) {
			innerHTML(target, getLayoutNavDrawer());
			app.atualizarComponentes(target);
		}
	}

}( window.pages = {}, window.innerHTML, window.app ));