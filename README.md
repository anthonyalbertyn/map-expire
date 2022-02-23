# map-expire

A data structure that extends JavaScript Map class (map Object) to add functionality to allow keys to expire and their key values to be automatically removed from the data structure. Set one expiry time for the data structure keys and provide an optional callback to further process removed expired items.

MIT License, see LICENSE for more details

## Use cases

* Use case 1: A simple queue that needs to get rid of old items
* Use case 2: A key-value store that needs to get rid of old items

## Getting started

```npm install @anthonyalbertyn/map-expire```

``` 
    const MapExpire = require("@anthonyalbertyn/map-expire");

    const expireInMilliseconds = 1000;

    const myOptionalCallback((key, value) => {
        // do something with the key and value
        // after it has automatically expired
        // and removed from the Map
    });

    // initialise data structure
    const myMap = new MapExpire(expireInMilliseconds, myOptionalCallback);

    // add data
    const key = "foo";
    const value = "Bar";

    myMap.set(key, value);

    // alias of set
    myMap.push(key, value);

    // in this case, key will be the same as the value
    myMap.push(value);

    // iterate over data same as Map class
    myMap.forEach((item) => {
        console.log(item);
    });

    // get value for a key
    const result = myMap.get("foo);

    // alias of delete
    myMap.remove("foo");
    myMap.delete("foo"); 


    // alias of has
    console.log(myMap.contains("foo"));
    console.log(myMap.has("foo"));

    // clear all value
    myMap.clear();

    // get all keys
    const keys = myMap.keys();

    // get all values
    const values = myMap.values();

    // get all key, value pairs
    const keyValuePairs = myMap.entries();

```

## More information

Supports all features of the Map Object. For more information about the Map Object, including available methods, see [[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map]]

## Maintainers

There is currently only one maintainer, Anthony Albertyn, and the plan is to keep this module simple, lightweight and if possible, resist adding more features unless there are good reasons to do so.
