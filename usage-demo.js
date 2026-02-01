// Copyright (c) 2026 YiSen Luo 罗亦森
// Licensed under the MIT License.

const hook = require(".");

hook.start((type, eventType, x, y) => {
  if (type === "key") {
    console.log("Key:", eventType, x, y);
  } else if (type === "mouse") {
    console.log("Mouse:", eventType, x, y);
  }
});

console.log("Hook started");
setInterval(() => {}, 1000);
