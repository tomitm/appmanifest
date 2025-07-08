import { createContext } from '@lit/context';

import type { WebAppManifest as StandardWebAppManifest, ImageResource, ShortcutItem, Screenshot, ExternalApplicationResource } from 'web-app-manifest';

export interface ProtocolHandler {
  protocol: string,
  url: string,
}

export interface WebAppManifest extends StandardWebAppManifest {
  protocol_handlers?: ProtocolHandler[]
}

export type ManifestMember = ImageResource | ShortcutItem | ProtocolHandler | Screenshot | ExternalApplicationResource;

export interface FormEventDetail {
  member?: 'icons' | 'shortcuts' | 'protocol_handlers' | 'screenshots' | 'related_applications',
  data?: ManifestMember | null,
  index?: number
}

export const manifestContext = createContext<WebAppManifest>('manifest');
export const editContext = createContext<FormEventDetail>('edit');
