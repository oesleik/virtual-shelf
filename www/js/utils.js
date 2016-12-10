var utils = {

	debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	},

	getFormValues(idForm) {
		var elements = document.getElementById(idForm).elements;
		var obj = {};

		for (var i = 0; i < elements.length; i++) {
			var element = elements.item(i);
			var tagName = element && element.name.length ? element.tagName : "";

			if (tagName.length) {
				var type = tagName === "INPUT" ? element.getAttribute("type") : "";

				if (["checkbox", "radio"].indexOf(type) >= 0) {
					obj[element.name] = element.checked;
				} else {
					obj[element.name] = element.value;
				}
			}
		}

		return obj;
	},

	fillFormValues(idForm, data) {
		var form = document.getElementById(idForm);
		var element;

		for (var id in data) {
			element = form.querySelector("#" + id);
			var tagName = element && element.name.length ? element.tagName : "";

			if (tagName.length) {
				var type = tagName === "INPUT" ? element.getAttribute("type") : "";

				if (["checkbox", "radio"].indexOf(type) >= 0) {
					element.checked = !!data[id];
				} else {
					element.value = data[id];
				}
			}
		}
	},

	escapeHtml(html) {
		return html
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}

};