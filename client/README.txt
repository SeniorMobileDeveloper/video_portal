How to run the app:

npm install to install dependencies.
npm test to run unit tests with karma (will need karma-cli to be installed globally: npm install -g karma-cli).
npm start to switch to parent directory where the node app is and start it. This requires MongoDB to be running.
The app will be available at http://localhost:3000

Notes:

assets/lib includes a library that's not on npm registry
assets/js has a small pure js function for playing only one video at a time, task that's not as easy as it should in angular

I'd have liked to also use a bundler like gulp or webpack to avoid having so many script tags in index making a lot of requests to the server. And also for using ES2015. But for timing reasons I didn't.

Using a lot of existing libraries to don't re-invent the wheel.

Styles are minimalist. Would need some more work, but I'm not doing that now as it's a time consuming task.

To implement a more complete approach to rating videos, some support from the backend would be required. Now the user is only allowed to rank a video once, until refreshing the page.
Also that API would need some tweaks (I'm also a nodejs developer)

As part of the tests run, a coverage html report is generated in client/coverage

The app is mostly responsive, but I didn't have the chance to test it extensively in different devices.

Tested in Chrome and Firefox. Couldn't test it on IE.

To do's:

Add bundler.
Improve app style.
Check and improve responsiveness.
Refactor and improve unit tests.
