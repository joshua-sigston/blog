const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers')

// GET method, homepage
router.get('/', controllers.homepage);
router.get('/register', controllers.registerGET);
router.post('/register', controllers.registerPOST);
router.get('/login', controllers.loginGET);
router.post('/login', controllers.loginPOST);
router.get('/logout', controllers.logoutGET);
router.get('/profile', controllers.profileGET);
router.get('/create_post', controllers.create_postGET);
router.post('/create_post', controllers.create_postPOST);
router.get('/post/:id', controllers.postGET);
router.get('/edit_post/:id', controllers.editGET);
router.put('/edit_post/:id', controllers.editPUT);
router.get('/about', controllers.aboutGET);
router.get('/contact', controllers.contactGET);
// router.get('/posts/new', createPost);
// router.post('/posts/store', storePost)
// router.get('', async (req, res) => {

//   try {
//     const locals = {
//       title: 'Node JS Blog',
//       description: 'simple blog.'
//     }
    
//     let perPage = 6;
//     let page = req.query.page || 1;

//     const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .exec();

//     const count = await Post.count();
//     const nextPage = parseInt(page) + 1;
//     const hasNextPage = nextPage <= Math.ceil(count / perPage);

//     res.render('index', { 
//       locals, 
//       data, 
//       current: page, 
//       nextPage: hasNextPage ? nextPage : null,
//       currentRoute: '/'
//     });

//   } catch (error) {
//     console.log(error)
//   }

// });

// GET method, post:id
router.get('/post/:id', async (req, res) => {
  
  try {

    let id = req.params.id;

    const data = await Post.findById({ _id: id });

    const locals = {
      title: data.title,
    }
    
    res.render('post', { 
      locals, 
      data,
      currentRoute: `/post/${id}` });
  } catch (error) {
    
  }
});

// POST, searchTerm 
router.post('/search', async (req, res) => {

  try {
    let searchTerm = req.body.searchTerm;
    const search = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(search, 'i') }},
        { body: { $regex: new RegExp(search, 'i') }}
      ]
    })
    res.render('search', { data });
  } catch (error) {
    
  }

})

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