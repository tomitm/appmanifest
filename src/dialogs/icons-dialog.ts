import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';

@customElement('wam-icons-dialog')
@localized()
export class WamIconsDialog extends WamElement {

  render() {
    return html`
      <wa-dialog label=${msg('Add Icon')} id="dialog-icons">
        <wam-form member="icons" event="submit">
          <form autocomplete="off">
            <div class="wa-stack">
              <wa-input type="text" name="src" label=${msg('URL')} placeholder="homescreen.png" required></wa-input>
              <wa-input type="text" name="sizes" label=${msg('Sizes')} placeholder="192x192 256x256" pattern="^(\d+x\d+( \d+x\d+)*)?$"></wa-input>
              <wa-input type="text" name="type" label=${msg('Type')} placeholder="image/png"></wa-input>
              <wa-select name="purpose" label=${msg('Purpose')} multiple with-clear>
                <wa-option value="monochrome">${msg('Monochrome')}</wa-option>
                <wa-option value="maskable">${msg('Maskable')}</wa-option>
                <wa-option value="any">${msg('Any')}</wa-option>
              </wa-select>
        
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
    'wam-icons-dialog': WamIconsDialog
  }
}
