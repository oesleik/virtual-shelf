(function(elements, customElements, innerHTML, restyle, app, api, auth) {
	"use strict";

	var uid = 0;
	var opcoes = ["Não lido", "Lendo", "Lido"];

	elements.VolumeSituacao = class extends elements.HTMLElement {

		connectedCallback() {
			this.volumeId = this.getAttribute("volumeId");
			this.classList.add("loading");
			this.exibirSituacoes();

			api.get(`/volumes/${this.volumeId}/usuario/${auth.getUser().id}/situacao`)
				.then((situacao) => {
					if (typeof situacao === "string" && situacao.length) {
						this.exibirSituacoes(situacao);
					}
				}, () => null)
				.then(() => {
					this.classList.remove("loading");
				});
		}

		exibirSituacoes(situacao) {
			situacao = typeof situacao === "string" ? situacao : "";
			situacao = opcoes.indexOf(situacao) >= 0 ? situacao : opcoes[0];
			uid++;

			var html = `
				<div id="btn-select-situacao-${uid}">
					${situacao} <i class="material-icons">arrow_drop_down</i>
				</div>
				<ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" for="btn-select-situacao-${uid}">
					${opcoes.map((opcao) => `<li class="mdl-menu__item alterar-situacao" situacao="${opcao}">${opcao}</li>`).join("")}
				</ul>`;

			innerHTML(this, html);
			app.atualizarComponentes(this);

			Array.from(this.querySelectorAll(".alterar-situacao")).forEach((element) => {
				element.addEventListener("click", this.atualizarSituacao.bind(this, element.getAttribute("situacao")), false);
			});
		}

		atualizarSituacao(situacao) {
			if (opcoes.indexOf(situacao) >= 0) {
				this.exibirSituacoes(situacao);
				api.edit(`/volumes/${this.volumeId}/usuario/${auth.getUser().id}/situacao/${situacao}`);
			}
		}

	};

	restyle({
		"volume-situacao": {
			"color": "#666",
			"font-size": "15px",
			"display": "inline-block",
			"transition": "opacity 0.2s"
		},
		"volume-situacao.loading": {
			"opacity": "0"
		},
		"volume-situacao i": {
			"vertical-align": "bottom"
		}
	}, []);

	customElements.define("volume-situacao", elements.VolumeSituacao);

}( window.elements, window.customElements, window.innerHTML, window.restyle, window.app, window.api, window.auth ));