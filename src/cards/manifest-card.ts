import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';
import { manifestContext, type WebAppManifest } from '../context';

@customElement('wam-manifest')
@localized()
export class WamManifest extends WamElement {
  
  @consume({ context: manifestContext, subscribe: true })
  @property({ attribute: false })
  manifest: WebAppManifest = {};

  render() {
    return html`
      <wa-card class="wa-cloak">
        <div class="wa-flank:end">
          <h2 class="wa-flank wa-gap-xs">
            <wa-icon name="file-code" variant="regular"></wa-icon>
            <span>${msg('Manifest')}</span>
          </h2>
          <wa-copy-button from="manifest-json"></wa-copy-button>
        </div>
        <div class="wa-stack">
          <pre id="manifest-json">${JSON.stringify(this.manifest, null, 2)}</pre>
        </div>
      </wa-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-manifest': WamManifest
  }
}
