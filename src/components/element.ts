import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('wam-element')
export class WamElement extends LitElement {
  createRenderRoot() {
    // opt out of shadow dom
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-element': WamElement
  }
}
