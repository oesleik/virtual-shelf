(function(pages, customElements, innerHTML, app) {
	"use strict";

	pages.PagePesquisarLivros = class extends pages.PageDefault {

		connectedCallback() {
			super.connectedCallback();

			innerHTML(this.querySelector("#page-header-actions"), `
				<button class="mdl-navigation__link mdl-button mdl-js-button mdl-button--icon" id="acao-toggle-filtros">
				  <i class="material-icons">filter_list</i>
				</button>`);

			innerHTML(this.querySelector("#page-content"), `
				<form id="filtrosVolumes" class="form-full-width hide" onsubmit="return false;">
					<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" id="lista-volumes-pesquisa" name="pesquisa">
						<label class="mdl-textfield__label" for="lista-volumes-pesquisa">Pesquisa</label>
					</div>
					<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<select class="mdl-textfield__input lista-volumes-pesquisa" id="lista-volumes-categoria" name="categoria">
							<option value="qq">Qualquer categoria</option>
						</select>
						<label class="mdl-textfield__label" for="lista-volumes-categoria">Categoria</label>
					</div>
					<button type="button" id="acao-buscar-volumes" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Buscar</button>
				</form>
				<div id="resultado-busca"></div>`
			);

			api.get("/categorias").then((categorias) => {
				categorias.unshift({
					id: 0,
					nome: "Qualquer categoria"
				});

				innerHTML(this.querySelector("#lista-volumes-categoria"), `
					${categorias.map((categoria) => `<option value="${categoria.nome}">${categoria.nome}</option>`).join("")}`);
			});

			this.exibirVolumes();
			this.querySelector("#acao-toggle-filtros").addEventListener("click", this.toggleFiltros.bind(this), false);
			this.querySelector("#acao-buscar-volumes").addEventListener("click", this.listarVolumes.bind(this), false);
		}

		toggleFiltros() {
			this.querySelector("#filtrosVolumes").classList.toggle("hide");
			this.querySelector("#lista-volumes-pesquisa").focus();
		}

		listarVolumes() {
			var filtros = utils.getFormValues("filtrosVolumes");
			var target = this.querySelector("#resultado-busca");

			if (filtros.pesquisa.length) {
				innerHTML(target, `<carregando-conteudo></carregando-conteudo>`);

				api.get(`/volumes/pesquisa/${filtros.pesquisa}${filtros.categoria == "Qualquer categoria" ? "" : `?categoria=${filtros.categoria}`}`).then((volumes) => {
					innerHTML(target, volumes.map((volume) => `<volume-box infoId="${data.store(volume)}"></volume-box>`).join(""));
				}, (error) => {
					innerHTML(target, "<erro-listagem></erro-listagem>");
				});
			} else {
				innerHTML(target, "");
			}
		}

		exibirVolumes(volumes) {
			var target = this.querySelector("#resultado-busca");

			api.get("/volumes").then((volumes) => {
				innerHTML(target, volumes.map((volume) => `<volume-box infoId="${data.store(volume)}"></volume-box>`).join(""));
			}, (error) => {
				innerHTML(target, "<erro-listagem></erro-listagem>");
			});

			app.atualizarComponentes(this);
		}

	};

	customElements.define("page-pesquisar-livros", pages.PagePesquisarLivros);

}( window.pages, window.customElements, window.innerHTML, window.app ));