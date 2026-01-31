// const path = require("path");
// const addon = require(
//   path.join(__dirname, "build", "Release", "keyboard_hook.node"),
// );

// module.exports = {
//   start: addon.start,
//   stop: addon.stop,
// };

const addon = require("node-gyp-build")(__dirname);

module.exports = {
  start: addon.start,
  stop: addon.stop,
};
