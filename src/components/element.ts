import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('wam-element')
export class WamElement extends LitElement {
  #subscriptions: [string, EventListener, HTMLElement][] = [];

  createRenderRoot() {
    // opt out of shadow dom
    return this;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribeAll();
  }

  subscribe(type: string, callback: EventListener, target: HTMLElement = this) {
    const fn = (event: Event) => callback.call(this, event);
    target.addEventListener(type, fn);
    this.#subscriptions.push([ type, fn, target ]);
  }

  unsubscribeAll() {
    for (const [type, callback, target] of this.#subscriptions) {
      target.removeEventListener(type, callback);
    }
    this.#subscriptions.length = 0;
  }

  dispatch<T>(type: string, detail: T) {
    super.dispatchEvent(new CustomEvent<T>(type, {
      detail,
      bubbles: true,
      composed: true,
    }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-element': WamElement
  }
}
