'use strict';

const normalizeTimestampConfig = require('./lib/normalize-timestamp-config');

module.exports = {
  register(objection, options = {}) {
    const {
      create = 'createdAt',
      update = 'updatedAt'
    } = options;

    class TimestampedModel extends objection.Model {
      $beforeInsert(...args) {
        return Promise.resolve(super.$beforeInsert(...args))
        .then(() => {
          const timestamp = normalizeTimestampConfig(this.constructor.timestamp);

          if (timestamp.create && this[create] === undefined) {
            this[create] = new Date();
          }

          if (timestamp.update && this[update] === undefined) {
            this[update] = new Date();
          }
        });
      }

      $beforeUpdate(...args) {
        return Promise.resolve(super.$beforeUpdate(...args))
        .then(() => {
          const timestamp = normalizeTimestampConfig(this.constructor.timestamp);

          if (timestamp.update) {
            this[update] = new Date();
          }
        });
      }
    }

    objection.Model = TimestampedModel;
  }
};
