(function(elements, customElements, innerHTML, restyle, app, api, auth) {
	"use strict";

	elements.VolumeAvaliacao = class extends elements.HTMLElement {

		connectedCallback() {
			this.volumeId = this.getAttribute("volumeId");
			this.classList.add("loading");
			this.exibirEstrelas();

			api.get(`/volumes/${this.volumeId}/usuario/${auth.getUser().id}/avaliacao`)
				.then((avaliacao) => {
					if (avaliacao > 0) {
						this.exibirEstrelas(avaliacao);
					}
				}, () => null)
				.then(() => {
					this.classList.remove("loading");
				});
		}

		exibirEstrelas(avaliacao) {
			avaliacao = avaliacao > 0 ? avaliacao : 0;
			var html = "";

			for (var i = 1; i <= 5; i++) {
				html += `<i class="material-icons star-avaliacao" valor="${i}">star${avaliacao >= i ? "" : "_border"}</i>`;
			}

			innerHTML(this, html);
			app.atualizarComponentes(this);

			Array.from(this.querySelectorAll(".star-avaliacao")).forEach((element) => {
				element.addEventListener("click", this.atualizarAvaliacao.bind(this, element.getAttribute("valor")), false);
			});
		}

		atualizarAvaliacao(avaliacao) {
			if (avaliacao > 0 && avaliacao <= 5) {
				this.exibirEstrelas(avaliacao);
				api.edit(`/volumes/${this.volumeId}/usuario/${auth.getUser().id}/avaliacao/${avaliacao}`);
			}
		}

	};

	restyle({
		"volume-avaliacao": {
			"display": "inline-block",
			"transition": "opacity 0.2s"
		},
		"volume-avaliacao.loading": {
			"opacity": "0"
		}
	}, []);

	customElements.define("volume-avaliacao", elements.VolumeAvaliacao);

}( window.elements, window.customElements, window.innerHTML, window.restyle, window.app, window.api, window.auth ));