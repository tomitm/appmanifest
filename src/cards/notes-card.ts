import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';

@customElement('wam-notes-card')
@localized()
export class WamNotesCard extends WamElement {
  render() {
    return html`
      <wa-card>
        <h2 class="wa-flank wa-gap-xs">
          <wa-icon name="lightbulb" variant="regular" style="color: var(--wa-color-yellow-70)"></wa-icon>
          <span>${msg('Helpful notes')}</span>
        </h2>
        <ul>
          <li>${msg(html`Browsers will automatically promote installation with a banner when your app meets <a href="https://web.dev/install-criteria/" target="_blank" rel="noopener">install criteria</a>`)}</li>
          <li>${msg(html`To detect if an installed app is launched, you can append a parameter to your Start URL or use the <code><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode" target="_blank" rel="noopener">display-mode</a></code> CSS media query`)}</li>
          <li>${msg(`For games, you can set fullscreen display and landscape orientation`)}</li>
          <li>${msg(html`If your app is under a subdirectory, set <code>start_url</code> and <code>scope</code> to that directory, otherwise launching will default to the root domain`)}</li>
          <li>${msg(html`While most browsers implement the manifest, the <code>&lt;meta&gt;</code> tags will help bridge that gap for those that don't`)}</li>
          <li>${msg(`You can promote your existing native app with the install banner by linking it as a related application`)}</li>
          <li>${msg(html`To control the install prompt or determine if it was successful, use the <code><a href="https://web.dev/customize-install/#beforeinstallprompt">beforeinstallprompt</a></code> event`)}</li>
          <li>${msg(html`When you add a <a href="https://web.dev/learn/pwa/service-workers/" target="_blank" rel="noopener">Service Worker</a>, your app can work offline and send notifications`)}</li>
        </ul>
      </wa-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-notes-card': WamNotesCard
  }
}
