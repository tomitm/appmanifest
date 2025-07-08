import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';

@customElement('wam-footer')
@localized()
export class WamFooter extends WamElement {
  render() {
    return html`
      <footer>
        <p class="wa-caption-m">
          ${msg(html`Made by <a href="https://github.com/tomitm" target="_blank" rel="noopener">tomitm</a> and <a href="https://github.com/tomitm/appmanifest" target="_blank" rel="noopener">contributors</a> with <a href="https://webawesome.com" target="_blank" rel="noopener">Web Awesome</a>.`)}
        </p>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-footer': WamFooter
  }
}
