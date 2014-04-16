'use strict';

class LocalStore {
  /// <summary>
  /// Interact with localStorage
  /// </summary>

  constructor() {
    var hasStorage : boolean = (function () {
      try {
        localStorage.setItem('storage', 'storage');
        localStorage.removeItem('storage');
        return true;
      } catch (e) {
        return false;
      }
    }());
    var hasJson : boolean = (typeof window.JSON === 'object' && typeof JSON.parse === 'function');

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
  }

  clear(key : string) {
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

  hasKey(key : string) : boolean {
  	/// <summary>
  	/// See if local storage has a specific key.
  	/// </summary>
  	/// <param name="key">The key to lookup.</param>
  	/// <returns>true if the key exists in local storage, false if not.</returns>
  	if (!key) {
  		return false;
  	}
  	return key in localStorage;
  }

  load(key : string) : any {
  	/// <summary>
  	/// Load an object from local storage.
  	/// </summary>
  	/// <param name="key">The key to lookup.</param>
  	/// <returns>The value stored in local storage.  As JSON if it is not a string.</returns>
  	if (key) { // make sure we have been given a key to load
  		// the value stored in local storage
  		var value = localStorage[key];

  		try {
  			return window.JSON.parse(value);
  		} catch (ex) {
  			return value;
  		}
  	} else {
  		throw 'you must provide a key';
  	}
  }

  save(key : string, value : any) {
  	/// <summary>
  	/// Save an object to localStorage
  	/// </summary>
  	/// <param name="key">The key to store the value with.</param>
  	/// <param name="value">The object or string to store.</param>
  	if (key && value) {
  		try {
  			localStorage[key] = window.JSON.stringify(value);
  		} catch (ex) {
  			localStorage[key] = value;
  		}
  	} else {
  		throw 'you must provide both a key and a value';
  	}
  }

}
