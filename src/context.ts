import { createContext } from '@lit/context';

import type { FormEventDetail, WebAppManifest } from './types';

export const manifestContext = createContext<WebAppManifest>('manifest');
export const editContext = createContext<FormEventDetail>('edit');
