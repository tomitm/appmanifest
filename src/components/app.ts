import { provide } from '@lit/context';
import { type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { ImportEventDetail } from './import-button';
import type { FormEventDetail, ManifestMember, WebAppManifest } from '../types';

import { editContext, manifestContext } from '../context';
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

    this.subscribe('wam-form', this.onChange.bind(this) as EventListener);
    this.subscribe('wam-edit', this.onEdit.bind(this) as EventListener);
    this.subscribe('wam-import', this.onImport.bind(this) as EventListener);
  }

  // handle events from changing the top-level form or submitting a member form
  onChange(event: CustomEvent<FormEventDetail>): void {
    console.log('Change event:', event.detail);
    const { member, index } = event.detail;
    this.editor = {}; // discard editor

    // top-level change
    if (!member) {
      const manifest = event.detail.data as WebAppManifest;
      console.log('Editing top-level manifest', Object.keys(manifest))
      const { icons, shortcuts, protocol_handlers, screenshots, related_applications } = this.data;
      this.data = { ...manifest, icons, shortcuts, protocol_handlers, screenshots, related_applications };
      return;
    }

    // ensure valid value for member-level edits
    if (!['icons', 'shortcuts', 'protocol_handlers', 'screenshots', 'related_applications'].includes(member)) return;

    const data = event.detail.data as ManifestMember;
    this.data[member] ??= [];

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
