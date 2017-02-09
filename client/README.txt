How to run the app:

npm install to install dependencies
npm test to run unit tests with karma
npm start to switch to parent directory where the node app is and start it

Notes:

assets/lib includes a library that's not on npm registry
assets/js has a small pure js function for playing only one video at a time, task that's not as easy as it should in angular

I'd have liked to also use a bundler like gulp or webpack to avoid having so many script tags in index making a lot of requests to the server. And also for using ES2015.

Using a lot of existing libraries to don't re-invent the wheel.

Styles are minimalist. (Not ugly).
