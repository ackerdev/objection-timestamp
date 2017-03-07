'use strict';

import test from 'ava';
import Knex from 'knex';
import * as objection from 'objection';
import objectionTimestamp from '../';

const knex = Knex({});
objection.Model.knex(knex);
objection.Model.prototype.$beforeInsert = function() {
  return Promise.resolve()
  .then(() => {
    this.superInsertProperty = true;
  });
}
objection.Model.prototype.$beforeUpdate = function() {
  return Promise.resolve()
  .then(() => {
    this.superUpdateProperty = true;
  });
}

objectionTimestamp.register(objection);

class Model extends objection.Model {
}

test('Call super.$beforeInsert', async t => {
  const model = new Model();
  await model.$beforeInsert();
  t.is(model.superInsertProperty, true);
});

test('Call super.$beforeUpdate', async t => {
  const model = new Model();
  await model.$beforeUpdate();
  t.is(model.superUpdateProperty, true);
});
