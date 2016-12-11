(function(pages, customElements, innerHTML, app, history, utils, api, restyle) {
	"use strict";

	pages.PageVolume = class extends pages.PageMain {

		connectedCallback() {
			super.connectedCallback();

			innerHTML(this.querySelector("#page-tabs"), `
				<a href="#informacoes" class="mdl-layout__tab is-active">Informações</a>
				<a href="#comentarios" class="mdl-layout__tab">Comentários</a>`
			);

			innerHTML(this.querySelector("#page-content"), `
				<section id="informacoes" class="mdl-layout__tab-panel is-active"><carregando-conteudo></carregando-conteudo></section>
				<section id="comentarios" class="mdl-layout__tab-panel"><carregando-conteudo></carregando-conteudo></section>`);

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

				innerHTML(this.querySelector("#informacoes"), `
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

				this.carregarComentarios();
			});

			app.atualizarComponentes(this);

			this.refStyle = restyle({
				"#informacoes": {
					"padding": "15px"
				},
				".volume-imagem": {
					"min-width": "100px",
					"min-height": "150px",
					"text-align": "center"
				},
				"#informacoes h3": {
					"display": "block",
					"padding": "0",
					"margin": "20px 0 5px",
					"font-size": "22px",
					"line-height": "22px"
				},
				"#informacoes h4": {
					"display": "block",
					"padding": "0",
					"margin": "0 0 15px",
					"font-size": "18px",
					"line-height": "18px",
					"color": "#999"
				},
				"#informacoes .rating": {
					"margin-top": "5px"
				},
				"#informacoes .shop": {
					"margin": "30px 0 0",
					"display": "table",
					"width": "100%"
				},
				"#informacoes .shop div": {
					"padding": "0 5px",
					"display": "table-cell",
					"text-align": "center"
				},
				"#informacoes .shop img": {
					"padding": "3px 10px",
					"height": "25px"
				},
				"#comentarios .mdl-button--fab": {
					"position": "fixed",
					"right": "25px",
					"bottom": "25px"
				},
				"#comentarios .mdl-list__item-text-body a": {
					"color": "#999"
				},
				"#comentarios .mdl-list__item-secondary-content": {
					"display": "inline-block",
					"text-align": "center"
				},
				"#comentarios .mdl-list__item-secondary-content a": {
					"display": "block"
				},
				"#comentarios .acao-avaliar-comentario:not(.avaliacao-positiva) i": {
					"color": "#999"
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

		carregarComentarios() {
			innerHTML(this.querySelector("#comentarios"), "<carregando-conteudo></carregando-conteudo>");
			app.atualizarComponentes(this);

			api.get(`/comentarios/volume/${this.volume.id}/usuario/${auth.getUser().id}`)
				.then((comentarios) => {
					console.log(comentarios);
					var lista = comentarios.map((response) => {
						var acoes = `<br /><a href="#" onclick="return false;" class="acao-responder-comentario" comentarioId="${response.id}">Responder</a>`;

						if (response.id_usuario == auth.getUser().id) {
							acoes += `
								- <a href="#" onclick="return false;" class="acao-editar-comentario" comentarioId="${response.id}">Editar</a>
								- <a href="#" onclick="return false;" class="acao-excluir-comentario" comentarioId="${response.id}">Excluir</a>`;
						}

						return `<li class="mdl-list__item mdl-list__item--three-line">
									<span class="mdl-list__item-primary-content">
										<span>${utils.escapeHtml(response.usuario.apelido)}</span>
										<span class="mdl-list__item-text-body">
											${utils.escapeHtml(response.comentario)}
											${acoes}
										</span>
									</span>
									<span class="mdl-list__item-secondary-content">
										<a class="mdl-list__item-secondary-action acao-avaliar-comentario ${response.aprovado ? "avaliacao-positiva" : ""}" href="#" comentarioId="${response.id}" onclick="return false;"><i class="material-icons">thumb_up</i></a>
										<span class="numero-avaliacoes-positivas">${response.aprovacoes}</span>
									</span>
								</li>`;
					}).join("");

					innerHTML(this.querySelector("#comentarios"), `
						<div id="espaco-form-comentario"></div>
						<div id="espaco-exibicao-comentarios">
							<ul class="demo-list-three mdl-list">${lista}</ul>
							<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" id="acao-incluir-comentario">
								<i class="material-icons">add</i>
							</button>
						</div>`);

					app.atualizarComponentes(this);
					this.querySelector("#acao-incluir-comentario").addEventListener("click", this.exibirFormComentario.bind(this, 0, 0), false);

					Array.from(this.querySelectorAll(".acao-avaliar-comentario")).forEach((element) => {
						element.addEventListener("click", () => {
							this.avaliarComentario(element.getAttribute("comentarioId"), !element.classList.contains("avaliacao-positiva"));
						}, false);
					});

					Array.from(this.querySelectorAll(".acao-editar-comentario")).forEach((element) => {
						element.addEventListener("click", this.exibirFormComentario.bind(this, element.getAttribute("comentarioId"), 0), false);
					});

					Array.from(this.querySelectorAll(".acao-excluir-comentario")).forEach((element) => {
						element.addEventListener("click", this.excluirComentario.bind(this, element.getAttribute("comentarioId")), false);
					});
				});
		}

		exibirFormComentario(idComentario = 0, idComentarioPai = 0) {
			this.querySelector("#espaco-exibicao-comentarios").classList.add("hide");

			innerHTML(this.querySelector("#espaco-form-comentario"), `
				<form id="formComentario" onsubmit="return false;" class="form-full-width">
					<input type="hidden" name="id_comentario" id="id_comentario" />
					<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<textarea class="mdl-textfield__input" type="text" rows="3" id="comentario" name="comentario"></textarea>
						<label class="mdl-textfield__label" for="comentario">Comentário</label>
					</div>
					<div class="actions">
						<button type="button" id="btn-salvar-comentario" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">${idComentario > 0 ? "Salvar" : "Incluir"}</button>
						<button type="button" id="btn-cancelar-comentario" class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancelar</button>
					</div>
				</form>`);

			if (idComentarioPai > 0) {
				this.querySelector("#id_comentario").value = idComentarioPai;
			}

			if (idComentario > 0) {
				api.get(`/comentarios/${idComentario}`).then((comentario) => {
					utils.fillFormValues("formComentario", comentario);
					app.atualizarComponentes(this);
					this.querySelector("#formComentario .mdl-textfield--floating-label").classList.add("is-dirty");
				});
			}

			app.atualizarComponentes(this);

			this.querySelector("#btn-salvar-comentario").addEventListener("click", () => {
				var dados = utils.getFormValues("formComentario");
				this.ocultarFormComentario(false);

				innerHTML(this.querySelector("#comentarios"), "<carregando-conteudo></carregando-conteudo>");
				app.atualizarComponentes(this);

				var salvar;
				if (idComentario > 0) {
					salvar = api.edit(`/comentarios/${idComentario}/usuario/${auth.getUser().id}`, dados);
				} else {
					salvar = api.add(`/comentarios/volume/${this.volume.id}/usuario/${auth.getUser().id}`, dados);
				}

				salvar.then(null, () => null).then(this.carregarComentarios.bind(this));
			}, false);

			this.querySelector("#btn-cancelar-comentario").addEventListener("click", this.ocultarFormComentario.bind(this, true), false);
		}

		ocultarFormComentario(attComponentes = true) {
			innerHTML(this.querySelector("#espaco-form-comentario"), "");
			this.querySelector("#espaco-exibicao-comentarios").classList.remove("hide");

			if (attComponentes) {
				app.atualizarComponentes(this);
			}
		}

		excluirComentario(comentarioId) {
			if (confirm("Confirma a exclusão deste comentário?")) {
				innerHTML(this.querySelector("#comentarios"), "<carregando-conteudo></carregando-conteudo>");
				app.atualizarComponentes(this);
				api.delete(`/comentarios/${comentarioId}/usuario/${auth.getUser().id}`).then(null, () => null).then(this.carregarComentarios.bind(this));
			}
		}

		avaliarComentario(comentarioId, aprovacao) {
			api.edit(`/comentarios/${comentarioId}/usuario/${auth.getUser().id}/aprovacao/${aprovacao ? 1 : 0}`);
			var indicadorAprovacao = this.querySelector(`.acao-avaliar-comentario[comentarioId="${comentarioId}"]`);
			var indicadorNroAprovados = indicadorAprovacao.parentNode.querySelector(".numero-avaliacoes-positivas");

			if (aprovacao) {
				indicadorAprovacao.classList.add("avaliacao-positiva");
				indicadorNroAprovados.innerHTML = parseInt(indicadorNroAprovados.innerHTML) + 1;
			} else {
				indicadorAprovacao.classList.remove("avaliacao-positiva");
				indicadorNroAprovados.innerHTML = parseInt(indicadorNroAprovados.innerHTML) - 1;
			}
		}

	};

	customElements.define("page-volume", pages.PageVolume);

}( window.pages, window.customElements, window.innerHTML, window.app, window.history, window.utils, window.api, window.restyle ));