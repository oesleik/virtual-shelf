(function(elements, customElements, innerHTML, restyle, app) {
	"use strict";

	elements.VolumeBox = class extends elements.HTMLElement {

		connectedCallback() {
			this.volume = data.get(this.getAttribute("infoId"));

			if (this.volume != null) {
				innerHTML(this, `
					<img src="${this.volume.imagens.thumb_sm.caminho}" />
					<h4>${this.volume.titulo}</h4>
					<h5>${this.volume.autores.map((autor) => autor.nome).join(", ")}</h5>
					<div class="status">Lido</div>
					<div class="rating">
						<i class="material-icons">star</i>
						<i class="material-icons">star</i>
						<i class="material-icons">star</i>
						<i class="material-icons">star</i>
						<i class="material-icons">star</i>
					</div>
					<div class="clearfix"></div>`
				);

				app.atualizarComponentes(this);
			}
		}

	};

	restyle({
		"volume-box": {
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
			"display": "block",
			"white-space": "nowrap",
			"overflow": "hidden",
			"text-overflow": "ellipsis",
			"margin": "0",
			"padding": "5px 0",
			"font-size": "20px",
			"line-height": "20px"
		},
		"volume-box h5": {
			"display": "block",
			"white-space": "nowrap",
			"overflow": "hidden",
			"text-overflow": "ellipsis",
			"margin": "0",
			"padding": "0 0 10px",
			"font-size": "16px",
			"line-height": "16px",
			"color": "#999"
		}
	}, []);

	customElements.define("volume-box", elements.VolumeBox);

}( window.elements, window.customElements, window.innerHTML, window.restyle, window.app ));