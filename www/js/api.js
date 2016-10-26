var api = {

	baseUrl: "http://localhost/~oeslei.250995/virtual-shelf/public_html/api/v1",

	get(path) {
		return fetch(this.baseUrl + path).then(this.parseResponse);
	},

	add(path, data) {
		return fetch(this.baseUrl + path, {
			method: "POST",
			body: data || {},
		}).then(this.parseResponse);
	},

	edit(path, data) {
		return fetch(this.baseUrl + path, {
			method: "PUT",
			body: data || {},
		}).then(this.parseResponse);
	},

	delete(path) {
		return fetch(this.baseUrl + path, {
			method: "DELETE"
		}).then(this.parseResponse);
	},

	parseResponse(response) {
		if (response.ok) {
			return response.json()
				.then(function(json) {
					return json.status == 200 ? json.message : Promise.reject(json.error || "Erro na resposta do servidor");
				});
		} else {
			return Promise.reject("Erro ao executar chamada ao servidor");
		}
	},

	parseError(error) {
		return error.message;
	}

};