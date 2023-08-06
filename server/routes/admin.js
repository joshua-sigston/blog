// const express = require('express');
// const router = express.Router();
// const Post = require('../models/Post');
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// const adminLayout = '../views/layouts/admin';
// const jwtSecret = process.env.JWT_SECRET

// // middleware
// const authMiddleware = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     // res.status(401).json({ message: 'Unauthorized'});
//     res.redirect('/admin')
//   }

//   try {
//     const decoded = jwt.verify(token, jwtSecret);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Unauthorized'});
//   }
// }

// // POST, admin register
// router.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     try {
//       const user = await User.create({ username, password:hashedPassword });
//       res.status(201).json({ message: 'User Created', user });
//       res.render('admin/index', { locals, layout: adminLayout });
//     } catch (error) {
//       if(error.code === 11000) {
//         res.status(409).json({ message: 'User already in use'});
//       }
//       res.status(500).json({ message: 'Internal server error'})
//       res.redirect('/')
//     }

//   } catch (error) {
//     console.log(error);
//   }
// });

// // GET method, admin login page
// router.get('/admin', async (req, res) => {
  
//   try {
//     const locals = {
//       title: 'Admin',
//     }
//     res.render('admin/index', { locals, layout: adminLayout });
//   } catch (error) {
//     console.log(error)
//   }
// })

// // POST, admin check login
// router.post('/admin', async (req, res) => {
  
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
    
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid Credentials.'});
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid Credentials.'});
//     }

//     const token = jwt.sign({ userId: user._id}, jwtSecret);
//     res.cookie('token', token, { httpOnly: true});

//     res.redirect('/dashboard');

//   } catch (error) {
//     console.log(error)
//   }

// });

// // GET method, dashboard
// router.get('/dashboard', authMiddleware, async (req, res) => {
//   try {
//     const locals = {
//       title: 'Dashboard'
//     }

//     const data = await Post.find();
//     res.render('admin/dashboard', { data, locals, layout: adminLayout });
//   } catch (error) {
//     console.log(error);
//   }
// });

// // GET method, create new post
// router.get('/add-post', authMiddleware, async (req, res) => {
//   console.log(req.params)
//   try {
    
//     const locals = {
//       title: 'Add Post'
//     }

//     const data = await Post.find();
//     res.render('admin/add-post', { data, locals, layout: adminLayout });
//   } catch (error) {
//     console.log(error);
//   }
// });

// // POST method, create new post
// router.post('/add-post', authMiddleware, async (req, res) => {
//   try {
//     try {
//       const newPost = new Post({
//         title: req.body.title,
//         body: req.body.body,
//         author: req.user._id
//       })
//       await Post.create(newPost);
//       res.redirect('/dashboard');
//     } catch (error) {
//       console.log(error);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// // PUT method, edit post
// router.put('/edit-post/:id', authMiddleware, async (req, res) => {
//   try {
//     await Post.findByIdAndUpdate(req.params.id, {
//       title: req.body.title,
//       body: req.body.body,
//       updatedAt: Date.now()
//     });

//     res.redirect(`/edit-post/${req.params.id}`);
//   } catch (error) {
//     console.log(error);
//   }
// });

// // GET method, edit post
// router.get('/edit-post/:id', authMiddleware, async (req, res) => {
//   try {
//     const data = await Post.findOne({ _id: req.params.id});

//     res.render('admin/edit-post', {
//       data,
//       layout: adminLayout
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// // DELETE, delete post
// router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
//   try {
//     await Post.deleteOne({ _id: req.params.id});
//     res.redirect('dashbaord')
//   } catch (error) {
//     console.group(error);
//   }
// })

// // GET, logout
// router.get('/logout', (req, res) => {
//   res.clearCookie('token');
//   // res.json({ message: 'Logout Successsful'});
//   res.redirect('/');
// })

// module.exports = router;