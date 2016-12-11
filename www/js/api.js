var api = {

	baseUrl: "http://localhost/virtual-shelf/public_html/api/v1",

	get(path) {
		return this.request(path, "GET");
	},

	add(path, data) {
		return this.request(path, "POST", data);
	},

	edit(path, data) {
		return this.request(path, "PUT", data);
	},

	delete(path) {
		return this.request(path, "DELETE");
	},

	request(path, method, data) {
		var config = { method };

		if (method !== "GET" && method !== "HEAD") {
			data = JSON.stringify(data || {});
			config.body = data;
		}

		return fetch(this.baseUrl + path, config).then(this.parseResponse);
	},

	parseResponse(response) {
		if (response.ok) {
			return response.text()
				.then(function(text) {
					try {
						var json = JSON.parse(text);
						return json.status === 200 ? json.message : Promise.reject(json.error || "Erro na resposta do servidor");
					} catch (e) {
						return Promise.reject(text);
					}
				});
		} else {
			return Promise.reject("Erro ao executar chamada ao servidor");
		}
	}

};