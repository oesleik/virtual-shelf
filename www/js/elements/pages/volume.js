(function(pages, customElements, innerHTML, app, history, utils, api, restyle) {
	"use strict";

	pages.PageVolume = class extends pages.PageMain {

		connectedCallback() {
			super.connectedCallback();

			innerHTML(this.querySelector("#page-tabs"), `
				<a href="#scroll-tab-1" class="mdl-layout__tab is-active">Informações</a>
				<a href="#scroll-tab-2" class="mdl-layout__tab">Comentários</a>`
			);

			innerHTML(this.querySelector("#page-content"), `
				<section id="scroll-tab-1" class="mdl-layout__tab-panel is-active"><carregando-conteudo></carregando-conteudo></section>
				<section id="scroll-tab-2" class="mdl-layout__tab-panel"><carregando-conteudo></carregando-conteudo></section>`);

			api.get("/volumes/" + this.getAttribute("id")).then((volume) => {
				this.volume = volume;

				var lojas = [{
					"provider": "amazon",
					"providerImage": "img/amazon-icon.png",
					"search": `https://www.amazon.com/gp/search/ref=sr_adv_b/?search-alias=stripbooks&unfiltered=1&field-keywords=&field-author=&field-title=&field-isbn=${volume.isbn}&field-publisher=&node=&field-p_n_condition-type=&p_n_feature_browse-bin=&field-age_range=&field-language=&field-dateop=During&field-datemod=&field-dateyear=&sort=relevanceexprank&Adv-Srch-Books-Submit.x=32&Adv-Srch-Books-Submit.y=14`,
				}, {
					"provider": "submarino",
					"providerImage": "img/submarino-icon.png",
					"search": `http://www.submarino.com.br/portal/ResultadoBuscaAvancadaLivros/309573/?isbn=${volume.isbn}`,
				}, {
					"provider": "saraiva",
					"providerImage": "img/saraiva-icon.png",
					"search": `http://www.editorasaraiva.com.br/produtos/?tipoBusca=3&tipoMidia=0&query=${volume.isbn}&catalogoNovidades=&area=&subarea=&disciplina=&nivelEnsino=&seloEditorial=&dataComemorativa=&temaTransversal=&tituloIndicado=`
				}];

				innerHTML(this.querySelector("#scroll-tab-1"), `
					<div class="volume">
						<div class="volume-imagem">
							<img src="${volume.imagens.thumb.caminho}" />
						</div>
						<h3>${volume.titulo}</h3>
						<h4>${volume.autores.map((autor) => autor.nome).join(", ")}</h4>
						<div class="secondary">
							<div class="status">
								<volume-situacao volumeId="${volume.id}"></volume-situacao>
							</div>
							<div class="rating">
								<volume-avaliacao volumeId="${volume.id}"></volume-avaliacao>
							</div>
							<div class="shop">
								${lojas.map((loja) =>
									`<div>
										<img src="${loja.providerImage}" alt="${loja.provider}" onclick="window.open('${loja.search}');" />
									</div>`
								).join("")}
							</div>
						</div>
					</div>`);

				app.atualizarComponentes(this);

				Array.from(this.querySelectorAll(".btn-alterar-situacao")).forEach((element) => {
					element.addEventListener("click", this.alterarSituacao.bind(this, volume.id, element.getAttribute("situacao")), false);
				});

				if (storePrateleiras.length) {
					innerHTML(this.querySelector("#page-header-actions"), `
						<button class="mdl-navigation__link mdl-button mdl-js-button mdl-button--icon" id="menu-acoes-header">
						  <i class="material-icons">more_vert</i>
						</button>
						<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="menu-acoes-header">
							<li class="mdl-menu__item">Adicionar aos favoritos</li>
							<li class="mdl-menu__item" id="acao-adicionar-volume-prateleira">Adicionar a prateleira</li>
						</ul>

						<dialog class="mdl-dialog" id="dialog-adicionar-prateleira">
							<h4 class="mdl-dialog__title">Adicionar a prateleira</h4>
							<div class="mdl-dialog__content">
								<ul class="demo-list-item mdl-list">
									${storePrateleiras.map((prateleira) => `<li class="mdl-list__item adicionar-volume" prateleira="${prateleira.id}"><span class="mdl-list__item-primary-content">${prateleira.nome}</span></li>`).join("")}
								</ul>
							</div>
							<div class="mdl-dialog__actions">
								<button type="button" class="mdl-button close">Cancelar</button>
							</div>
						</dialog>`
					);

					this.querySelector("#acao-adicionar-volume-prateleira").addEventListener("click", () => this.querySelector('#dialog-adicionar-prateleira').showModal(), false);
					this.querySelector("#dialog-adicionar-prateleira .close").addEventListener('click', () => this.querySelector("#dialog-adicionar-prateleira").close(), false);

					Array.from(this.querySelectorAll("#dialog-adicionar-prateleira .adicionar-volume")).forEach((element) => {
						element.addEventListener('click', this.adicionarVolume.bind(this, element.getAttribute("prateleira")), false);
					});
				}

			// 	return api.get("/comentarios/volume/" + volume.id);
			// }).then((comentarios) => {
			// 	console.log(comentarios);
			});

			app.atualizarComponentes(this);

			this.refStyle = restyle({
				".volume": {
					"margin": "15px",
					"display": "block"
				},
				".volume-imagem": {
					"min-width": "100px",
					"min-height": "150px",
					"text-align": "center"
				},
				".volume h3": {
					"display": "block",
					"padding": "0",
					"margin": "20px 0 5px",
					"font-size": "22px",
					"line-height": "22px"
				},
				".volume h4": {
					"display": "block",
					"padding": "0",
					"margin": "0 0 15px",
					"font-size": "18px",
					"line-height": "18px",
					"color": "#999"
				},
				".volume .rating": {
					"margin-top": "5px"
				},
				".volume .shop": {
					"margin": "30px 0 0",
					"display": "table",
					"width": "100%"
				},
				".volume .shop div": {
					"padding": "0 5px",
					"display": "table-cell",
					"text-align": "center"
				},
				".volume .shop img": {
					"padding": "3px 10px",
					"height": "25px"
				}
			}, []);
		}

		disconnectedCallback() {
			this.refStyle.remove();
		}

		voltar() {
			history.back();
		}

		alterarSituacao(idVolume, situacao) {
			console.log(arguments);
		}

		adicionarVolume(prateleiraId) {
			api.add(`/prateleiras/${prateleiraId}/usuarios/${auth.getUser().id}/volumes/${this.volume.id}`);
			this.querySelector('#dialog-adicionar-prateleira').close();
		}

	};

	customElements.define("page-volume", pages.PageVolume);

}( window.pages, window.customElements, window.innerHTML, window.app, window.history, window.utils, window.api, window.restyle ));