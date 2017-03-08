'use strict';

function normalizeTimestampConfig(timestamp = false) {
  return {
    create: timestamp.create === true || timestamp === true,
    update: timestamp.update === true || timestamp === true
  };
}

module.exports = normalizeTimestampConfig;
