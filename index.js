// Copyright (c) 2026 YiSen Luo 罗亦森
// Licensed under the MIT License.

const addon = require("node-gyp-build")(__dirname);

module.exports = {
  start: addon.start,
  stop: addon.stop,
};
