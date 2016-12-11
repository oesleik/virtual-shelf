(function(pages, customElements, innerHTML, app) {
	"use strict";

	pages.PagePesquisarLivros = class extends pages.PageDefault {

		connectedCallback() {
			super.connectedCallback();

			innerHTML(this.querySelector("#page-content"), `
				<form id="filtrosVolumes" class="text-center" onsubmit="return false;">
					<div class="mdl-textfield mdl-js-textfield">
						<input class="mdl-textfield__input lista-volumes-pesquisa" type="text" id="lista-volumes-search" name="pesquisa">
						<label class="mdl-textfield__label" for="lista-volumes-search">Pesquisar...</label>
					</div>
				</form>
				<div id="resultado-busca"></div>`
			);

			app.atualizarComponentes(this);
			this.querySelector("#lista-volumes-search").addEventListener("keydown", utils.debounce(this.listarVolumes.bind(this), 200), false);
		}

		listarVolumes() {
			var filtros = utils.getFormValues("filtrosVolumes");
			var target = this.querySelector("#resultado-busca");

			innerHTML(target, `<carregando-conteudo></carregando-conteudo>`);

			api.get("/volumes/pesquisa/" + filtros.pesquisa).then((volumes) => {
				innerHTML(target, volumes.map((volume) => `<volume-box infoId="${data.store(volume)}"></volume-box>`).join(""));
			}, (error) => {
				innerHTML(target, "<erro-listagem></erro-listagem>");
			});
		}

	};

	customElements.define("page-pesquisar-livros", pages.PagePesquisarLivros);

}( window.pages, window.customElements, window.innerHTML, window.app ));