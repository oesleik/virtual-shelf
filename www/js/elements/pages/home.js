(function(pages, customElements, innerHTML, app) {
	"use strict";

	pages.PageHome = class extends pages.PageMain {

		connectedCallback() {
			super.connectedCallback();

			innerHTML(this.querySelector("#page-tabs"), `
				<a href="#scroll-tab-1" class="mdl-layout__tab is-active">Meus livros</a>
				<a href="#scroll-tab-2" class="mdl-layout__tab">Meus interesses</a>`
			);

			innerHTML(this.querySelector("#page-content"), `
				<section id="scroll-tab-1" class="mdl-layout__tab-panel is-active">
					<a href="#/pesquisar-livros">Pesquisar livros</a>
				</section>
				<section id="scroll-tab-2" class="mdl-layout__tab-panel"></section>`
			);

			app.atualizarComponentes(this);

			Array.from(this.querySelectorAll("lista-volumes")).forEach((lista) => {
				lista.addEventListener("filterChanged", this.listarVolumes.bind(this), false);
			});
		}

		listarVolumes(event) {
			var lista = event.target;
			var pesquisa = lista.querySelector(".lista-volumes-pesquisa").value;

			api.get("/volumes/pesquisa/" + pesquisa).then((volumes) => {
				console.log(volumes);
			});
		}

	};

	customElements.define("page-home", pages.PageHome);

}( window.pages, window.customElements, window.innerHTML, window.app ));