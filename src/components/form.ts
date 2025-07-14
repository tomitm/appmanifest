import { consume } from '@lit/context';
import { type PropertyValues } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import type WaDialog from '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import type { ImportEventDetail } from './import-button';
import type { FormEventDetail, WebAppManifestOrMember } from '../types';

import { editContext } from '../context';
import { inputsReady } from '../index';
import { WamElement } from './element';

@customElement('wam-form')
export class WamForm extends WamElement {
  @property({ type: String }) event: 'change' | 'submit';
  @property({ type: String }) member?: FormEventDetail['member'];

  @consume({ context: editContext, subscribe: true })
  @property({ attribute: false })
  edit: FormEventDetail = {};

  @query('form') form: HTMLFormElement | null;
  dialog?: WaDialog | null;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    void inputsReady.then(() => {
      if (!this.form) return;
      this.subscribe(this.event, this.onFormChange.bind(this), this.form);
    });
    this.subscribe('wam-import', this.onImport.bind(this) as EventListener)

    if (this.member) {
      this.dialog = document.querySelector(`#dialog-${this.member}`);
    }
    if (this.dialog) {
      this.subscribe('wa-after-hide', this.onDialogClose.bind(this) as EventListener, this.dialog)
    }
  }

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('edit')) this.onEdit();
  }

  setValues(data: Record<string, unknown>) {
    if (!this.form) return;

    // prepare values
    const values: Record<string, unknown> = {};
    for (const key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
      const value = data[key];
      if (key === 'purpose') {
        // ImageResource purpose is unusual; unlike other arrays, this one is a single string
        values[key] = String(value).split(' ');
        continue;
      }
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        // handle objects such as launch_handler
        for (const subkey in value) {
          values[`${key}.${subkey}`] = (value as Record<string, unknown>)[subkey];
        }
        continue;
      }
      values[key] = value;
    }

    // set input value
    for (const key in values) {
      if (!Object.prototype.hasOwnProperty.call(values, key)) continue;

      const input = this.form.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement;
      if (!input) continue;
      
      input.value = values[key] as string;
    }
  }

  onFormChange(e: Event | SubmitEvent) {
    console.log('Form update event, parsing form to manifest')
    e.preventDefault();
    const data: Record<string, unknown> = {};
    const formData = new FormData(this.form!);

    for (const key of formData.keys()) {
      const value = formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key);
      if (value === "" || value === null || typeof value === 'undefined') continue;
      if (value === 'on') {
        data[key] = true;
        continue;
      }
      if (key == 'purpose' && Array.isArray(value)) {
        // ImageResource purpose is unusual; unlike other arrays, this one is a single string
        data[key] = (value as string[]).join(' ');
        continue;
      }
      if (key.includes('.')) {
        const [ topKey, subKey ] = key.split('.');
        data[topKey] ??= {};
        (data[topKey] as Record<string, unknown>)[subKey] = value;
        continue;
      }
      data[key] = value;
    }

    const event = new CustomEvent<FormEventDetail>('wam-form', {
      detail: { member: this.member, data: data as WebAppManifestOrMember, index: this.edit?.index },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(event);

    if (this.event === 'submit' && this.dialog) {
      this.dialog.open = false;
    }
  }

  onDialogClose(e: Event) {
    if (e.target !== this.dialog) return; // select dropdown may trigger this
    this.form?.reset();
  }

  onEdit() {
    if (!this.edit.member) return; // top-level not applicable
    if (this.edit.member !== this.member) return; // different form
    if (!this.dialog) return; // missing dialog

    console.log('Form edit event', this.edit.member);
    this.dialog.open = true;

    if (!this.edit.data) return;
    this.setValues(this.edit.data as Record<string, unknown>);
  }

  onImport(e: CustomEvent<ImportEventDetail>) {
    console.log('Import event', e.detail.data);
    this.setValues(e.detail.data);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-form': WamForm
  }
}
