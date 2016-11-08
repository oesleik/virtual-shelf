var auth = {

	setUser(user) {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	},

	getUser() {
		var user = localStorage.getItem("user");

		try {
			user = JSON.parse(user);
			return user.id > 0 ? user : false;
		} catch (e) {
			return false;
		}
	},

	isUser() {
		return this.getUser() !== false;
	},

	isGuest() {
		return this.getUser() === false;
	}

};