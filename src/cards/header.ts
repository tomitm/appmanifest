import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';

@customElement('wam-header')
@localized()
export class WamHeader extends WamElement {
  render() {
    return html`
      <header>
        <div class="wa-split">
          <h1 class="wa-heading-l">${msg('Web App Manifest Generator')}</h1>
          <wa-button-group>
            <wa-tooltip for="mdn">${msg('Read more on MDN')}</wa-tooltip>
            <wa-button id="mdn" size="small" appearance="plain" href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest" target="_blank" rel="noopener">
              ${msg('MDN')}
            </wa-button>

            <wa-tooltip for="spec">${msg('Read the specification')}</wa-tooltip>
            <wa-button id="spec" size="small" appearance="plain" href="https://www.w3.org/TR/appmanifest/" target="_blank" rel="noopener">
              ${msg('Spec')}
            </wa-button>

            <wa-tooltip for="github">${msg('View source on GitHub')}</wa-tooltip>
            <wa-button id="github" size="small" appearance="plain" href="https://github.com/tomitm/appmanifest/" target="_blank" rel="noopener">
              <wa-icon name="github" family="brands" label=${msg('View source on GitHub')}></wa-icon>
            </wa-button>
          </wa-button-group>
        </div>
        <p>
          <div class="wa-body-m"><wa-icon name="wand-magic-sparkles"></wa-icon> ${msg('Web App Manifests are one of the key pieces to making your web app look and feel like a native app.')} <a href="https://web.dev/learn/pwa/web-app-manifest/" target="_blank" rel="noopener">${msg('Learn more')}</a></div>
          <div class="wa-body-s">${msg(html`While everything is optional, once <a href="https://web.dev/install-criteria/" target="_blank" rel="noopener">install criteria</a> is met, some browsers will automatically display an install banner for your app`)}</div>
        </p>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-header': WamHeader
  }
}
