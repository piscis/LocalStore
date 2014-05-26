'use strict';
var LocalStore = (function () {
	function LocalStore() {
		var hasStorage = (function () {
			try  {
				localStorage.setItem('storage', 'storage');
				localStorage.removeItem('storage');
				return true;
			} catch (e) {
				return false;
			}
		})();

		var hasJson = (typeof window.JSON === 'object' && typeof JSON.parse === 'function' && typeof JSON.stringify === 'function');

		if (!(hasStorage && hasJson)) {
			if (!(hasStorage || hasJson)) {
				throw 'Your browser does not seem to support JSON parsing or local storage.';
			} else if (!hasStorage) {
				throw 'Your browser does not seem to support local storage.';
			} else {
				throw 'Your browser does not seem to support JSON parsing.';
			}
		}
	}
	LocalStore.prototype.clear = function (key) {
		if (key) {
			localStorage.removeItem(key);
		} else {
			localStorage.clear();
		}
	};

	LocalStore.prototype.hasKey = function (key) {
		if (!key || key === '') {
			throw 'you must provide a key';
		}
		return key in localStorage;
	};

	LocalStore.prototype.load = function (key) {
		if (key) {
			var value = localStorage[key];

			try  {
				return window.JSON.parse(value);
			} catch (ex) {
				return value;
			}
		} else {
			throw 'you must provide a key.';
		}
	};

	LocalStore.prototype.save = function (key, value) {
		if (key && (value || value == '')) {
			try  {
				localStorage[key] = window.JSON.stringify(value);
			} catch (ex) {
				localStorage[key] = value;
			}
		} else {
			throw 'you must provide both a key and a value.';
		}
	};
	return LocalStore;
})();
//# sourceMappingURL=LocalStore.js.map
