describe('core functionality', function() {

    var ls = new LocalStore();

    afterEach(function() {
        ls.clear();
    });

    describe('clear method', function() {

        beforeEach(function() {
            ls.save('key1', 'abc');
            ls.save('key2', 'def');
        });

        it('must clear a single key, but keep other keys when passed a parameter', function() {
            expect(ls.hasKey('key1')).toBe(true);
            expect(ls.hasKey('key2')).toBe(true);
            ls.clear('key1');
            expect(ls.hasKey('key1')).toBe(false);
            expect(ls.hasKey('key2')).toBe(true);
        });

        it('must clear all keys if no parameter proveded', function() {
            expect(ls.hasKey('key1')).toBe(true);
            expect(ls.hasKey('key2')).toBe(true);
            ls.clear();
            expect(ls.hasKey('key1')).toBe(false);
            expect(ls.hasKey('key2')).toBe(false);
        });

    });

    describe('hasKey method', function() {
        it('must return a boolean for if a key exists', function() {
            ls.save('key1', 'key');
            expect(ls.hasKey('key1')).toBe(true);
            expect(ls.hasKey('key2')).toBe(false);
        });

        it('must return true for a key with an empty string', function() {
            ls.save('emptyKey', '');
            expect(ls.hasKey('emptyKey')).toBe(true);
        });

        it('must throw an error if not passed a key', function() {
            expect(function() {
                ls.hasKey();
            }).toThrow();
        });

        it('must throw an error if passed an empty key', function() {
            expect(function() {
                ls.hasKey('');
            }).toThrow();
        });

    });


    describe('load/save method', function() {

        it('must save and retrieve string data', function() {
            var strToSave = 'test string';
            ls.save('aString', strToSave);
            expect(ls.load('aString')).toBe(strToSave);
        });

        it('must save and retrieve JavaScript objects', function() {
            var objectToSave = {
                property: 'value'
            };
            ls.save('object', objectToSave);
            var loadedObject = ls.load('object');
            expect(loadedObject.property).toBe(objectToSave.property);
        });

        it('must save and retrieve empty string', function() {
            ls.save('key', '');
            expect(ls.load('key')).toBe('');
        });

        describe('save method', function() {

            it('must allow overriding saved values with the same key', function() {
                var value1 = 'value1',
                    value2 = 'value2';
                ls.save('key', value1);
                expect(ls.load('key')).toBe(value1);
                ls.save('key', value2);
                expect(ls.load('key')).toBe(value2);
            });

            it('must throw an error if not passed a key or a value', function() {
                expect(function() {
                    ls.save();
                }).toThrow();
            });

            it('must throw if not passed a key', function() {
                expect(function() {
                    ls.save(null, 'value');
                }).toThrow();
            });

            it('must throw an error if passed an empty key', function() {
                expect(function() {
                    ls.save('', 'value');
                });
            });

            it('must throw if not passed a value', function() {
                expect(function() {
                    ls.save('key');
                }).toThrow();
            });

        });

        describe('load method', function() {

            it('must throw an error if not passed a key', function() {
                expect(function() {
                    ls.load();
                }).toThrow();
            });

        });

    });

});

describe('feature detection', function() {

    describe('detect local storage', function() {

        it('must throw if localStorage.setItem throws', function() {
            spyOn(localStorage, 'setItem').and.throwError('nope');
            expect(function() {
                var ls = new LocalStore();
            }).toThrow('Your browser does not seem to support local storage.');
        });

        it('must throw if localStorage.setItem throws', function() {
            spyOn(localStorage, 'removeItem').and.throwError('nope');
            expect(function() {
                var ls = new LocalStore();
            }).toThrow('Your browser does not seem to support local storage.');
        });

    });

    describe('detect JSON', function() {

        it('must throw if JSON is not an object', function() {
            spyOn(window, 'JSON').and.returnValue('not an object');
            expect(function() {
                var ls = new LocalStore();
            }).toThrow('Your browser does not seem to support JSON parsing.');
        });

    });

});
