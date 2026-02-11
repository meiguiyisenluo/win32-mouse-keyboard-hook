// Copyright (c) 2026 YiSen Luo 罗亦森
// Licensed under the MIT License.

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

export function start(callback?: Callback): void;
export function stop(): void;

export type KeyboardEventCallbackArgs = [
  eventType: KeyboardEventType,
  keyCode: number,
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
