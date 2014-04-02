var LocalStorage = function () {
	/// <summary>
	/// Interact with localStorage
	/// </summary>

	function clear(key) {
		/// <signature>
		/// <summary>
		/// Clear a value with a specific key.
		/// </summary>
		/// <param name="key">The local storage key to clear.</param>
		/// </signature>
		/// <signature>
		/// <summary>
		/// Clear all local storage.
		/// </summary>
		/// </signature>
		if (key) {
			localStorage.removeItem(key);
		} else {
			localStorage.clear();
		}

	}

	function load(key, isString) {
		/// <summary>
		/// Load an object from local storage.
		/// </summary>
		/// <param name="key">The key to lookup.</param>
		/// <param name="isString">If the value is a string. (Default is false).</param>
		/// <returns>The value stored in local storage.  As JSON if it is not a string.</returns>
		if (key) { // make sure we have what we need to try to load

			// the value stored in local storage
			var value = localStorage[key];

			if (isString !== null && isString) { // is this value a string?
				return value;
			} else { // if not try to serialize it
				if (value && value.length > 0) {
					return window.JSON.parse(value);
				}
			}

		}
		return null; // guess something went wrong
	}

	function save(key, value, isString) {
		/// <summary>
		/// Save an object to localStorage
		/// </summary>
		/// <param name="key">The key to store the value with.</param>
		/// <param name="value">The object to store.</param>
		/// <param name="isString">If the object is a string. (Default is false).</param>
		if (value && key) {

			if (isString !== null && isString) {
				localStorage[key] = value;
			} else {
				localStorage[key] = window.JSON.stringify(value);
			}

		}
	}

	// Feature tests
	var hasStorage = (function () {
		try {
			localStorage.setItem('storage', 'storage');
			localStorage.removeItem('storage');
			return true;
		} catch (e) {
			return false;
		}
	}());
	var hasJson = (typeof window.JSON === 'object' && typeof JSON.parse === 'function');

	// throw errors if we are missing features
	if (!(hasStorage && hasJson)) {
		if (!(hasStorage || hasJson)) {
			throw 'Your browser does not seem to support JSON parsing or local storage.';
		} else if (!hasStorage) {
			throw 'Your browser does not seem to support local storage.';
		} else {
			throw 'Your browser does not seem to support JSON parsing.';
		}
	}

	return {
		/// <signature>
		/// <summary>
		/// Clear a value with a specific key.
		/// </summary>
		/// <param name="key">The local storage key to clear.</param>
		/// </signature>
		/// <signature>
		/// <summary>
		/// Clear all local storage.
		/// </summary>
		/// </signature>
		clear: clear,
		/// <summary>
		/// Load an object from local storage.
		/// </summary>
		/// <param name="key">The key to lookup.</param>
		/// <param name="isString">If the value is a string.</param>
		/// <returns>The value stored in local storage.  As JSON if it is not a string.</returns>
		load: load,
		/// <summary>
		/// Save an object to localStorage
		/// </summary>
		/// <param name="key">The key to store the value with.</param>
		/// <param name="value">The object to store.</param>
		/// <param name="isString">If the object is a string.</param>
		save: save
	};

};