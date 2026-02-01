// Copyright (c) 2026 YiSen Luo 罗亦森
// Licensed under the MIT License.

const ELECTRON_VERSIONS = [
  "22.3.27", // 最后一个支持 Win7 的版本
  "23.3.13",
  "24.8.3",
  "25.9.0",
  "26.2.0",
  "27.3.0",
  "28.2.0",
  "29.4.0",
  "30.5.1",
  "31.0.0",
];
const nodeAbi = require("node-abi");
const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const cwd = process.cwd();

const config = require(path.join(cwd, "package.json"));

const build_tar_dir = path.join(cwd, "build_tar");
if (fs.existsSync(build_tar_dir)) {
  fs.rmdirSync(build_tar_dir, { recursive: true });
}
fs.mkdirSync(build_tar_dir, { recursive: true });

for (const ev of ELECTRON_VERSIONS) {
  // node-gyp
  const result = spawnSync(
    "node-gyp",
    ["rebuild", `--target=${ev}`, "--dist-url=https://electronjs.org/headers"],
    { stdio: "inherit", shell: true },
  );
  if (result.status !== 0) {
    console.error(`node-gyp rebuild failed for Electron ${ev}`);
    throw new Error(result.error);
  }

  // tar
  const abi = nodeAbi.getAbi(ev, "electron");
  const targetFile = path.join(
    cwd,
    "build",
    "Release",
    "win32_mouse_keyboard_hook.node",
  );
  const outputFile = path.join(
    cwd,
    "build_tar",
    `win32_mouse_keyboard_hook-${config.version}-electron-v${abi}-win32-x64.tar.gz`,
  );

  const result2 = spawnSync(
    "tar",
    ["-czvf", outputFile, "-C", path.dirname(targetFile), targetFile],
    { stdio: "inherit", shell: true },
  );
  if (result2.status !== 0) {
    console.error(`tar failed for Electron ${ev}`);
    throw new Error(result2.error);
  }
}
