<!-- Copyright (c) 2026 YiSen Luo 罗亦森 -->
<!-- Licensed under the MIT License. -->

## What's this for

**需要点赞和工作（前端开发）**  
**邮箱：1402175410@qq.com**  
**need star & job(FE Developer)**  
**email：1402175410@qq.com**

An NPM library used for Node.js/Electron to listen to keyboard and mouse events at the Windows system level.

supported Electron verion:

- "22.3.27", // last LTS Win7 version
- "23.3.13",
- "24.8.3",
- "25.9.0",
- "26.2.0",
- "27.3.0",
- "28.2.0",
- "29.4.0",
- "30.5.1",
- "31.0.0",

## Usage

### install

```
npm i @lysyyds/win32-mouse-keyboard-hook
```

### import

```typescript
// createRequire in Vite-Electron
const require = createRequire(import.meta.url);
// require
const win32KeyboardHook = require("@lysyyds/win32-mouse-keyboard-hook");
// or import
// import win32KeyboardHook from "@lysyyds/win32-mouse-keyboard-hook";

// import types
import type {
  Callback,
  KeyboardEventType,
  MouseEventType,
} from "@lysyyds/win32-mouse-keyboard-hook";
```

### usage

### add listener using Nodejs EventEmitter(recommend)

```typescript
win32KeyboardHook.start();
// keyboard event
hook.on("key", (eventType, x, y) => {
  if (eventType == KeyboardEventType.KeyDown) {
    // keydown
    x; // keycode
  } else if (eventType == KeyboardEventType.KeyUp) {
    // keyup
    x; // keycode
  }
});

// mouse event
hook.on("mouse", (eventType, x, y) => {
  x; // mouse position x
  y; // mouse position y

  if (eventType == MouseEventType.LeftDown) {
    // mouse left button down
  } else if (eventType == MouseEventType.LeftUp) {
    // mouse left button up
  } else if (eventType == MouseEventType.RightDown) {
    // mouse right button down
  } else if (eventType == MouseEventType.RightUp) {
    // mouse right button up
  } else if (eventType == MouseEventType.Wheel) {
    // wheel active
  }
});

// when you need to stop
win32KeyboardHook.stop();
```

### add listener at initial

```typescript
const callback: Callback = (type, eventType, x, y) => {
  const [type, eventType, x, y] = args;
  if (type === "key") {
    // keyboard event
    if (eventType == 1) {
      // keydown
      x; // keycode
    } else if (eventType == 2) {
      // keyup
      x; // keycode
    }
  } else if (type === "mouse") {
    x; // mouse position x
    y; // mouse position y

    if (eventType == 2) {
      // mouse left button down
    } else if (eventType == 3) {
      // mouse left button up
    } else if (eventType == 4) {
      // mouse right button down
    } else if (eventType == 5) {
      // mouse right button up
    } else if (eventType == 6) {
      // wheel active
    }
  }
};

win32KeyboardHook.start(callback);
```

types

