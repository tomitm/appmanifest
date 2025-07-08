import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { consume } from '@lit/context';

import type { ImageResource } from 'web-app-manifest';

import { WamElement } from '../components/element';
import { manifestContext, type WebAppManifest } from '../context';

@customElement('wam-head')
export class WamHead extends WamElement {

  @consume({ context: manifestContext, subscribe: true })
  @property({ attribute: false })
  manifest: WebAppManifest = {};

  getImageAttrs(image: ImageResource) {
    var attrs = [];
    if (image.type)    attrs.push(`type="${image.type}"`);
    if (image.sizes)   attrs.push(`sizes="${image.sizes}"`);
    if (image.src)     attrs.push(`href="${image.src}"`);

    return attrs.join(' ');
  }

  generateHead() {
    var meta = [
      '<link rel="manifest" href="manifest.json">',
      '',
      '<meta name="mobile-web-app-capable" content="yes">',
      '<meta name="apple-mobile-web-app-capable" content="yes">'
    ];

    var name = this.manifest.short_name || this.manifest.name;
    if (name) {
      meta.push(`<meta name="application-name" content="${name}">`);
      meta.push(`<meta name="apple-mobile-web-app-title" content="${name}">`);
    }

    if (this.manifest.theme_color) {
      meta.push(`<meta name="theme-color" content="${this.manifest.theme_color}">`);
      meta.push(`<meta name="msapplication-navbutton-color" content="${this.manifest.theme_color}">`);
      meta.push('<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">');
    }

    if (this.manifest.start_url) {
      meta.push(`<meta name="msapplication-starturl" content="${this.manifest.start_url}">`);
    }

    meta.push('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');

    if (this.manifest.icons) {
      meta.push(''); // add spacer for aesthetics

      this.manifest.icons.forEach(icon => {
        var attrs = this.getImageAttrs(icon);
        meta.push(`<link rel="icon" ${attrs}>`);
        meta.push(`<link rel="apple-touch-icon" ${attrs}>`);
      });
    }

    return meta.join('\n');
  }
  
  render() {
    return html`
      <wa-card class="wa-cloak">
        <div class="wa-flank:end">
          <h2 class="wa-flank wa-gap-xs">
            <wa-icon name="code"></wa-icon>
            <span>head</span>
          </h2>
          <wa-copy-button from="manifest-head"></wa-copy-button>
        </div>
        <div class="wa-stack">
          <pre id="manifest-head">${this.generateHead()}</pre>
        </div>
      </wa-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-head': WamHead
  }
}
