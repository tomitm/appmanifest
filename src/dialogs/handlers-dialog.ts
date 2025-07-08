import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';

@customElement('wam-handlers-dialog')
@localized()
export class WamHandlersDialog extends WamElement {

  render() {
    return html`
      <wa-dialog label=${msg('Add Protocol Handler')} id="dialog-protocol_handlers">
        <wam-form member="protocol_handlers" event="submit">
          <form autocomplete="off">
            <div class="wa-stack">
              <wa-input type="text" name="protocol" label=${msg('Protocol')} placeholder="web+search" required></wa-input>
              <wa-input type="text" name="url" label=${msg('URL')} placeholder="/search?q=%s" required></wa-input>
        
              <wa-button type="submit" variant="brand">${msg('Save')}</wa-button>
            </div>
          </form>
        </wam-form>
      </wa-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-handlers-dialog': WamHandlersDialog
  }
}
