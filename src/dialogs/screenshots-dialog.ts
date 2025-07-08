import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';

@customElement('wam-screenshots-dialog')
@localized()
export class WamScreenshotsDialog extends WamElement {

  render() {
    return html`
      <wa-dialog label=${msg('Add Screenshot')} id="dialog-screenshots">
        <wam-form member="screenshots" event="submit">
          <form autocomplete="off">
            <div class="wa-stack">
              <wa-input type="text" name="src" label=${msg('URL')} placeholder="screenshots/in-app.png" required></wa-input>
              <wa-input type="text" name="sizes" label=${msg('Sizes')} placeholder="1280x920" pattern="^(\d+x\d+( \d+x\d+)*)?$"></wa-input>
              <wa-input type="text" name="type" label=${msg('Type')} placeholder="image/png"></wa-input>
              <wa-input type="text" name="label" label=${msg('Label')} hint=${msg('An accessible label that may be used as alternative text')}></wa-input>
              <wa-radio-group name="form_factor" label=${msg('Form Factor')} orientation="horizontal">
                <wa-radio appearance="button" value="narrow">${msg('Narrow')}</wa-radio>
                <wa-radio appearance="button" value="wide">${msg('Wide')}</wa-radio>
              </wa-radio-group>
              <wam-select-platform></wam-select-platform>
        
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
    'wam-screenshots-dialog': WamScreenshotsDialog
  }
}
