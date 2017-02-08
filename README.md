# Crossover Video Portal backend
This is the backend API code that needs to be consumed by front-end applications.


## Technical Trial Objective
You are supposed to develop the frontend of a single page application. It is a video portal, where users can login, see video listings, navigate to a single video, rate videos and can perform all media related tasks e.g. Play, Pause, Adjust volume and seek video position. (You can use the default HTML5 video player controls)

### Pre-Requisites
Client

You can choose any of the frameworks below to develop your client app:
AngularJS (1.x or 2.x)
EmberJS
REACT
Backbone
Grunt/Gulp
Karma/Jasmine
Server

NodeJS and npm
express
body-parser
morgan
mongoose
MongoDB

### Functional Requirements
- Develop a single page application by using one of the allowed MVV* frameworks.
- Design the UI, which should be motivated by the provided visuals.
- Implement user authentication. The content of this application should not be visible to public.
- User should be able to see video listings on index page. Only first 10 videos should be loaded initially.
- Lazy loading should be implemented i.e. More videos should appear as the user scrolls down the listing.
- Users should not be able to play more than 1 video simultaneously. Playing a video should pause all other videos.
- Users should be able to rate videos, an overall rating for each video should also be displayed.
- Users should be able to open the video details page by clicking on video title.
- REST API should be consumed.
- Unit tests with at least 50% code coverage should be provided.

### Non-Functional Requirements
- Code should be well documented by comments.
- Exception handling should be done, where necessary.
- Code should be well organized into files and folders.
- UI design should be clean and polished.
- CSS animations should be used to make the application more appealing.
- UI should be cross-browser compatible.
- UI should be cross-device compatible.


## Backend:

### Pre-requisites
MongoDb should be running.
Update the DB details in config.js
Run ‘npm install’ to download npm packages.
Run ‘npm start’ to start the backend API.
By Default the backend will start web server on http://localhost:3000/
Backend is designed to serve your client code. Simply copy your code inside the client folder, and your app would be accessible at root ’/ ‘ (with default configuration the URL will be http://localhost:3000/)


### Authenticate:

In Initial setup only three users are created - “ali”, “tom” and “harry” with password “password” for all.

This API call is used to authenticate the user to enter the application.

JSON object with with following attribute needs to be sent in Request:

username.

MD5 encrypted password.

JSON object with Status, Session ID and username  is returned in Response.

URL: http://localhost:3000/user/auth

Method: POST

Examples:

Input:

{"username":"ali", "password":"5f4dcc3b5aa765d61d8327deb882cf99"}
Response:

{"status":"success","sessionId":"a8t9Rr9bjWD2InfeFLbNS3FNg5mnFqiV","username":"ali"}
sessionId is to be sent with each request after login.


### Logout:

This API call is used to logout the user from application.

Query string should contain the following parameters:

sessionId

JSON object with Status is returned in Response.

URL: http://localhost:3000/user/logout

Method: GET

Examples:

Request URL:

http://localhost:3000/user/logout?sessionId=CLr7NWvDvdyy1h9Uhtce0CaO4lL09d0z
Response: 

{"status":"success"}

### Get Video Listings:

This API call is used to get the video listings.

Query string should contain the following parameters:

sessionId

skip [optional] (number of records to skip from start)

limit [optional] (number of records to fetch)

JSON object with status and videos data is returned in Response.

URL: http://localhost:3000/videos

Method: GET

Examples:

Request URL: 

http://localhost:3000/videos?sessionId=qOhmSmXoLuFv6g1YvvXOU4UJ2nuI11jA&skip=1&limit=1 
Response:

{"status":"success","data":[{"_id":"5757e6e41b0a244b256ac1d5","name":"[1] Google Cardboard Assembly","description":"Google Cardboard Assembly Step by Step Instructions [HD]","url":"videos/Google_Cardboard_Assembly.mp4","ratings":[4,5,5,5,3,5,4,5]}]}

### Get Single Video:

This API call is used to get details of a single video.

Query string should contain the following parameters:

sessionId

videoId

JSON object with status and video data is returned in Response.

URL: http://localhost:3000/video  

Method: GET

Examples:

Request URL: 

http://localhost:3000/video?sessionId=CqqAfowuZLzXHyViPaYzzyOU3dGPCFaG&videoId=5757e6e41b0a244b256ac1d5 
Response: 

{"status":"success","data":{"_id":"5757e6e41b0a244b256ac1d5","name":"[1] Google Cardboard Assembly","description":"Google Cardboard Assembly Step by Step Instructions [HD]","url":"videos/Google_Cardboard_Assembly.mp4","ratings":[4,5,5,5,3,5,4,5]}}

### Rate Video:

This API call is used to add user rating to a single video.

Query string should contain the following parameters:

sessionId

JSON object with with following attribute needs to be sent in Request:

videoid.

rating. (ranges from 1 to 5)

JSON object with status and video data is returned in Response.

URL: http://localhost:3000/video/ratings

Method: POST

Examples:

Request URL: 

http://localhost:3000/video/ratings?sessionId=CqqAfowuZLzXHyViPaYzzyOU3dGPCFaG 
Input:

{"videoId":"5757e6e41b0a244b256ac1d7","rating":"5"}
Response:

{"status":"success","data":{"_id":"5757e6e41b0a244b256ac1d7","name":"[3] How does Node.js work","description":"New to Node.js? Check out this video that explains \"How does Node work?\"","url":"videos/How_does_Node.js_work.mp4","ratings":[3,3,5]}}