```typescript

export enum Win32KeyCode {
  // 控制键
  BACK = 8,
  TAB = 9,
  ENTER = 13,
  SHIFT = 16,      // VK_SHIFT（泛用）
  CTRL = 17,       // VK_CONTROL（泛用）
  ALT = 18,        // VK_MENU（泛用）
  PAUSE = 19,
  CAPSLOCK = 20,
  ESC = 27,
  SPACE = 32,
  PAGE_UP = 33,
  PAGE_DOWN = 34,
  END = 35,
  HOME = 36,
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
  INSERT = 45,
  DELETE = 46,

  // 数字键（主键盘）
  KEY_0 = 48,
  KEY_1 = 49,
  KEY_2 = 50,
  KEY_3 = 51,
  KEY_4 = 52,
  KEY_5 = 53,
  KEY_6 = 54,
  KEY_7 = 55,
  KEY_8 = 56,
  KEY_9 = 57,

  // 字母键
  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90,

  // Win 键
  LWIN = 91,
  RWIN = 92,
  APPS = 93,

  // 小键盘
  NUMPAD0 = 96,
  NUMPAD1 = 97,
  NUMPAD2 = 98,
  NUMPAD3 = 99,
  NUMPAD4 = 100,
  NUMPAD5 = 101,
  NUMPAD6 = 102,
  NUMPAD7 = 103,
  NUMPAD8 = 104,
  NUMPAD9 = 105,

  MULTIPLY = 106,
  ADD = 107,
  SUBTRACT = 109,
  DECIMAL = 110,
  DIVIDE = 111,

  // 功能键
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,

  NUMLOCK = 144,
  SCROLL = 145,

  // 左右修饰键（区分左右）
  LSHIFT = 160,    // VK_LSHIFT
  RSHIFT = 161,    // VK_RSHIFT
  LCTRL = 162,     // VK_LCONTROL
  RCTRL = 163,     // VK_RCONTROL
  LALT = 164,      // VK_LMENU
  RALT = 165,      // VK_RMENU

  // 符号 / OEM 键（以美式键盘为参考）
  OEM_1 = 186,     // ; :
  OEM_PLUS = 187,  // = +
  OEM_COMMA = 188, // , <
  OEM_MINUS = 189, // - _
  OEM_PERIOD = 190,// . >
  OEM_2 = 191,     // / ?
  OEM_3 = 192,     // ` ~
  OEM_4 = 219,     // [ {
  OEM_5 = 220,     // \ |
  OEM_6 = 221,     // ] }
  OEM_7 = 222,     // ' "
}

export enum EventType {
  MOUSE = "mouse",
  KEY = "key",
}

export enum KeyboardEventType {
  KeyDown = 1,
  KeyUp = 2,
}

export enum MouseEventType {
  Move = 1,
  LeftDown = 2,
  LeftUp = 3,
  RightDown = 4,
  RightUp = 5,
  Wheel = 6,
}

export type Callback = (
  type: EventType,
  eventType: number,
  x: number,
  y: number,
) => void;

export function start(callback?: Callback): void;
export function stop(): void;

export type KeyboardEventCallbackArgs = [
  eventType: KeyboardEventType,
  keyCode: Win32KeyCode,
];
export type KeyboardEventCallback = (
  ...args: KeyboardEventCallbackArgs
) => void;

export type MouseEventCallbackArgs = [
  eventType: MouseEventType,
  x: number,
  y: number,
];
export type MouseEventCallback = (...args: MouseEventCallbackArgs) => void;
export function on(event: "key", handler: KeyboardEventCallback): void;
export function on(event: "mouse", handler: MouseEventCallback): void;
export function off(event: "key", handler: KeyboardEventCallback): void;
export function off(event: "mouse", handler: MouseEventCallback): void;

declare const _default: {
  start: typeof start;
  stop: typeof stop;
  on: typeof on;
  off: typeof off;
};

export default _default;
```

## Build yourself

Before starting, please configure the development environment: desktop development using C++/Windows 10/11 SDK/Python 3, and then run `npm run build-all`

```
**********************************************************************
** Visual Studio 2026 Developer Command Prompt v18.2.1
** Copyright (c) 2025 Microsoft Corporation
**********************************************************************
[DEBUG:ext\vcvars.bat] Found potential v145 version file: 'Microsoft.VCToolsVersion.VC.14.50.18.0.txt'
[DEBUG:ext\vcvars.bat] Testing v145 version file: 'Microsoft.VCToolsVersion.VC.14.50.18.0.txt'

C:\Program Files (x86)\Microsoft Visual Studio\18\BuildTools>D:

D:\>cd sourcecode

D:\sourcecode>cd win32-keyboard-hook

D:\sourcecode\win32-keyboard-hook>cl
用于 x86 的 Microsoft (R) C/C++ 优化编译器 19.50.35723 版
版权所有(C) Microsoft Corporation。保留所有权利。

用法: cl [ 选项... ] 文件名... [ /link 链接选项... ]

D:\sourcecode\win32-keyboard-hook>python --version
Python 3.14.2

D:\sourcecode\win32-keyboard-hook>npm i

D:\sourcecode\win32-keyboard-hook>npm run build-all
```
