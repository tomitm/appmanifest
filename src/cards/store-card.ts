import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import { WamElement } from '../components/element';

@customElement('wam-store-card')
@localized()
export class WamStoreCard extends WamElement {
  renderListing() {
    const CATEGORIES: Record<string, string> = {
      'books': msg('Books'),
      'business': msg('Business'),
      'education': msg('Education'),
      'entertainment': msg('Entertainment'),
      'finance': msg('Finance'),
      'fitness': msg('Fitness'),
      'food': msg('Food'),
      'games': msg('Games'),
      'government': msg('Government'),
      'health': msg('Health'),
      'kids': msg('Kids'),
      'lifestyle': msg('Lifestyle'),
      'magazines': msg('Magazines'),
      'medical': msg('Medical'),
      'music': msg('Music'),
      'navigation': msg('Navigation'),
      'news': msg('News'),
      'personalization': msg('Personalization'),
      'photo': msg('Photo'),
      'politics': msg('Politics'),
      'productivity': msg('Productivity'),
      'security': msg('Security'),
      'shopping': msg('Shopping'),
      'social': msg('Social'),
      'sports': msg('Sports'),
      'travel': msg('Travel'),
      'utilities': msg('Utilities'),
      'weather': msg('Weather'),
    } as const;

    return html`
      <div class="wa-stack">
        <wa-textarea name="description" label=${msg('Description')} placeholder=${msg('A generator to help developers create Web App Manifests')} hint=${msg('The purpose of your web app')}></wa-textarea>
          
        <wa-select name="categories" label=${msg('Categories')} multiple with-clear hint=${msg('How stores should categorize your app')}>
          ${Object.keys(CATEGORIES).map(value => html`<wa-option value="${value}">${CATEGORIES[value]}</wa-option>`)}
        </wa-select>
      </div>
    `;
  }

  renderScreenshots() {
    return html`
      <div class="wa-stack">
        <wam-member-table member="screenshots"></wam-member-table>
      </div>
    `;
  }

  renderApplications() {
    return html`
      <div class="wa-stack">
        <wa-callout appearance="filled" variant="warning" size="small">
          <wa-icon name="flask" slot="icon"></wa-icon>
          ${msg(html`<strong>Experimental!</strong> Check the <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/related_applications#browser_compatibility" target="_blank" rel="noopener">Browser compatibility table</a> carefully before using this in production.`)}
        </wa-callout>

        <wa-checkbox name="prefer_related_applications" hint=${msg('Whether to show the native app banner before the web app install banner')}>
          ${msg('Prefer related applications')}
        </wa-checkbox>

        <wam-member-table member="related_applications"></wam-member-table>
      </div>
    `;
  }

  render() {
    return html`
      <wa-card>
        <h2 class="wa-flank wa-gap-xs">
          <wa-icon name="chart-line"></wa-icon>
          <span>${msg('Store')}</span>
        </h2>
        <wa-tab-group>
          <wa-tab panel="listing">${msg('Listing')}</wa-tab>
          <wa-tab panel="screenshots">${msg('Screenshots')}</wa-tab>
          <wa-tab panel="related-applications">${msg('Related Applications')}</wa-tab>

          <wa-tab-panel name="listing">
            ${this.renderListing()}
          </wa-tab-panel>

          <wa-tab-panel name="screenshots">
            ${this.renderScreenshots()}
          </wa-tab-panel>

          <wa-tab-panel name="related-applications">
            ${this.renderApplications()}
          </wa-tab-panel>
        </wa-tab-group>
      </wa-card>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-store-card': WamStoreCard
  }
}
