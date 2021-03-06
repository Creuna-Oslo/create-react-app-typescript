# create-react-app

React app boilerplate

[![npm version](https://img.shields.io/npm/v/@creuna/create-react-app.svg?style=flat)](https://www.npmjs.com/package/@creuna/create-react-app)

## 👩‍💻 Usage

We recommend running this from [@creuna/cli](https://github.com/Creuna-Oslo/cli).

If you want to create a new app from JavaScript, this is the right module for you.

### Dependencies

The React app relies on `node-gyp` which means you might have to install some things to get it running. Please see [node-gyp docs](https://github.com/nodejs/node-gyp#installation) for instructions for your OS if you run into trouble.

**Requires node >= 7.5.x**

## Options

### 🚀 Project name

This will be used in `package.json` as well as for `<title>` in the mockup and `<h1>` on the mockup frontpage.

---

### 😸 Your full name

Used in the `author` field in `package.json`

---

### 💌 Your email address

Used in the `author` field in `package.json`

---

### ☁️ Include API-helper?

If you select this, `source/js/api-helper.js` will be included. This is a handy abstraction of `fetch` that supports automating analytics (optional), showing status messages (optional) and working with mock API responses.

#### Usage:

```js
api.execute(url, data).then(response => {
  // do something with response
}
```

---

### 📈 Include Analytics helper?

If you select this, `source/js/analytics.js` will be included and wired up to work with the API-helper.

#### Usage:

```js
const analyticsData = {}; // some google analytics data

analytics.send(analyticsData);
```

This will push `analyticsData` to `window.dataLayer`. `send` supports both objects and arrays.

#### With API-helper

If you format your API response in the following way (or make another human do so), `analytics` will be pushed to `window.dataLayer` automatically.

```
{
  "analytics": {
    // some analytics data here
  },
  "payload": {
    //actual content of API response
  }
}
```

When a `payload` object is present in the response, only the content of `payload` will be returned from `api.execute`.

---

### 🖼️ Include responsive images helper?

If you select this the following files will be included:

- `source/js/responsive-images.js`
- `source/components/image`
- `source/components/fluid-image`

These are intended to be used with the [ImageResizer for .NET](https://imageresizing.net/) plugin. The `Image` and `FluidImage` components use `responsive-images.js` to measure the rendered images and get the URL for an image of appropriate size.
