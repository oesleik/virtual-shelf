(function(elements, customElements, innerHTML, restyle, app) {
	"use strict";

	elements.VolumeBox = class extends elements.HTMLElement {

		connectedCallback() {
			this.volume = data.get(this.getAttribute("infoId"));
			this.prateleiraId = this.getAttribute("prateleiraId");

			if (this.volume != null) {
				innerHTML(this, `
					<img src="${this.volume.imagens.thumb_sm.caminho}" class="js-exibir-volume" />
					<h4 class="js-exibir-volume">${this.volume.titulo}</h4>
					<h5>${this.volume.autores.map((autor) => autor.nome).join(", ")}</h5>
					<div class="secondary">
						<div class="status">
							<volume-situacao volumeId="${this.volume.id}"></volume-situacao>
						</div>
						${this.prateleiraId == null ? "" : `<div class="acao-remover-prateleira"><i class="material-icons">delete</i></div>`}
						<div class="rating">
							<volume-avaliacao volumeId="${this.volume.id}"></volume-avaliacao>
						</div>
					</div>
					<div class="clearfix"></div>`
				);

				app.atualizarComponentes(this);

				Array.from(this.querySelectorAll(".js-exibir-volume")).forEach((element) => {
					element.addEventListener("click", this.exibirVolume.bind(this), false);
				});

				Array.from(this.querySelectorAll(".acao-remover-prateleira")).forEach((element) => {
					element.addEventListener("click", this.removerVolume.bind(this), false);
				});
			}
		}

		exibirVolume() {
			app.goTo("volume/" + this.volume.id);
		}

		removerVolume() {
			if (confirm("Confirma a remoção do volume desta prateleira?")) {
				api.delete(`/prateleiras/${this.prateleiraId}/usuario/${auth.getUser().id}/volume/${this.volume.id}`);
				this.remove();
			}
		}

	};

	restyle({
		"volume-box": {
			"position": "relative",
			"margin": "15px",
			"display": "block"
		},
		"volume-box img": {
			"float": "left",
			"margin-right": "10px",
			"width": "100px",
			"height": "150px"
		},
		"volume-box h4": {
			"display": "-webkit-box",
			"-webkit-box-orient": "vertical",
			"-webkit-line-clamp": "2",
			"overflow": "hidden",
			"text-overflow": "ellipsis",
			"margin": "0",
			"padding": "5px 0 0",
			"font-size": "20px",
			"line-height": "20px",
			"max-height": "40px"
		},
		"volume-box h5": {
			"display": "block",
			"white-space": "nowrap",
			"overflow": "hidden",
			"text-overflow": "ellipsis",
			"margin": "0",
			"padding": "8px 0 10px",
			"font-size": "16px",
			"line-height": "16px",
			"color": "#999"
		},
		"volume-box .secondary": {
			"position": "absolute",
			"bottom": "3px",
			"left": "110px",
			"right": "15px"
		},
		"volume-box .status": {
			"font-size": "15px",
			"color": "#666"
		},
		"volume-box .status i": {
			"vertical-align": "bottom"
		},
		"volume-box .acao-remover-prateleira": {
			"float": "right",
			"color": "#666"
		}
	}, []);

	customElements.define("volume-box", elements.VolumeBox);

}( window.elements, window.customElements, window.innerHTML, window.restyle, window.app ));