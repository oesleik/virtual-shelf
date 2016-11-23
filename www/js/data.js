var data = (function() {

	var storage = {};
	var uid = 0;

	function store(obj) {
		var id = uid++;
		storage[id] = obj;
		return id;
	}

	function get(id) {
		var obj = storage[id];
		storage[id] = null;
		return obj;
	}

	return { get, store };

}());