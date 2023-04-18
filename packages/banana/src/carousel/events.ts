export const EVENTS = {
  CLICK: 'click',
  TOUCHSTART: 'touchstart',
  TOUCHMOVE: 'touchmove',
  TOUCHEND: 'touchend',
  TOUCHCANCEL: 'touchcancel',
  MOUSEDOWN: 'mousedown',
  MOUSEMOVE: 'mousemove',
  MOUSEUP: 'mouseup',
} as const;

export type EventType = typeof EVENTS extends { [K in keyof typeof EVENTS]: infer U } ? U : never;
