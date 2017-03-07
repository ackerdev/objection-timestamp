# objection-timestamp
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

By default, objection-timestamp uses `createdAt` and `updatedAt` attributes for timestamping. You can optionally pass in an options object as the second argument to register to specify custom attributes to use for timestamps:

```js
objectionTimestamp.register(objection, {
  create: 'createdOn',
  update: 'updatedOn'
});
```

## Usage
Just set the `timestamp` static property on your model to true:

```js
class MyModel {
  static get timestamp() {
    return true;
  }
}
```

Before insert, the create and update timestamps on the model will be set to `new Date()`. If the timestamps are already set on the model, they will not be overwritten.

Before update, the update timestamp on the model will be set to `new Date()`.
