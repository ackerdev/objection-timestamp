'use strict';

import test from 'ava';
import Knex from 'knex';
import * as objection from 'objection';
import objectionTimestamp from '../';

const knex = Knex({});
objection.Model.knex(knex);
objectionTimestamp.register(objection, {
  create: 'createdOn',
  update: 'updatedOn'
});

class TimestampModel extends objection.Model {
  static get timestamp() {
    return true;
  }
}

test('Timestamp on create', async t => {
  const model = new TimestampModel();
  await model.$beforeInsert();
  t.true(model.createdOn instanceof Date);
  t.true(model.updatedOn instanceof Date);
});

test('Timestamp on update', async t => {
  const model = new TimestampModel();
  await model.$beforeUpdate();
  t.true(model.updatedOn instanceof Date);
});
