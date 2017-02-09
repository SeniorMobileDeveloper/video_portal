## How to run the app:

`npm install` to install dependencies.
`npm test` to run unit tests with karma.
`npm start` to switch to parent directory where the node app is and start it. This requires MongoDB to be running.
The app will be available at http://localhost:3000

Test users are `tom`, `ali` and `harry`.
Password is `password` for all of them.

## Documentation
### Common
#### VideoService
A factory meant to connect to the video-related endpoints in the API.
Used by HomeController to load videos, and videoComponent for single load. Both also use the rate service.

### Components
#### AuthService
Factory to use the Authentication API. Login, Logout and some helpers.

#### AuthController
Controller in charge of doing Authentication related tasks. Login and Logout basically.

#### videoPortalHeader component
Header component, not much to say. Has the title and if the user is logged also the username and logout link.

#### HomeController
Controller for the home page. Gets the videos and makes them be displayed.

#### videoComponent
Component used both in the home page for each single video, and also in the video detail page. If the video doesn't get passed in binding it uses the VideoService to get it. It's also in charge of rating videos and calculating the average to display.


## To do's:

Add bundler.
Improve app style.
Check and improve responsiveness.
Refactor and improve unit tests.
