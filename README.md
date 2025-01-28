# Monster Job Search Extension

## What does this extension do?

This extension provides more information about the jobs appearing within the Monster job search results page, and about the factors that determine their position within the results.

## For internal users

See the [installation and usage doc](https://monster-next.atlassian.net/wiki/spaces/STCT/pages/2119926665/JSP+Installation+guide) for the current version

> // todo - update link when complete



## For developers

If you do not have pnpm (a package manager for node projects) installed, you can install it with npm:

```
npm install -g pnpm@latest-10
```

or homwbrew:

```
brew install pnpm
```

To build/rebuild the extension (using node/npm):

```
$ pnpm build
```

After the project is built, a directory named `dist` will be created and the extension can be installed in Chrome (see below).

However, for development use the development server, which will automatically rebuild the extension when changes are made:

```
$ pnpm dev
```



### To install the extension:

1. Open Chrome
2. Navigate to `chrome://extensions`
3. Enable 'Developer mode'
4. Click 'Load unpacked'
5. Select the `dist` directory



### How does the extension work?

The extension is composed of four primary components:

-   #### Manifest

    This mandatory JSON file defines the configuration, permissions and metadata for the extension.

-   #### Content (and inline) scripts

    The main content script injects the extension 'App' into the context of search results pages across all Monster domains. While it can access and modify the DOM, it operates in an isolated context which means it cannot access key data added by the Monster site (Window properties and React element info). Thus, a 'world' script is injected into the Monster web page as a script tag purely in order to pass this information to the content script (through window messages) which is validated and passed to a store.
    
    The 'main' part of the application is a React application that has several 'pages' that display different information including detailed information on the job search results from the store, user settings which are persisted locally and static links to the various Monster sites. 

-   #### Service worker

    This script runs in the background, and communicates with the content scripts running on all search pages, in order to sync and correctly persist settings used across all Monster domains.

-   #### Popup
    The popup page simply provides some basic information so that users can be directed to the documentation.

In addition, there are numerous assets and build/configuration files that are used to generate the extension. This is described in the build process section.

### How is it developed?

This extension is developed in React and TypeScript.

TanStack Router is used for routing within the extension.

Vite is the build tool and the Vite Plugin Web Extension (https://vite-plugin-web-extension.aklinker1.io/) simplifies the development/build process for extensions (particularly HMR or Hot Module Replacement).

Zustand provides simple state management, and zusty provides the ability to inspect the store within the browser devtools. 

### Linting & Formatting

ESLint, Prettier

#### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default {
    // other rules...
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
};
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



### to add: 

https://github.com/vitest-dev/vitest
https://github.com/testing-library/react-testing-library


https://github.com/lint-staged/lint-staged
https://github.com/typicode/husky

### to check:

#### info

Communication between the components

Since every component (popup, content script, and background script) is isolated,
we have to use Chrome's communication API to be able to send a message between
the components. We want our background script to function as a browser wide state,
and therefore all the communication about the plugin settings should go through it. However,
the state of the job results should be contained within the page as it is possible
to have multiple tabs open (different searches, domains etc) at the same time.

Whenever a content script page (or popup) is closed/refreshed, the state is lost.
Generally, we should ask the background for the current state (by listening to
messages from our background script), however we can  persist the settings in
local storage (or chrome storage) and use that for startup - then just need to
presist changes and communicate state changes to all tabs

step 1: retrieve persisted settings (if exist) via context (otherwise use defaults)
step 2: any requests to change state are handled by context, persisted (if possible) and sent to background
step 3: state changes are sent to all content tabs from background

#### Notes

The job search results are currently persisted in sessionStorage, and updated after each search/paging action.

sessionStorage is isolated for each tab, so events in sessionStorage cannot be subscribed to in other tabs.
Unfortunately the current page cannot listen to changes in storage triggered by that page.
So... the only way to listen for sessionStorage events is within a frame on that page.


#### useful links

job schema:
- https://github.com/monster-next/jobs-job-dto-v2/blob/master/src/main/resources/job.ext.schema.json
  
issues 

[Issues](https://trello.com/b/IqVufxSu/mv3-board)
