# TripSpot

A create and view based web application that allow users to create tourist attraction sites (India) and upload images, give rating and reviews based on their personal experience.

## Features

- **MCV Architecture:** Implemented the Model-Controller-View architectural pattern for a scalable and organized codebase.
  
- **CRUD Functionality:** Comprehensive Create-Read-Update-Delete functionality for managing tourist spots.

- **Geospatial Data with MapBox:** Integrated MapBox for geospatial data, allowing users to locate trip-spot locations on a map.

- **Enhanced User Experience:** Implemented features like infinite scroll, a search engine, and user authentication and authorization using passport.js.

- **Middleware Solutions:** Leveraged various external middleware solutions for enhanced functionality and security:
  - connect-flash
  - express-session
  - express-mongo-sanitize
  - joi
  - helmet
  - passport
  - multer
  - router

## Tech Stack

- **Backend:** NodeJs, ExpressJS
- **Database:** MongoDB
- **Frontend:** HTML5, CSS, Bootstrap
- **Map Service:** MapBox
- **Storage Service:** Cloudinary
- **Hosting:** OnRender

## What I Learned

During the development of TripSpot, I gained valuable insights and hands-on experience in various areas of web development. Here's a summary of what I learned:

### Web Development Concepts

- **HTTP:** Understanding the fundamentals of the Hypertext Transfer Protocol (HTTP) and its role in web communication.
- **Authentication and Authorization:** Implementing user authentication and authorization using Passport.js, ensuring secure access to the application.
- **Backend Development:** Building the server-side logic and API endpoints using NodeJs and ExpressJS.
- **Frontend Development:** Creating the user interface with HTML5 and styling it with CSS, Sass, and Bootstrap.
- **REST API:** Designing and implementing a RESTful API to enable communication between the frontend and backend.

### Architecture and Design Patterns

- **MVC Model:** Implementing the Model-View-Controller (MVC) architectural pattern for a modular and maintainable codebase.
- **Security Measures:** Incorporating various security measures, including middleware solutions like helmet and express-mongo-sanitize.

### Geospatial Data and API Integration

- **MapBox Integration:** Utilizing MapBox as a custom map service provider for geospatial data, allowing users to locate trip-spot locations on a map.

### Additional Technologies

- **Node.js:** Leveraging the power of Node.js for server-side JavaScript, enabling efficient and scalable backend development.
- **Express.js:** Utilizing the Express.js framework to build robust and RESTful APIs for seamless communication between the frontend and backend.
- **Bootstrap:** Incorporating Bootstrap for responsive and visually appealing frontend design, ensuring a consistent user experience across devices.
- **Cloudinary:** Utilized as a powerful storage and management solution for handling media elements, including image uploading and delivery.

  ## Screenshots

![Home Page](images/Home Page.png)
![Map View](images/Map.png)
![Spot Details](images/Details.png)
![Sign Up Page](images/Sign In.png)

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up your MongoDB database.
4. Configure environment variables.
5. Run the application with `npm start`.
