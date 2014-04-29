LocalStore
==========

LocalStore is a small javascript library designed to make working with HTML5 Local Storage a breeze. By default, HTML5's Local Storage API only allows you to store string values. This application will serialize JavaScript objects to a string upon storage and deserialize it upon retireval. It does not however break Local Storage's native ability to store string objects.

It is designed to be lightweight and simple and mirror the default behavior of the HTML5 Local Storage API. It uses a simple key/value model to store and retrieve data.

Usage
-----
To get started simply instantiate the library.

```javascript
var ls = new LocalStore();
```

Once instantiated, there are four methods that can be used:

###save
```save``` takes two parameters the ```key``` parameter is the lookup key that will be used to retrieve the data. Be careful, if a key already exists this method will override it. The ```value``` parameter is the data to be stored. This can be a JavaScript object or a string value.

```javascript
ls.save('jsonObject', {name: 'value'});
ls.save('str', 'a string');
```

###load
```load``` takes only one parameter, ```key```. This should be the same key that was used with the ```save``` method to save the data.

```javascript
var jsonObject = ls.load('jsonObject');
var str = ls.load('str');
```

###clear
```clear``` can be used in two different ways. If not provided with a parameter, clear will clear *everything* in Local Storage.

```javascript
ls.clear();
```

```clear``` can also take a ```key``` parameter. If provided with a key, ```clear``` will only clear the value for the provided key leaving the rest of local storage intact.

```javascript
ls.clear('jsonObject');
ls.clear('str');
```

###hasKey
```hasKey``` can be used to check if a key exists in local storage without actually loading and deserializing the value.

```javascript
var exists = ls.hasKey('jsonObject');
```


Building The Source
-------------------

If you would like to build the source yourself you will need [node.js](http://nodejs.org/) and [Node Package Manager](https://www.npmjs.org/) (npm).

From the project's root directory, run ```npm install``` to install the project's build dependencies. Then simply run ```grunt``` to build compile the TypeScript and watch for changes.
