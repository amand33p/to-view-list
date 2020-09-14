# ToViewList MERN

A MERN stack app for management of videos/articles, you've watched/read or planning to do.

## Demo

[Deployed on Heroku](https://to-view-list.herokuapp.com/)

## Built using

#### Front-end

- [ReactJS](https://reactjs.org/) - Frontend framework
- [Context API using useContext & useReducer hooks](https://reactjs.org/docs/context.html) - For state management
- [React Router](https://reactrouter.com/) - For general routing & navigation
- [Material-UI w/ lots of CSS customisations](https://material-ui.com/) - UI library

#### Backend-end

- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Express.js](https://expressjs.com/) - Node.js framework, makes process of building APIs easier & faster
- [MongoDB](https://www.mongodb.com/) - Database to store document-based data
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [JSON Web Token](https://jwt.io/) - A standard to secure/authenticate HTTP requests
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For hashing passwords
- [Validator.js](https://www.npmjs.com/package/validator) - For validation of JSON data
- [Mongoose Unique Validator](https://www.npmjs.com/package/mongoose-unique-validator) - Plugin for better error handling for unique fields within Mongoose schema
- [Dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables from a .env file

## Features

- Authentication (login/register with email)
- Add/update/delete entries
- Add title, link, description, tags & type of link
- Bookmark important stuff (by 'starring' it)
- Mark the already read/watched items as 'viewed'
- Search entries by title, description or tags
- Filter entries by type (article, video or other), or by starred or viewed
- Click on tags to show all entries containing the tag you clicked on.
- Sort entries by oldest first, newest first, A-Z (alphabetical) or Z-A (reverse alpha.)
- Toast notifications for actions such as adding new entry, or 'starring' it etc.
- Dark mode toggle w/ local storage save
- Responsive UI for all screens

## Screenshots

#### Desktop/Tablet Home

![Home](https://github.com/amand33p/to-view-list-mern/blob/master/screenshots/desktop-home.png)

#### Auth & Add Entry Form

![Add entry & auth forms](https://github.com/amand33p/to-view-list-mern/blob/master/screenshots/forms.png)

#### Responsive Mobile UI Home

![Responsive Mobile UI w/ FAB](https://github.com/amand33p/to-view-list-mern/blob/master/screenshots/mobile-ui.png)
