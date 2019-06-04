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
- AMP-HTML
- Service Workers
- Web Components

## Learning resources
The following pages have been useful in learning how to write the code in this repository:

- [AMP Boilerplate](https://amp.dev/boilerplate/)
- [AMP Validation](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_amp)
- [AMP URL and Code Validator](https://search.google.com/test/amp)
- [AMP Guides](https://amp.dev/documentation/guides-and-tutorials/start/create/basic_markup?format=websites)
- [AMP YouTube channel](https://www.youtube.com/watch?v=OO9oKhs80aI&list=PLXTOW_XMsIDQf5mXiTT6MhdYluziN7dwP&index=4)

## Validate AMP
To check if AMP HTML is valid, append `#development=1` to the url and check the console.

https://voice-book-search.firebaseapp.com/#development=1

## todo
- Improve build script, automatically paste custom css into html.
- Minify the html from src to public.
