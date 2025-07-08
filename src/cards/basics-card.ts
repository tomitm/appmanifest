import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';

@customElement('wam-basics-card')
@localized()
export class WamBasicsCard extends WamElement {
  render() {
    return html`
      <wa-card>
        <div class="wa-flank:end">
          <h2 class="wa-flank wa-gap-xs">
            <wa-icon name="star" variant="regular"></wa-icon>
            <span>${msg('Your Web App')}</span>
          </h2>
          <wam-import-button></wam-import-button>
        </div>
        <div class="wa-stack">
          <wa-input type="text" name="name" label=${msg('Name')} placeholder=${msg('Web App Manifest Generator')} hint=${msg('Name of your web app')}></wa-input>
  
          <div class="wa-grid">
            <wa-color-picker type="text" name="theme_color" label=${msg('Theme colour')} hint=${msg('Colour used in the browser and system UI, to help make your app immersive')}></wa-color-picker>
  
            <wa-color-picker name="background_color" label=${msg('Background colour')}>
              <span slot="hint">${msg(html`This is typically your <code>&lt;body&gt;</code> background colour, used to set the background colour until the stylesheets for your app are loaded.`)}</span>
            </wa-color-picker>
          </div>
        </div>
      </wa-card>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-basics-card': WamBasicsCard
  }
}
