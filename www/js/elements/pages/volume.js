(function(pages, customElements, innerHTML, app, history, utils, api) {
	"use strict";

	pages.PageVolume = class extends pages.PageMain {

		connectedCallback() {
			super.connectedCallback();
			innerHTML(this.querySelector("#page-title"), `Virtual Shelf`);

			innerHTML(this.querySelector("#page-tabs"), `
				<a href="#scroll-tab-1" class="mdl-layout__tab is-active">Informações</a>
				<a href="#scroll-tab-2" class="mdl-layout__tab">Comentários</a>`
			);

			innerHTML(this.querySelector("#page-content"), `
				<section id="scroll-tab-1" class="mdl-layout__tab-panel is-active">Carregando...</section>
				<section id="scroll-tab-2" class="mdl-layout__tab-panel">Carregando...</section>`);

			api.get("/volumes/" + this.getAttribute("id")).then((volume) => {
				this.volume = volume;

				var lojas = [{
					"provider": "amazon",
					"providerImage": "",
					"search": `https://www.amazon.com/gp/search/ref=sr_adv_b/?search-alias=stripbooks&unfiltered=1&field-keywords=&field-author=&field-title=&field-isbn=${volume.isbn}&field-publisher=&node=&field-p_n_condition-type=&p_n_feature_browse-bin=&field-age_range=&field-language=&field-dateop=During&field-datemod=&field-dateyear=&sort=relevanceexprank&Adv-Srch-Books-Submit.x=32&Adv-Srch-Books-Submit.y=14`,
				}, {
					"provider": "submarino",
					"providerImage": "",
					"search": `http://www.submarino.com.br/portal/ResultadoBuscaAvancadaLivros/309573/?isbn=${volume.isbn}`,
				}, {
					"provider": "saraiva",
					"providerImage": "",
					"search": `http://www.editorasaraiva.com.br/produtos/?tipoBusca=3&tipoMidia=0&query=${volume.isbn}&catalogoNovidades=&area=&subarea=&disciplina=&nivelEnsino=&seloEditorial=&dataComemorativa=&temaTransversal=&tituloIndicado=`
				}];

				innerHTML(this.querySelector("#scroll-tab-1"), `
					<div class="volume">
						<div class="volume-imagem">
							<img src="${!!volume.imagens && volume.imagens.thumb}" />
						</div>
						<h3>${volume.titulo}</h3>
						<h4>${!!volume.autores && volume.autores.map((autor) => autor.nome).join(", ")}</h4>
						<div class="secondary">
							<div class="status" id="btn-select-situacao">
								Lido <i class="material-icons">arrow_drop_down</i>
							</div>
							<ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" for="btn-select-situacao">
								<li class="mdl-menu__item btn-alterar-situacao" situacao="Lendo">Lendo</li>
								<li class="mdl-menu__item btn-alterar-situacao" situacao="Lido">Lido</li>
							</ul>
							<div class="rating">
								<i class="material-icons">star</i>
								<i class="material-icons">star</i>
								<i class="material-icons">star</i>
								<i class="material-icons">star</i>
								<i class="material-icons">star</i>
							</div>
							<div class="shop">
							</div>
						</div>
					</div>`);

				app.atualizarComponentes(this);

				Array.from(this.querySelectorAll(".btn-alterar-situacao")).forEach((element) => {
					element.addEventListener("click", this.alterarSituacao.bind(this, volume.id, element.getAttribute("situacao")), false);
				});

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
					"margin": "10px 0 5px",
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
				".volume .status": {
					"font-size": "15px",
					"color": "#666"
				},
				".volume .status i": {
					"vertical-align": "bottom"
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

	};

	customElements.define("page-volume", pages.PageVolume);

}( window.pages, window.customElements, window.innerHTML, window.app, window.history, window.utils, window.api ));