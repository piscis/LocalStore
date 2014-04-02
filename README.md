LocalStore
==========

LocalStore is a small javascript library designed to make working with HTML5 Local Storage a breeze. By default, HTML5's Local Storage API only allows you to store string values. This application will serialize JavaScript objects to a string upon storage and deserialize it upon retireval. It does not however break Local Storage's native ability to store string objects.

It is designed to be lightweight and simple and mirror the default behavior of the HTML5 Local Storage API. It uses a simple key/value model to store and retrieve data.

Usage
-----
To get started simply instanciate the library.

```var ls = new LocalStore();```

Once instanciated, there are four methods that can be used:

###save
```save``` takes two parameters a ```key``` parameter is the lookup key that will be used to retrieve the data. Be careful, if a key already exists this method will override it.

```
ls.save('jsonObject', {name: 'value'});
ls.save('str', 'a string');
```

###load
```load``` takes only one parameter, ```key```. This should be the same key that was used with the ```save``` method to save the data.

```
var jsonObject = ls.load('jsonObject');
var str = ls.load('str');
```

###clear
```clear``` can be used in two different ways. If not provided with a parameter, clear will clear *everything* in Local Storage.

```
ls.clear();
```

```clear``` can also take a ```key``` parameter. If provided with a key, ```clear``` will only clear the value for the provided key leaving the rest of local storage intact.

```
ls.clear('jsonObject');
ls.clear('str');
```


###hasKey
```hasKey``` can be used to check if a key exists in local storage without actually loading and deserializing the value.

```
var exists = ls.hasKey('jsonObject');
```
