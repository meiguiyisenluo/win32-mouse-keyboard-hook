// Copyright (c) 2026 YiSen Luo 罗亦森
// Licensed under the MIT License.
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
