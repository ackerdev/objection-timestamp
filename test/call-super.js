'use strict';

import test from 'ava';
import Knex from 'knex';
import * as objection from 'objection';
import objectionTimestamp from '../';

const knex = Knex({});
objection.Model.knex(knex);
const origModelClass = objection.Model;

objectionTimestamp.register(objection);

class Model extends objection.Model {
}

test('Call super.$beforeInsert (synchronous)', async t => {
  origModelClass.prototype.$beforeInsert = function() {
    this.foo = true;
  };

  const model = new Model();
  await model.$beforeInsert();
  t.is(model.foo, true);
});

test('Call super.$beforeInsert (promise)', async t => {
  origModelClass.prototype.$beforeInsert = function() {
    return Promise.resolve()
    .then(() => {
      this.foo = true;
    });
  };

  const model = new Model();
  await model.$beforeInsert();
  t.is(model.foo, true);
});

test('Call super.$beforeUpdate (synchronous)', async t => {
  origModelClass.prototype.$beforeUpdate = function() {
    this.foo = true;
  };

  const model = new Model();
  await model.$beforeUpdate();
  t.is(model.foo, true);
});

test('Call super.$beforeUpdate (promise)', async t => {
  origModelClass.prototype.$beforeUpdate = function() {
    return Promise.resolve()
    .then(() => {
      this.foo = true;
    });
  };

  const model = new Model();
  await model.$beforeUpdate();
  t.is(model.foo, true);
});
