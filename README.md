# Multi SPA (svelte)

## Introduction

This project will build multiple svelte single page apps in one project.

```
src/app.svelte
src/admin/app.svelte
```

To configure the builds edit `rollup.config.js`

```js
...
const buildthese = ["", "/admin"]; // edit this line and add the folders for SPA's
...
```

The output will be in :

```
dist/
    index.html
    bundle.js
    bundle.css
    global.css
    
dist/admin
    index.html
    bundle.js
    bundle.css
    global.css
```

To make debugging easier edit `debug.js` and set the `ServerURL` value to your back end server address so you can edit the front end code while connecting to your back end server for data and functionality. Use `window.ServerURL` in your `fetch()` calls (in production it will be "" so you will connect to the same server as your back end).

```js
import './main.js'
window.ServerURL = "http://localhost:88/";
console.log("debug data server : " + window.ServerURL);     
```

## Get started

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.
