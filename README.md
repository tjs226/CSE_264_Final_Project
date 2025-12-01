# Bethlehem Events 
This Repo serves as the codebase for the Bethlehem Events web Application. This application served as the final project for CSE 264 at Lehigh University

## Description / Purpose
This Application serves as an event manager for the city of Bethlehem.  The inspiration for this project was that Bethlehem has become an arts comunity and has various public spaces where events are held for residents.  This application allows registered users to create events (and manage them) and allow all users to view events and RSVP to them. The application manages a set of users who serve as owners to events, anyone can create an account with the application so they can promote and manage events to get an idea of attendance.  

## Team Members 
Every Member of the team had development experiance.  However, every member on the team was a senoir and we decided to work on parts of the project we felt THE LEAST COMFORATABLE WITH (for the most part) when we entered the course to prepare for careers in full stack development. The following developers served the following rules on the project:
   
* Tedd Stabolepszy - Front End Developer & Database Administrator
* Tyreese Davidson - Backend Developer (Focused on API route creation)
* Annie Poon - Backend Developer (Focused on Auth)

## Tech Stack
For this project we utilized the following technologies:
* React + Vite (Javascript) - Frontend 
* Material UI - Frontend Components / Styleing 
* Express.js - Backend (Server)
* PostgreSQL (AWS) - Database   

## Application Features (How it meets each requirement)
1. User Accounts & Roles.   
    * Our Application has Two types of Users, Event Creaters and Event viewers. The Event Viewers can view all events in the system and RSVP to them. There RSVP's are stored in their browsers local storage as Event viewers do not require to have a regisered account with the application (We deemed local storage sufficant as an RSVP is an estimation, not an excact amount). Event Creaters must have a registered account with the application.  To access the event management page they must have an account, they have the option to sign in or to register a new account.  When they sign in the backend generates a JWT token (combination of user id and a known secrete) and sets in in the users browser.  Every time the user visits a page that requires auth, a call to the backend is made if they have a token in there cookie, and it is either validated or the user is redirected to login

2. Database.   
    * Our project uses a PostgreSQL database. It stores users and events.  There is a relation in which all events are 'owned' by a user. We utilized an AWS database that was avilible to use through the CSE 264 class.  [Database Schema](Database/Schema.png)

3. Interactive UI.  
    * Event Viewer Users Can Click on events to view more information and RSVP.  This is accomlipshed with interactive models
    * Event Creater Users can create, update, and delete events 
    * Information on the pages is 'refetched' Every time a chnage is made

4. New Library or Framework.   
    * We used the `jsonwebtoken` library on the backend to create JWT tokens for session management.  We manually developed an authorization system which manages users cookies (which expire in an hour).  We also used the `crypto` library to hash passwords.  All passwords are hashed (Shaw512) and stored in the database along with a random salt for security. 

5. Internal REST API.  
 * The Following API Endpoints Where Developed and used in this application:    
    * `POST: '/events'` - Creates a new event, Requires an authorized user, Event owner is the requester
    * `GET: '/events'` - Returns all events from database
    * `GET: '/events/:id'` - Returns an event with the given id
    * `PUT: '/events/:id/rsvp'` - Increments the rsvp counter for a given event 
    * `POST: '/auth/user/add'` - Adds a new user to the system (Passes email and password in request body)
    * `POST: '/auth/login'` - Logs a user into the system, Checks if they exist in the database, Sets there session cookie with a token for 1 hour
    * `POST: '/auth/logout'` - Logs a user out of the system, Requires an authorized user, Removes there cookie 
    * `GET: '/auth/user/current'` - Get the current information of user logged in, Requires an authorized user 
    * `GET: '/user/events'` - Returns the events belonging to the user currently logged in, Requires an authorized user 
    * `PUT: '/user/events/:id'` - Updates an Event, Requires an authorized user, Can only be made by the owner of the event
    * `DELETE: '/user/:id'` - Deletes an Event, Requires an authorized user, Can only be made by owner of the event

## Environment Setup and Database Configuration
This project uses a postgreSQL database.  We used AWS to host this during development but it could be hosted anywhere. Once a host is determined run the following SQL script to create the tables/reltations ([createTables.sql](Database/createTables.sql)). Create the following env variables where the server is to be ran/hosted and set them to the corisponding values to point to the database:

* `DB_HOST` - the host address to where the database is hosted
* `DB_PORT` - the port number of the host
* `DB_NAME` -  the name of the database on the host to be used 
* `DB_USER` -  the username of the user in the database (defualted as `postgres` on most systems)
* `DB_PASSWORD` - the password for the user in the database (defualted as `postgres` on most systems)

We also need an additional environment variable to hold the secrete key to generate/sign tokens with. It is simply 64 random bytes. We decided to store it as an env var so it stays consitant between runs of the server which made development eaisier. It could be generated in many ways, one way to create it is to run `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` and then copy its content to an environment variable called:

* `SECRET_KEY`

For development we used a `.env` file, but normal system envirnoment variables could be used with modifications


## How to Run 
1. Make sure your environmental vars are set and your database is running and availible 
    * see section above `Environment Setup and Database Configuration`
2. Start the Server 
    * navigate inside `Server/`
    * run `npm install`
    * run `npm run dev`
3. Start the client (React Project)
    * navigate to `Client/event-tracker`
    * run `npm install`
    * run `npm run dev`


## Future Direction (ideas)
* Create an interface for users to manage their creds, such a reseting their password
* Have Events expire (not show on home page) when the event has passed 
* Indicate if an event is free or paid 
* provide a way for users to purchase tickets if a paid event 
* provide better feedback on success of an action in the system (maybe a snackbar notifcation)