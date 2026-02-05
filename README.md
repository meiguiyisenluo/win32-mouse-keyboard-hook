<!-- Copyright (c) 2026 YiSen Luo 罗亦森 -->
<!-- Licensed under the MIT License. -->

## What's this for

An NPM library used for Electron to listen to keyboard and mouse events at the Windows system level

supported Electron verion:

- "22.3.27", // 最后一个支持 Win7 的版本
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

### use

```typescript
// import
const win32KeyboardHook = require("@lysyyds/win32-mouse-keyboard-hook");
// or
// import win32KeyboardHook from "@lysyyds/win32-mouse-keyboard-hook";

// import types
import type { Callback } from "@lysyyds/win32-mouse-keyboard-hook";

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
``` typescript
declare module "@lysyyds/win32-mouse-keyboard-hook" {
  export type Callback = (
    type: "key" | "mouse",
    eventType: number,
    x: number,
    y: number,
  ) => void;

  export type CallbackArgs = Parameters<Callback>;

  export function start(callback: Callback): void;
  export function stop(): void;

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
