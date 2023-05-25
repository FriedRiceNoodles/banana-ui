import { EVENTS } from './events';

export function isMouseEvent(type: Event['type']) {
  const mouseEventArr = [EVENTS.MOUSEDOWN, EVENTS.MOUSEMOVE, EVENTS.MOUSEUP] as Event['type'][];

  return mouseEventArr.includes(type);
}

// get coordinates from mouseevent or touchevent
export function getCoordinates(e: Event) {
  const _isMouseEvent = isMouseEvent(e.type);

  const x = _isMouseEvent ? (e as MouseEvent).clientX : (e as TouchEvent).changedTouches[0]?.clientX;
  const y = _isMouseEvent ? (e as MouseEvent).clientY : (e as TouchEvent).changedTouches[0]?.clientY;
  return [x, y];
}
