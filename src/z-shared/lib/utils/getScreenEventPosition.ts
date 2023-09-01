export type SharedScreenEvent = React.TouchEvent | React.MouseEvent;
export type NativeSharedScreenEvent = TouchEvent | MouseEvent;

export type ScreenEvent = SharedScreenEvent | NativeSharedScreenEvent

export type Coordinates = { x: number; y: number };

export const isTouchEvent = (e: ScreenEvent): e is React.TouchEvent | TouchEvent =>
    e && 'touches' in e;

export const getScreenEventPosition = (e: ScreenEvent): Coordinates => isTouchEvent(e)
    ? { x: e.touches[0].pageX, y: e.touches[0].pageY }
    : { x: e.pageX, y: e.pageY };
