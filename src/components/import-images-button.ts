import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import type { ImageResource } from 'web-app-manifest';
import type { FormEventDetail } from '../types';

import { WamElement } from './element';

@customElement('wam-import-images-button')
@localized()
export class WamImportImagesButton extends WamElement {
  @query('input') input: HTMLFormElement;

  @property() member: 'icons' | 'screenshots';

  onClick() {
    this.input.click();
  }

  onUpload(e: Event) {
    e.preventDefault();
    e.stopPropagation(); // prevent propagating up to the form
    
    const target = e.target as HTMLInputElement;
    if (!(target.files instanceof FileList)) return;

    void Promise.all(Array.from(target.files).map(file => {
      const image = new Image();
      return new Promise<ImageResource>((resolve) => {
        const url = URL.createObjectURL(file)
        image.onload = () => {
          const details: ImageResource = {
            src: file.name,
            type: file.type,
            sizes: `${image.naturalWidth}x${image.naturalHeight}`
          }
          URL.revokeObjectURL(url);
          resolve(details);
        }
        image.onerror = () => {
          console.error(`Unable to determine sizes for ${file.name}`);
          const details: ImageResource = {
            src: file.name,
            type: file.type,
          }
          resolve(details);
        }
        image.src = url;
      });
    })).then((results) => {
      this.onParse(results);
    });
  }

  onParse(results: ImageResource[]) {
    console.log('Files parsed', results);
    for (const image of results) {
      const detail: FormEventDetail = { member: this.member, data: image };
      this.dispatch('wam-form', detail)
    }
  }

  render() {
    return html`
      <wa-tooltip for="import-images">${msg('Add multiple images at once')}</wa-tooltip>
      <wa-button id="import-images" size="medium" appearance="plain" variant="brand" @click=${() => this.onClick()}>
        <wa-icon name="arrow-up-from-bracket" slot="end"></wa-icon>
        ${msg('Import')}
      </wa-button>
      <input type="file" accept="image/*" multiple class="wa-visually-hidden-force" @change=${(e: Event) => this.onUpload(e)} />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-import-images-button': WamImportImagesButton
  }
}