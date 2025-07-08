import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';

@customElement('wam-applications-dialog')
@localized()
export class WamApplicationsDialog extends WamElement {

  render() {
    return html`
      <wa-dialog label=${msg('Add Application')} id="dialog-related_applications">
        <wam-form member="related_applications" event="submit">
          <form autocomplete="off">
            <div class="wa-stack">
              <wam-select-platform required></wam-select-platform>
              <wa-input type="text" name="id" label=${msg('ID')} placeholder="com.example.app"></wa-input>
              <wa-input type="text" name="url" label=${msg('URL')} placeholder="https://play.google.com/store/apps/details?id=com.example.app1"></wa-input>
        
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
    'wam-applications-dialog': WamApplicationsDialog
  }
}
