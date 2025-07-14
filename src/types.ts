import type { WebAppManifest as StandardWebAppManifest, ImageResource, ShortcutItem, Screenshot, ExternalApplicationResource, ExtendedDisplayModeType, CategoriesType, LaunchHandler } from 'web-app-manifest';

export interface ProtocolHandler {
  protocol: string,
  url: string,
}

export interface WebAppManifest extends StandardWebAppManifest {
  protocol_handlers?: ProtocolHandler[],
  [key: string]: string | boolean | ManifestMember[] | CategoriesType[] | LaunchHandler | ExtendedDisplayModeType[] | undefined,
}

export type ManifestMember = ImageResource | ShortcutItem | ProtocolHandler | Screenshot | ExternalApplicationResource;
export type WebAppManifestOrMember = WebAppManifest | ManifestMember;

export interface FormEventDetail {
  member?: 'icons' | 'shortcuts' | 'protocol_handlers' | 'screenshots' | 'related_applications',
  data?: WebAppManifestOrMember | null,
  index?: number
}
