// Copyright (c) 2026 YiSen Luo 罗亦森
// Licensed under the MIT License.

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
