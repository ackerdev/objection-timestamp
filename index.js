'use strict';

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
          const { timestamp } = this.constructor;

          if (timestamp && this[create] === undefined) {
            this[create] = new Date();
          }

          if (timestamp && this[update] === undefined) {
            this[update] = new Date();
          }
        });
      }

      $beforeUpdate(...args) {
        return Promise.resolve(super.$beforeUpdate(...args))
        .then(() => {
          const { timestamp } = this.constructor;

          if (timestamp) {
            this[update] = new Date();
          }
        });
      }
    }

    objection.Model = TimestampedModel;
  }
};
