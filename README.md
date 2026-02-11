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
declare module "@lysyyds/win32-mouse-keyboard-hook" {
  export type EventType = "key" | "mouse";

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

  export type CallbackArgs = Parameters<Callback>;

  export function start(callback?: Callback): void;
  export function stop(): void;

  export type KeyCodeType = number;
  export type KeyboardEventCallback = (
    type: "key",
    eventType: KeyboardEventType,
    x: KeyCodeType,
  ) => void;
  export type MousePosXType = number;
  export type MousePosYType = number;
  export type MouseEventCallback = (
    type: "mouse",
    eventType: MouseEventType,
    x: MousePosXType,
    y: MousePosYType,
  ) => void;
  export type EventEmitterHandler = MouseEventCallback | KeyboardEventCallback;
  
  export function on(eventType: EventEmitterHandler): void;
  export function off(eventType: EventEmitterHandler): void;
}
```

## Build yourself

Before starting, please configure the development environment: desktop development using C++/Windows 10/11 SDK/Python 3, and then run `npm run build`

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
