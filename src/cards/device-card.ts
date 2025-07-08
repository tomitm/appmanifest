import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';

@customElement('wam-device-card')
@localized()
export class WamDeviceCard extends WamElement {
  renderBehaviour() {
    return html`
      <div class="wa-stack">
        <wa-input type="text" name="short_name" label=${msg('Short Name')} placeholder=${msg('App Manifest')} hint=${msg('This will be used when there is insufficient space to display the full name, such as the homescreen')}></wa-input>

        <div class="wa-grid">
          <wam-radio-display></wam-radio-display>
  
          <wa-radio-group name="orientation" value="" label=${msg('Orientation')} orientation="horizontal" with-clear>
            <wa-radio appearance="button" value="any">${msg('Any')}</wa-radio>
            <wa-radio appearance="button" value="natural">${msg('Natural')}</wa-radio>
            <wa-radio appearance="button" value="landscape">${msg('Landscape')}</wa-radio>
            <!-- <wa-radio appearance="button" value="landscape-primary">${msg('Landscape (Primary)')}</wa-radio> -->
            <!-- <wa-radio appearance="button" value="landscape-secondary">${msg('Landscape (Secondary)')}</wa-radio> -->
            <wa-radio appearance="button" value="portrait">${msg('Portrait')}</wa-radio>
            <!-- <wa-radio appearance="button" value="portrait-primary">${msg('Portrait (Primary)')}</wa-radio> -->
            <!-- <wa-radio appearance="button" value="portrait-secondary">${msg('Portrait (Secondary)')}</wa-radio> -->
          </wa-radio-group>
          
          <wa-input type="text" name="start_url" label=${msg('Start URL')} placeholder="/" hint=${msg('Your homescreen shortcut will load this URL')}></wa-input>
          <wa-input type="text" name="scope" label=${msg('Scope')} placeholder="/" hint=${msg('The scope of your domain that this manifest applies to')}></wa-input>

          <wa-input type="text" name="lang" label=${msg('Language')} placeholder=${msg('en')} hint=${msg('The primary language for the name, short name and description properties.')}></wa-input>
          
          <wa-radio-group name="dir" value="" label=${msg('Text Direction')} orientation="horizontal" with-clear>
            <wa-radio appearance="button" value="ltr"><wa-icon name="align-left"></wa-icon></wa-radio>
            <wa-radio appearance="button" value="rtl"><wa-icon name="align-right"></wa-icon></wa-radio>
            <wa-radio appearance="button" value="auto">${msg('Auto')}</wa-radio>
          </wa-radio-group>
        </div>
      </div>
    `;
  }

  renderIcons() {
    return html`
      <div class="wa-stack">
        <wam-member-table member="icons"></wam-member-table>
      </div>
    `;
  }

  renderShortcuts() {
    return html`
      <div class="wa-stack">
        <wam-member-table member="shortcuts"></wam-member-table>
      </div>
    `;
  }

  renderHandlers() {
    return html`
      <div class="wa-stack">
        <wa-callout appearance="filled" variant="warning" size="small">
          <wa-icon name="flask" slot="icon"></wa-icon>
          ${msg(html`<strong>Experimental!</strong> Check the <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/protocol_handlers#browser_compatibility" target="_blank" rel="noopener">Browser compatibility table</a> carefully before using this in production.`)}
        </wa-callout>

        <!-- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/launch_handler -->
        <wa-select name="launch_handler" value="" label=${msg('Launch Handler')} multiple with-clear>
          <wa-option value="auto">${msg('Auto')}</wa-option>
          <wa-option value="focus-existing">${msg('Focus existing')}</wa-option>
          <wa-option value="navigate-existing">${msg('Navigate existing')}</wa-option>
          <wa-option value="navigate-new">${msg('Launch new')}</wa-option>
        </wa-select>

        <wam-member-table member="protocol_handlers"></wam-member-table>
      </div>
    `;
  }

  render() {
    return html`
      <wa-card>
        <h2 class="wa-flank wa-gap-xs">
          <wa-icon name="mobile-screen"></wa-icon>
          <span>${msg('Device Integration')}</span>
        </h2>
        <wa-tab-group>
          <wa-tab panel="behaviour">${msg('Behaviour')}</wa-tab>
          <wa-tab panel="icons">${msg('Icons')}</wa-tab>
          <wa-tab panel="shortcuts">${msg('Shortcuts')}</wa-tab>
          <wa-tab panel="protocol_handlers">${msg('Protocol Handlers')}</wa-tab>

          <wa-tab-panel name="behaviour">
            ${this.renderBehaviour()}
          </wa-tab-panel>

          <wa-tab-panel name="icons">
            ${this.renderIcons()}
          </wa-tab-panel>

          <wa-tab-panel name="shortcuts">
            ${this.renderShortcuts()}
          </wa-tab-panel>

          <wa-tab-panel name="protocol_handlers">
            ${this.renderHandlers()}
          </wa-tab-panel>
        </wa-tab-group>
      </wa-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-device-card': WamDeviceCard
  }
}
