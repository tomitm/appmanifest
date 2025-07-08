import { html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import type { DisplayModeType } from 'web-app-manifest';

import { WamElement } from './element';

@customElement('wam-radio-display')
@localized()
export class WamRadioDisplay extends WamElement {
  @state() value?: DisplayModeType;

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value as DisplayModeType;
  }

  render() {
    const hint = choose(this.value, [
      ['standalone', () => msg('An app-like experience, no browser UI, only system UI')],
      ['fullscreen', () => msg('No browser or system UI shown')],
      ['minimal-ui', () => msg('Minimal set of navigation UI')],
      ['browser', () => msg('Typical browser tab or window')],
    ]);
    return html`
      <wa-radio-group name="display" label=${msg('Display')} orientation="horizontal" hint=${hint} @change=${this.onChange}>
        <wa-radio appearance="button" value="standalone">${msg('Standalone')}</wa-radio>
        <wa-radio appearance="button" value="fullscreen">${msg('Fullscreen')}</wa-radio>
        <wa-radio appearance="button" value="minimal-ui">${msg('Minimal UI')}</wa-radio>
        <wa-radio appearance="button" value="browser">${msg('Browser')}</wa-radio>
      </wa-radio-group>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-radio-display': WamRadioDisplay
  }
}