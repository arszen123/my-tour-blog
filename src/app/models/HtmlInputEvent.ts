export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
  result: HTMLInputElement & EventTarget;
}
