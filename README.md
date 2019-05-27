# My Journal

## Requirements
* node `8.9.0`
* npm `^6.0.1`
* mongodb `3.6.3`

## Installation

Download and install [MongoDB](https://www.mongodb.com/download-center#community)

Create a new MongoDB database. Retrieve your URI connection string. See examples [here](https://docs.mongodb.com/manual/reference/connection-string/#examples)
Create your .env file and populate the relevant values based on the sample file .env-sample

After confirming that your environment meets the above requirements, you can create a new project based on `react-redux-starter-kit` by doing the following:

```bash
$ git clone https://github.com/eldrego/react-redux-starter-kit.git <my-project-name>
$ cd <my-project-name>
```

Then install dependencies

```bash
$ npm install
$ npm start                     # Compiles the server-side and client side before the application launches
```
If everything works, you should get a message indicating so. In development Application will be served on port 8080
Open the web browser to http://localhost:8080/

While developing, leverage these additional scripts other than `npm start`;

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app for production at `localhost:8080`.|
|`dev`|Serves your app for development at `localhost:8080`. Watching files using Nodemon and Webpack's watch.|
|`test`|Runs unit tests with Jest, Mocha and generates a coverage report.|

## Project Structure

The project structure presented in this starter kit is outlined below. This structure is only meant to serve as a guide.

```
.
├── build                    # All build-related server side code
├── client                   # React-redux related files
│   ├── __tests__            # Unit tests
│   ├── dist                 # Transpiled react source code
│   ├── src                  # Collections of reducers/constants/actions
│   │   ├── actions          # Actions
│   │   ├── components       # Containers Components and Components connect to store and actions
│   │   ├── constants        # Constants
│   │   ├── reducers         # Reducers
│   │   ├── store.js         # Create and instrument redux store
│   │   ├── index.js         # Redux-specific pieces
│   │   ├── index.html       # Main HTML page container for app
│   │   └── styles.scss      # Application styles
└── server                   # Application source code
    ├── config               # Configurations folder (Database etc.)
    ├── controllers          #
    ├── models               #
    ├── routes               #
    ├── tests                # Unit test
    └── index.js             # Express application

```

## Contributing

I am more than happy to accept contributions to the project. Contributions can be in the form of feedback, bug reports or even better - pull requests :)
