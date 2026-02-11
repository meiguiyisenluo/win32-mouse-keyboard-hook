// Copyright (c) 2026 YiSen Luo 罗亦森
// Licensed under the MIT License.

const addon = require("node-gyp-build")(__dirname);
const { EventEmitter } = require("events");

let running = false;

const ee = new EventEmitter();

const on = (eventType, cb) => {
  return ee.on(eventType, cb);
};

const off = (eventType, cb) => {
  return ee.off(eventType, cb);
};

const start = (cb) => {
  if (running) return;
  running = true;
  return addon.start((...args) => {
    ee.emit(...args);
    return cb(...args);
  });
};

const stop = () => {
  running = false;
  return addon.stop();
};

module.exports = {
  start,
  start,
  stop,
  on,
  off,
};
