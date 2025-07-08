import { html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';

import type { WebAppManifest } from '../context';
import { WamElement } from './element';

export interface ImportEventDetail {
  data: WebAppManifest
}

@customElement('wam-import-button')
@localized()
export class WamImportButton extends WamElement {
  @query('input') input: HTMLFormElement;

  onClick() {
    this.input.click();
  }

  onUpload(e: Event) {
    e.preventDefault();
    e.stopPropagation(); // prevent propagating up to the form
    
    const target = e.target as HTMLInputElement;
    if (!(target.files instanceof FileList)) return;

    const file = target.files[0];
    if (!file) return;
    
    console.log('Reading file...')
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result;
      if (!content || typeof content !== 'string') {
        console.log('No content, or not string');
        return;
      }
      this.onParse(content);
    }
    reader.onerror = () => {
      console.log('Failed to read file');
    }
    reader.readAsText(file);
  }

  onParse(content: string) {
    console.log('Parsing file...');
    let manifest: WebAppManifest;
    try {
      manifest = JSON.parse(content);
      // TODO: validate/filter manifest; currently operating on good faith here...
      if (!manifest) return;
    } catch (e) {
      console.error('Failed to parse', e);
      return;
    }

    console.log('File parsed', manifest);
    const event = new CustomEvent<ImportEventDetail>('wam-import', {
      detail: { data: manifest },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <wa-tooltip for="import">${msg('Edit an existing manifest file')}</wa-tooltip>
      <wa-button id="import" size="small" appearance="plain" variant="brand" @click=${this.onClick}>
        <wa-icon name="arrow-up-from-bracket" slot="end"></wa-icon>
        ${msg('Import')}
      </wa-button>
      <input type="file" class="wa-visually-hidden-force" @change=${this.onUpload} />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-import-button': WamImportButton
  }
}