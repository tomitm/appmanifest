import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';

@customElement('wam-shortcuts-dialog')
@localized()
export class WamShortcutsDialog extends WamElement {

  render() {
    return html`
      <wa-dialog label=${msg('Add Shortcut')} id="dialog-shortcuts">
        <wam-form member="shortcuts" event="submit">
          <form autocomplete="off">
            <div class="wa-stack">
              <wa-input type="text" name="name" label=${msg('Name')} placeholder=${msg('App Settings')} required></wa-input>
              <wa-input type="text" name="short_name" label=${msg('Short Name')} placeholder=${msg('Settings')}></wa-input>
              <wa-input type="text" name="description" label=${msg('Description')} placeholder=${msg('Edit your settings')}></wa-input>
              <wa-input type="text" name="url" label=${msg('URL')} placeholder="/settings" required></wa-input>
              
              <label>${msg('Icons')}</label>
              <div class="wa-flank">
                <wa-button size="medium" appearance="plain" variant="brand" disabled>
                  <wa-icon name="add" slot="end"></wa-icon>
                  ${msg('Add')}
                </wa-button>
                <wa-callout variant="brand" appearance="plain" size="small">
                  <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
                  ${msg('Shortcut icons are not yet available.')}
                </wa-callout>
              </div>
      
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
    'wam-shortcuts-dialog': WamShortcutsDialog
  }
}
