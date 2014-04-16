'use strict';
var LocalStore = (function () {
    /// <summary>
    /// Interact with localStorage
    /// </summary>
    function LocalStore() {
        var hasStorage = (function () {
            try  {
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
    }
    LocalStore.prototype.clear = function (key) {
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
    };

    LocalStore.prototype.hasKey = function (key) {
        /// <summary>
        /// See if local storage has a specific key.
        /// </summary>
        /// <param name="key">The key to lookup.</param>
        /// <returns>true if the key exists in local storage, false if not.</returns>
        if (!key) {
            return false;
        }
        return key in localStorage;
    };

    LocalStore.prototype.load = function (key) {
        /// <summary>
        /// Load an object from local storage.
        /// </summary>
        /// <param name="key">The key to lookup.</param>
        /// <returns>The value stored in local storage.  As JSON if it is not a string.</returns>
        if (key) {
            // the value stored in local storage
            var value = localStorage[key];

            try  {
                return window.JSON.parse(value);
            } catch (ex) {
                return value;
            }
        } else {
            throw 'you must provide a key';
        }
    };

    LocalStore.prototype.save = function (key, value) {
        /// <summary>
        /// Save an object to localStorage
        /// </summary>
        /// <param name="key">The key to store the value with.</param>
        /// <param name="value">The object or string to store.</param>
        if (key && value) {
            try  {
                localStorage[key] = window.JSON.stringify(value);
            } catch (ex) {
                localStorage[key] = value;
            }
        } else {
            throw 'you must provide both a key and a value';
        }
    };
    return LocalStore;
})();
//# sourceMappingURL=LocalStore.js.map
