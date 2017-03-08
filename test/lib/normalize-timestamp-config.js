'use strict';

import test from 'ava';
import normalizeTimestampConfig from '../../lib/normalize-timestamp-config';

test('undefined', t => {
  const expected = { create: false, update: false };
  const actual = normalizeTimestampConfig();
  t.deepEqual(actual, expected);
});

test('false', t => {
  const expected = { create: false, update: false };
  const actual = normalizeTimestampConfig(false);
  t.deepEqual(actual, expected);
});

test('true', t => {
  const expected = { create: true, update: true };
  const actual = normalizeTimestampConfig(true);
  t.deepEqual(actual, expected);
});

test('create set to true', t => {
  const expected = { create: true, update: false };
  const actual = normalizeTimestampConfig({ create: true });
  t.deepEqual(actual, expected);
});

test('update set to true', t => {
  const expected = { create: false, update: true };
  const actual = normalizeTimestampConfig({ update: true });
  t.deepEqual(actual, expected);
});

test('create set to true, update set to false', t => {
  const expected = { create: true, update: false };
  const actual = normalizeTimestampConfig({ create: true, update: false });
  t.deepEqual(actual, expected);
});

test('update set to true, create set to false', t => {
  const expected = { create: false, update: true };
  const actual = normalizeTimestampConfig({ create: false, update: true });
  t.deepEqual(actual, expected);
});

test('both set to true', t => {
  const expected = { create: true, update: true };
  const actual = normalizeTimestampConfig({ create: true, update: true });
  t.deepEqual(actual, expected);
});

test('both set to false', t => {
  const expected = { create: false, update: false };
  const actual = normalizeTimestampConfig({ create: false, update: false });
  t.deepEqual(actual, expected);
});
