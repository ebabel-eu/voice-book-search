# voice-book-search
Search for books with a voice activated input

## Development

### Pre-install
Your local environment relies on [Node.js](https://nodejs.org), and [Firebase](https://firebase.google.com/) (you may need to `sudo` on your machine):

```
npm install -g firebase-tools
```

Once installed, you may need to login if it's not already done:

```
firebase login
```

If you are in a cloud virtual machine, you might need to run a different login command, and when on another device you have authenticated, paste back into virtual machine the authorozation token:

```
firebase login --no-localhost
```

### Install
To install development environment dependencies:

```
npm install
```

### Build
The CSS can be minified after `npm install` has been run:

```
npm run build
```

## Deployment

### Deploy only hosting
```
firebase deploy --only hosting
```

## Technical stack
This stack is using web native technologies for both desktop and mobile devices:
- React.js
- Service Workers
- Web Components

## Learning resources
The following pages have been useful in learning how to write the code in this repository:

### Web Speech
- [Webspeech Demo](https://github.com/googlearchive/webplatform-samples/tree/master/webspeechdemo)

## todo

### Blockers
- Search with voice (or plain text in input).
- Web components (in Typescript).
- Infinite carousel (no third party dependency, native only).
- Stop scrolling on blur of page. See event `slideChange` triggered when slide changes. I could check if the page is in focus and allow the slide change, or return false and block the slide change if the page is on blur.
- Display book covers (-S, -M, or -L) depending on size of viewport.
- Load images lazily as the carousel scrolls with a small buffer of a few images.
- Relative time of a moment when the last search query was performed should be updatedautomatically. Display the relative time in a user's preferred language (navigator.language).

### Mediun priorities
- Design

### Low priorities
- Improve build script, automatically paste custom css into html.
- Minify the html from src to public.
- Improve the microphone images (maybe svg).
- Translate interface based on navigator.language
- Offer to switch UI language with a menu.
