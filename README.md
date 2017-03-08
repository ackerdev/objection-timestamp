# objection-timestamp
[![npm](https://img.shields.io/npm/v/objection-timestamp.svg)](https://www.npmjs.com/package/objection-timestamp)

Automatically set create and update timestamps on your Objection.js models.

## Installation
Install from npm:

```bash
npm install objection-timestamp
```

Register the plugin with an instance of objection:

```js
const objectionTimestamp = require('objection-timestamp');
objectionTimestamp.register(objection);
```


## Configuration
By default, objection-timestamp uses `createdAt` and `updatedAt` attributes for timestamping. You can optionally pass in an options object as the second argument to register to specify custom attributes to use for timestamps:

```js
objectionTimestamp.register(objection, {
  create: 'createdOn',
  update: 'updatedOn'
});
```

## Usage
When timestamps are enabled on a model, the appropriate timestamp attributes will be set to `new Date()` before insert and update actions.


### Enable timestamps for a model
Set the `timestamp` static property on your model to true:

```js
class MyModel {
  static get timestamp() {
    return true;
  }
}
```

### Enable only a specific timestamp for a model
You can set the `timestamp` static property to an object to enable or disable specific a timestamp:

```js
class MyModel {
  static get timestamp() {
    return {
      create: true,
      update: false
    }
  }
}
```

If either key is omitted it will be implicitly set to `false`.
