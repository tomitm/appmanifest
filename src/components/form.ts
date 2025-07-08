import { consume } from '@lit/context';
import { type PropertyValues } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import type WaDialog from '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import type { ImportEventDetail } from './import-button';
import type { ExternalApplicationResource, ImageResource, Screenshot, ShortcutItem } from 'web-app-manifest';

import { editContext, type FormEventDetail, type ProtocolHandler, type WebAppManifest } from '../context';
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

    inputsReady.then(() => {
      this.form?.addEventListener(this.event, this.onFormChange.bind(this) as EventListenerOrEventListenerObject);
    })
    this.addEventListener('wam-import', this.onImport.bind(this) as EventListenerOrEventListenerObject);

    if (this.member) {
      this.dialog = document.querySelector(`#dialog-${this.member}`);
    }
    this.dialog?.addEventListener('wa-after-hide', this.onDialogClose.bind(this) as EventListenerOrEventListenerObject);
  }

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('edit')) this.onEdit();
  }

  setValues(data: any) {
    if (!this.form) return;
    for (const key in data) {
      if (!data.hasOwnProperty(key)) continue;

      const input = this.form.elements[key as any] as HTMLInputElement | HTMLSelectElement;
      if (!input) continue;

      let value = data[key];
      if (key === 'purpose' && value != null) {
        // ImageResource purpose is unusual; unlike other arrays, this one is a single string
        value = value.split(' ')
      }
      if (input.type === 'checkbox') {
        input.checked = !!value;
      } else if (input.type === 'radio') {
        // Iterate through radio buttons with the same name
        const radioButtons = this.form.querySelectorAll(`input[name="${key}"]`) as NodeListOf<HTMLInputElement>;
        radioButtons.forEach(radio => {
          if (radio.value === value) {
            radio.checked = true;
          }
        });
      } else if (input.tagName === 'SELECT') {
        const selectInput = input as HTMLSelectElement;
        if (selectInput.multiple) {
          // For multiple select, clear and then set selected options
          Array.from(selectInput.options).forEach(option => {
            option.selected = value.includes(option.value);
          });
        } else {
          selectInput.value = value;
        }
      } else {
        // For most other input types (text, number, email, textarea)
        input.value = value;
      }
    }
  }

  onFormChange(e: Event | SubmitEvent) {
    console.log('Form update event, parsing form to manifest')
    e.preventDefault();
    const data: any = {};
    const formData = new FormData(this.form as HTMLFormElement);
    
    for (const key of formData.keys() as FormDataIterator<keyof WebAppManifest | keyof ImageResource | keyof ShortcutItem | keyof ProtocolHandler | keyof Screenshot | keyof ExternalApplicationResource>) {
      const value = formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key);
      if (value === "" || value === null || typeof value === 'undefined') continue;
      if (value === 'on') {
        data[key] = true;
        continue;
      }
      if (key == 'purpose' && Array.isArray(value)) {
        // ImageResource purpose is unusual; unlike other arrays, this one is a single string
        data[key] = value.join(' ');
        continue;
      }
      data[key] = value;
    }

    const event = new CustomEvent<FormEventDetail>('wam-form', {
      detail: { member: this.member, data, index: this.edit?.index },
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
    this.setValues(this.edit.data);
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
