'use strict';

import test from 'ava';
import Knex from 'knex';
import * as objection from 'objection';
import objectionTimestamp from '../';

const knex = Knex({});
objection.Model.knex(knex);
objectionTimestamp.register(objection);

class NoTimestampModel extends objection.Model {}

class TimestampModel extends objection.Model {
  static get timestamp() {
    return true;
  }
}

test('Do not timestamp on create if attributes unset', async t => {
  const model = new NoTimestampModel();
  await model.$beforeInsert();
  t.is(model.createdAt, undefined);
  t.is(model.updatedAt, undefined);
});

test('Do not timestamp on update if attributes unset', async t => {
  const model = new NoTimestampModel();
  await model.$beforeUpdate();
  t.is(model.createdAt, undefined);
  t.is(model.updatedAt, undefined);
});

test('Timestamp on create', async t => {
  const model = new TimestampModel();
  await model.$beforeInsert();
  t.true(model.createdAt instanceof Date);
  t.true(model.updatedAt instanceof Date);
});

test('Timestamp on update', async t => {
  const model = new TimestampModel();
  await model.$beforeUpdate();
  t.true(model.updatedAt instanceof Date);
});

test('Do not overwrite timestamps on create', async t => {
  const now = new Date(2000, 0);
  const model = TimestampModel.fromJson({ createdAt: now, updatedAt: now });
  await model.$beforeInsert();
  t.deepEqual(model.createdAt, now);
  t.deepEqual(model.updatedAt, now);
});

test('Overwrite timestamp on update', async t => {
  const old = new Date(2000, 0);
  const model = TimestampModel.fromJson({ updatedAt: old });
  await model.$beforeUpdate();
  t.notDeepEqual(model.updatedAt, old);
});
