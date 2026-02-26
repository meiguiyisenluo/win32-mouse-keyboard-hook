// Copyright (c) 2026 YiSen Luo 罗亦森
// Licensed under the MIT License.

const hook = require(".");

hook.start((type, eventType, x, y) => {
  if (type === "key") {
    console.log("key:", eventType, x, y);
  } else if (type === "mouse") {
    console.log("mouse:", eventType, x, y);
  }
});

hook.on("key", (eventType, x, y) => {
  console.log("key1:", eventType, x, y);
});

hook.on("key", (eventType, x, y) => {
  console.log("key2:", eventType, x, y);
});

hook.on("mouse", (eventType, x, y) => {
  console.log("mouse1:", eventType, x, y);
});

hook.on("mouse", (eventType, x, y) => {
  console.log("mouse2:", eventType, x, y);
});

console.log("Hook started");
setInterval(() => {
  hook.stop();
}, 100000);
