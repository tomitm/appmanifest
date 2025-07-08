# Web App Manifest Generator

A comprehensive tool to quickly generate your app's first Web App Manifest or make changes to an existing manifest and add new capabilities as the specification evolves.

https://tomitm.github.io/appmanifest/

## Web App Manifests

The web app manifest is a file you create that tells the browser how you want your web content to display as an app in the operating system. The manifest can include basic information such as the app's name, icon, and theme color; advanced preferences, such as desired orientation and app shortcuts; and catalog metadata, such as screenshots.

## Development

This is a single-page app built with TypeScript and Web Components from [Web Awesome](https://webawesome.com/) and [Lit](https://lit.dev/), bundled with [Vite](https://vite.dev/).

1. Your development environment needs to have Node.js installed, otherwise get started quickly with the included devcontainer in VSCode.
2. Run `npm install` to install dependencies.
3. Run `npm start` to build and start a devserver, then navigate to `http://localhost:5173/appmanifest/` to find the app.

This app uses [@lit/localize](https://lit.dev/docs/localization/overview/) for transations. For any message changes, run `npm run i18n-extract` to extract the changes into the `xliff` folder, update the translations in there, then run `npm run i18n-build`.
