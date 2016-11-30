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
			var item = elements.item(i);
			obj[item.name] = item.value;
		}

		return obj;
	},

	fillFormValues(idForm, data) {
		var form = document.getElementById(idForm);
		var element;

		for (var id in data) {
			element = form.querySelector("#" + id);
			console.log(id);

			if (element && ["input", "select"].indexOf(element.tagName) >= 0) {
				element.value = data[id];
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