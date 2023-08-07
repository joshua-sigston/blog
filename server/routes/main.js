const express = require('express');
const router = express.Router();
// const controllers = require('../controllers/controllers')
const mainControllers = require('../controllers/mainControllers');
const authControllers = require('../controllers/authControllers');

// GET method, homepage
router.get('/', mainControllers.homepage);
router.get('/register', mainControllers.registerGET);
router.post('/register', mainControllers.registerPOST);
router.get('/login', mainControllers.loginGET);
router.post('/login', mainControllers.loginPOST);
router.get('/logout', mainControllers.logoutGET);
router.get('/about', mainControllers.aboutGET);
router.get('/contact', mainControllers.contactGET);

router.get('/profile', authControllers.profileGET);
router.get('/create_post', authControllers.create_postGET);
router.post('/create_post', authControllers.create_postPOST);
router.get('/post/:id', authControllers.postGET);
router.get('/edit_post/:id', authControllers.editGET);
router.put('/edit_post/:id', authControllers.editPUT);
router.delete('/delete_post/:id', authControllers.postDELETE);

module.exports = router;

// function insertPost() {
  //   Post.insertMany([
  //         {
  //           title: "Building APIs with Node.js",
  //           body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
  //         },
  //         {
  //           title: "Deployment of Node.js applications",
  //           body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
  //         },
  //         {
  //           title: "Authentication and Authorization in Node.js",
  //           body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
  //         },
  //         {
  //           title: "Understand how to work with MongoDB and Mongoose",
  //           body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
  //         },
  //         {
  //           title: "build real-time, event-driven applications in Node.js",
  //           body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
  //         },
  //         {
  //           title: "Discover how to use Express.js",
  //           body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
  //         },
  //         {
  //           title: "Asynchronous Programming with Node.js",
  //           body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
  //         },
  //         {
  //           title: "Learn the basics of Node.js and its architecture",
  //           body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
  //         },
  //         {
  //           title: "NodeJs Limiting Network Traffic",
  //           body: "Learn how to limit netowrk traffic."
  //         },
  //         {
  //           title: "Learn Morgan - HTTP Request logger for NodeJs",
  //           body: "Learn Morgan."
  //         },
  //       ])
  // }
  
  // insertPost()