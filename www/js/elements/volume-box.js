(function(elements, customElements, innerHTML, restyle, app) {
	"use strict";

	elements.VolumeBox = class extends elements.HTMLElement {

		connectedCallback() {
			this.volume = data.get(this.getAttribute("infoId"));

			if (this.volume != null) {
				innerHTML(this, `
					<img src="${this.volume.imagens.thumb_sm.caminho}" class="js-exibir-volume" />
					<h4 class="js-exibir-volume">${this.volume.titulo}</h4>
					<h5>${this.volume.autores.map((autor) => autor.nome).join(", ")}</h5>
					<div class="secondary">
						<div class="status">Lido <i class="material-icons">arrow_drop_down</i></div>
						<div class="rating">
							<i class="material-icons">star</i>
							<i class="material-icons">star</i>
							<i class="material-icons">star</i>
							<i class="material-icons">star</i>
							<i class="material-icons">star</i>
						</div>
					</div>
					<div class="clearfix"></div>`
				);

				app.atualizarComponentes(this);

				Array.from(this.querySelectorAll(".js-exibir-volume")).forEach((element) => {
					element.addEventListener("click", this.exibirVolume.bind(this), false);
				});
			}
		}

		exibirVolume() {
			app.goTo("volume/" + this.volume.id);
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
			"left": "110px"
		},
		"volume-box .status": {
			"font-size": "15px",
			"color": "#666"
		},
		"volume-box .status i": {
			"vertical-align": "bottom"
		}
	}, []);

	customElements.define("volume-box", elements.VolumeBox);

}( window.elements, window.customElements, window.innerHTML, window.restyle, window.app ));