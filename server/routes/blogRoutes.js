const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
    .post(blogController.createBlog)

router.route('/:id')
    .get(blogController.getBlog)
    .patch(blogController.updateBlog)
    .delete(blogController.deleteBlog);

module.exports = router

