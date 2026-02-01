// Copyright (c) 2026 YiSen Luo 罗亦森
// Licensed under the MIT License.
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
