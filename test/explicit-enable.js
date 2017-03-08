'use strict';

import test from 'ava';
import Knex from 'knex';
import * as objection from 'objection';
import objectionTimestamp from '../';

const knex = Knex({});
objection.Model.knex(knex);
objectionTimestamp.register(objection);

class CreateTimestampOnly extends objection.Model {
  static get timestamp() {
    return { create: true };
  }
}

class UpdateTimestampOnly extends objection.Model {
  static get timestamp() {
    return { update: true };
  }
}

class ExplicitBothTimestamps extends objection.Model {
  static get timestamp() {
    return {
      create: true,
      update: true
    };
  }
}

class ExplicitNeitherTimestamp extends objection.Model {
  static get timestamp() {
    return {
      create: false,
      update: false
    };
  }
}

test('Create only on insert', async t => {
  const model = new CreateTimestampOnly();
  await model.$beforeInsert();
  t.true(model.createdAt instanceof Date);
  t.true(model.updatedAt === undefined);
});

test('Create only on update', async t => {
  const model = new CreateTimestampOnly();
  await model.$beforeUpdate();
  t.true(model.updatedAt === undefined);
});

test('Update only on insert', async t => {
  const model = new UpdateTimestampOnly();
  await model.$beforeInsert();
  t.true(model.createdAt === undefined);
  t.true(model.updatedAt instanceof Date);
});

test('Update only on update', async t => {
  const model = new UpdateTimestampOnly();
  await model.$beforeUpdate();
  t.true(model.updatedAt instanceof Date);
});

test('Explicitly set both on insert', async t => {
  const model = new ExplicitBothTimestamps();
  await model.$beforeInsert();
  t.true(model.createdAt instanceof Date);
  t.true(model.updatedAt instanceof Date);
});

test('Explicitly set both on update', async t => {
  const model = new ExplicitBothTimestamps();
  await model.$beforeUpdate();
  t.true(model.updatedAt instanceof Date);
});

test('Explicitly set neither on insert', async t => {
  const model = new ExplicitNeitherTimestamp();
  await model.$beforeInsert();
  t.true(model.createdAt === undefined);
  t.true(model.updatedAt === undefined);
});

test('Explicitly set neither on update', async t => {
  const model = new ExplicitNeitherTimestamp();
  await model.$beforeUpdate();
  t.true(model.updatedAt === undefined);
});
