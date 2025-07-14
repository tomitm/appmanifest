
import { configureLocalization } from '@lit/localize';
import { sourceLocale, targetLocales, allLocales } from './generated/locale-codes.js';

import '@awesome.me/webawesome/dist/components/card/card.js';
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import '@awesome.me/webawesome/dist/components/tab-group/tab-group.js';
import '@awesome.me/webawesome/dist/components/tab/tab.js';
import '@awesome.me/webawesome/dist/components/tab-panel/tab-panel.js';
import '@awesome.me/webawesome/dist/components/scroller/scroller.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/callout/callout.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';
import '@awesome.me/webawesome/dist/components/copy-button/copy-button.js';

import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';
import '@awesome.me/webawesome/dist/components/color-picker/color-picker.js';
import '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';
import '@awesome.me/webawesome/dist/components/radio/radio.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import '@awesome.me/webawesome/dist/components/button/button.js';

import './components/app.ts'
import './components/form.ts'
import './components/member-table.ts'
import './components/radio-display.ts'
import './components/select-platform.ts'
import './components/import-button.ts'
import './components/import-images-button.ts'

import './cards/header.ts'
import './cards/basics-card.ts'
import './cards/device-card.ts'
import './cards/store-card.ts'
import './cards/manifest-card.ts'
import './cards/head-card.ts'
import './cards/notes-card.ts'
import './cards/footer.ts'

import './dialogs/icons-dialog.ts'
import './dialogs/shortcuts-dialog.ts'
import './dialogs/handlers-dialog.ts'
import './dialogs/screenshots-dialog.ts'
import './dialogs/applications-dialog.ts'

// necessary for form validation; await before adding form event listeners
export const inputsReady: Promise<boolean> = Promise.all([
  customElements.whenDefined('wa-input'),
  customElements.whenDefined('wa-textarea'),
  customElements.whenDefined('wa-color-picker'),
  customElements.whenDefined('wa-radio-group'),
  customElements.whenDefined('wa-radio'),
  customElements.whenDefined('wa-select'),
  customElements.whenDefined('wa-option'),
  customElements.whenDefined('wa-checkbox'),
  customElements.whenDefined('wa-button'),
]).then(() => true, () => false);

// set locale
const { setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`./generated/locales/${locale}.ts`),
});

function getPreferredLocale(userLocales: readonly string[], appLocales: readonly string[]) {
  for (const userLocale of userLocales) {
    // exact match
    if (appLocales.includes(userLocale)) return userLocale;

    // loose match (allow user en-GB to match app en-*)
    const baseUserLocale = userLocale.split('-')[0];
    for (const appLocale of appLocales) {
      const baseAppLocale = appLocale.split('-')[0];
      if (baseUserLocale === baseAppLocale) return appLocale;
    }
  }
  // fallback to source
  return sourceLocale;
}

function autoSetLocale() {
  const preference = getPreferredLocale(navigator.languages, allLocales);
  if (!preference) return;
  void setLocale(preference);
}
autoSetLocale();

// set dark mode
function applyDark(mediaQuery: MediaQueryList | MediaQueryListEvent) {
  document.documentElement.classList.toggle('wa-dark', mediaQuery.matches);
}

const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
systemDark.addEventListener('change', applyDark);
applyDark(systemDark);
