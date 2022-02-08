# Memories & Places

> Share the Memories you created and Places you visited with the world. 

This application uses [React JS](https://reactjs.org/docs/getting-started.html) component oriented UI creation paradigm. All components are written in [JSX](https://reactjs.org/docs/jsx-in-depth.html) and ES6 style and are
combined to get a single build for production purpose using [Webpack 5](https://webpack.js.org/concepts/).

Back end is implemented using [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/). [Atlas](https://www.mongodb.com/cloud/atlas), the _Cloud_ version of [MongoDB](https://docs.mongodb.com/) is used.
You can find the backend server-side code repo for this project [Server-Side Code](https://github.com/SiddharthSsb11/Memories-and-Places-Backend).
This application is powered by [AWS-S3](https://aws.amazon.com/s3/?nc2=h_ql_prod_fs_s3).


This is a _responsive web application_ for viewing in both Mobile and Desktop.

```
This is still a work in progress
If you find any bugs you can report it to me.
Pull requests are always welcome. For major changes, 
please open an issue first to discuss what you would like to change.

```

### Few Screenshots

![Homepage](/screenshots/Homepage.png "Homepage")
![Myplaces](/screenshots/Myplaces.png "Myplaces")
![Form](/screenshots/Form.png "Form")

## Hosted/Deployed

Hosted the application [Deployed Web-App](https://mern-memories-places.web.app) and the backend  [Heroku-ServerSide](https://memories-places.herokuapp.com/) on separate servers. 
Backend github repo link for the code [Server-Side](https://github.com/SiddharthSsb11/Memories-and-Places-Backend).

**Sample user login**

| Email | Password  |
| -------- | --------- |
| ozil@test.com | oziltest |

## Features

- It is a Full Stack Application. 
- User Profile.
- Other users places previews.
- Full featured posts creation.
- All other users shared posts/places/memories can be seen and interacted with.
- Map feature.
- Login/Signup as well as Logout feature is added.
- Authenticated user can create,update and delete their posted posts/places/memories.
- Authenticated user can like and comment too. 
- All the Memories created and Places shared are stored in the database i.e. <i>persistent</i>.


## Tech Stack

**Client:** React 

**Server:** Node, Express

**Database** MongoDb, Mongoose, AWS

This repository contains the client side frontend code made using React.


## Install Dependencies

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.