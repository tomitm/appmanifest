import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { choose } from 'lit/directives/choose.js';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';

import { manifestContext, type ManifestMember, type FormEventDetail, type WebAppManifest } from '../context';
import { PLATFORMS } from './select-platform';
import { WamElement } from './element';

const prettyCase = (input?: string) => {
  if (!input) return;
  return input.split(/[\W_-]/).map(input => input[0].toUpperCase() + input.slice(1)).join(' ')
}

@customElement('wam-member-table')
@localized()
export class WamMemberTable extends WamElement {

  @consume({ context: manifestContext, subscribe: true })
  @property({ attribute: false })
  manifest: WebAppManifest = {};
  
  @property({ type: String })
  member: FormEventDetail['member'];

  handleEdit(index: number, data: ManifestMember) {
    const event = new CustomEvent<FormEventDetail>('wam-edit', {
      detail: { member: this.member, index, data },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  handleDelete(index: number) {
    const event = new CustomEvent<FormEventDetail>('wam-form', {
      detail: { member: this.member, index, data: null },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  renderAddButton() {
    return html`
      <wa-button size="medium" appearance="plain" variant="brand" data-dialog="open dialog-${this.member}">
        <wa-icon name="add" slot="end"></wa-icon>
        ${msg('Add')}
      </wa-button>
    `;
  }
  
  renderEditButtons(data: ManifestMember, index: number) {
    const handleEdit = () => this.handleEdit(index, data);
    const handleDelete = () => this.handleDelete(index);

    return html`
      <wa-button-group>
        <wa-button size="small" variant="neutral" appearance="plain" @click=${handleEdit}>
          <wa-icon name="pen-to-square" slot="start"></wa-icon>
          ${msg('Edit')}
        </wa-button>
        <wa-button size="small" variant="neutral" appearance="plain" @click=${handleDelete}>
          <wa-icon name="trash" slot="start"></wa-icon>
          ${msg('Delete')}
        </wa-button>
      </wa-button-group>
    `;
  }

  renderPurposes(purpose?: string) {
    if (!purpose) return;
    const purposes = purpose.split(' ').map(prettyCase); // TODO: i18n
    if (!purposes.length) return;
    return html`
      <div class="wa-cluster wa-gap-2xs">
        ${purposes?.map(purpose => html`<wa-tag size="small" appearance="outlined">${purpose}</wa-tag>`)}
      </div>
    `;
  }

  renderIcons() {
    const body = this.manifest.icons?.map((icon, index: number) => html`
      <tr>
        <td>${icon.src}</td>
        <td>${icon.sizes}</td>
        <td>${icon.type}</td>
        <td>${this.renderPurposes(icon.purpose)}</td>
        <td>
          ${this.renderEditButtons(icon, index)}
        </td>
      </tr>
    `);
    
    return html`
      <wa-scroller without-scrollbar>
        <table class="table table-sm wa-zebra-rows" id="icons">
          <thead>
            <tr>
              <th>${msg('URL')}</th>
              <th>${msg('Sizes')}</th>
              <th>${msg('Type')}</th>
              <th>${msg('Purpose')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </wa-scroller>

      <wa-button-group>
        ${this.renderAddButton()}
        <wam-import-images-button .member=${this.member}></wam-import-images-button>
      </wa-button-group>
    `;
  }

  renderShortcuts() {
    const body = this.manifest.shortcuts?.map((shortcut, index: number) => html`
      <tr>
        <td>${shortcut.name}</td>
        <td>${shortcut.short_name}</td>
        <td>${shortcut.description}</td>
        <td>${shortcut.url}</td>
        <td>
          ${this.renderEditButtons(shortcut, index)}
        </td>
      </tr>
    `);

    return html`
      <wa-scroller without-scrollbar>
        <table class="table table-sm wa-zebra-rows" id="shortcuts">
          <thead>
            <tr>
              <th>${msg('Name')}</th>
              <th>${msg('Short Name')}</th>
              <th>${msg('Description')}</th>
              <th>${msg('URL')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </wa-scroller>
      
      ${this.renderAddButton()}
    `;
  }

  renderHandlers() {
    const body = this.manifest.protocol_handlers?.map((handler, index: number) => html`
      <tr>
        <td>${handler.protocol}</td>
        <td>${handler.url}</td>
        <td>
          ${this.renderEditButtons(handler, index)}
        </td>
      </tr>    
    `);

    return html`
      <wa-scroller without-scrollbar>
        <table class="table table-sm wa-zebra-rows" id="protocol_handlers">
          <thead>
            <tr>
              <th>${msg('Protocol')}</th>
              <th>${msg('URL')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </wa-scroller>
      
      ${this.renderAddButton()}
    `;
  }

  renderScreenshots() {
    const body = this.manifest.screenshots?.map((screenshot, index: number) => html`
      <tr>
        <td>${screenshot.src}</td>
        <td>${screenshot.sizes}</td>
        <td>${screenshot.type}</td>
        <td>${prettyCase(screenshot.form_factor)}</td>
        <td>${PLATFORMS[screenshot.platform as string]}</td>
        <td>
          ${this.renderEditButtons(screenshot, index)}
        </td>
      </tr>
    `);

    return html`
      <wa-scroller without-scrollbar>
        <table class="table table-sm wa-zebra-rows" id="screenshots">
          <thead>
            <tr>
              <th>${msg('URL')}</th>
              <th>${msg('Sizes')}</th>
              <th>${msg('Type')}</th>
              <th>${msg('Form Factor')}</th>
              <th>${msg('Platform')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </wa-scroller>
      
      <wa-button-group>
        ${this.renderAddButton()}
        <wam-import-images-button .member=${this.member}></wam-import-images-button>
      </wa-button-group>
    `;
  }

  renderApplications() {
    return html`
      <wa-scroller without-scrollbar>
        <table class="table table-sm wa-zebra-rows" id="related_applications">
          <thead>
            <tr>
              <th>${msg('Platform')}</th>
              <th>${msg('App ID')}</th>
              <th>${msg('URL')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${this.manifest.related_applications?.map((application, index: number) => html`
            <tr>
              <td>${PLATFORMS[application.platform as string]}</td>
              <td>${application.id}</td>
              <td>${application.url}</td>
              <td>
                ${this.renderEditButtons(application, index)}
              </td>
            </tr>
          `)}</tbody>
        </table>
      </wa-scroller>
      
      ${this.renderAddButton()}
    `;
  }
  
  render() {
    return choose(this.member, [
      ['icons', () => this.renderIcons() ],
      ['shortcuts', () => this.renderShortcuts() ],
      ['protocol_handlers', () => this.renderHandlers() ],
      ['screenshots', () => this.renderScreenshots() ],
      ['related_applications', () => this.renderApplications() ],
    ]);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wam-member-table': WamMemberTable
  }
}
