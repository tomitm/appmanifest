import { provide } from '@lit/context';
import { type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { ImportEventDetail } from './import-button';

import { editContext, manifestContext, type FormEventDetail, type WebAppManifest } from '../context';
import { WamElement } from './element';

@customElement('wam-app')
export class WamApp extends WamElement {
  @provide({ context: manifestContext }) 
  @property({ attribute: false })
  data: WebAppManifest = {};

  @provide({ context: editContext })
  @property({ attribute: false })
  editor: FormEventDetail = {};

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    this.addEventListener('wam-form', this.onChange.bind(this) as EventListenerOrEventListenerObject);
    this.addEventListener('wam-edit', this.onEdit.bind(this) as EventListenerOrEventListenerObject);
    this.addEventListener('wam-import', this.onImport.bind(this) as EventListenerOrEventListenerObject);
  }

  // handle events from changing the top-level form or submitting a member form
  onChange(event: CustomEvent<FormEventDetail>): void {
    console.log('Change event:', event.detail);
    const { data, member, index } = event.detail;
    this.editor = {}; // discard editor

    // top-level change
    if (!member) {
      const manifest = data as WebAppManifest;
      console.log('Editing top-level manifest', Object.keys(manifest))
      const { icons, shortcuts, protocol_handlers, screenshots, related_applications } = this.data;
      this.data = { ...manifest, icons, shortcuts, protocol_handlers, screenshots, related_applications };
      return;
    }

    // ensure valid value for member-level edits
    if (!['icons', 'shortcuts', 'protocol_handlers', 'screenshots', 'related_applications'].includes(member)) return;

    if (!this.data[member]) {
      this.data[member] = [];
    }

    // new/append member
    if (typeof index === 'undefined' || !this.data[member][index]) {
      if (data == null) return;
      console.log('Appending', member);
      this.data = {
        ...this.data,
        [member]: [
          ...this.data[member],
          data
        ]
      }
      return;
    }

    // delete member
    if (data == null) {
      console.log('Deleting', member, index);
      this.data = {
        ...this.data,
        [member]: this.data[member].filter((_, idx) => index !== idx)
      }
      return;
    }

    // edit member
    console.log('Editing', member, index);
    this.data[member][index] = data;
    this.data = { ...this.data }; // trigger update by object reference change
  }

  onEdit(event: CustomEvent<FormEventDetail>) {
    console.log('Edit event:', event.detail)
    this.editor = event.detail;
  }

  onImport(e: CustomEvent<ImportEventDetail>) {
    console.log('Import event:', e.detail.data)
    this.data = e.detail.data;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-app': WamApp
  }
}
