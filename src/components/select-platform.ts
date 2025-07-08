import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from './element';

export const PLATFORMS: Record<string, string> = {
  "chrome_web_store": 'Google Chrome Web Store',
  "play": 'Google Play Store',
  "chromeos_play": 'Chrome OS Play',
  "webapp": 'Web App',
  "windows": 'Windows Store',
  "f-droid": 'F-Droid',
  "amazon": 'Amazon App Store',
}

@customElement('wam-select-platform')
@localized()
export class WamSelectPlatform extends WamElement {
  @property({ type: Boolean }) required? = false;

  render() {
    const options = Object.keys(PLATFORMS).map((platform: string) => html`<wa-option value="${platform}">${PLATFORMS[platform]}</wa-option>`)
    return html`
      <wa-select name="platform" value="" label=${msg('Platform')} placeholder=${msg('App Store')} .required=${this.required} with-clear>
        ${options}
      </wa-select>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-select-platform': WamSelectPlatform
  }
}