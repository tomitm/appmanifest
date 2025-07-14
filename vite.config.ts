import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/appmanifest/',
  plugins: [
    VitePWA({
      injectRegister: 'inline',
      registerType: 'autoUpdate',
      manifest: false,
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,json,png}'
        ]
      }
    })
  ],
});
