const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc Create new post
// @route POST /post
// @access Private
const createPost = async (req, res) => {
    const { blogId, title, content } = req.body;

   /* if(!blogId || !title || !content) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    */
   
    const createdPost = await prisma.post.create({
        data: {
            title: title,
            content: content,
            blogId: blogId,
        },        
    });

    if (!createdPost) {
        res.status(400).json({ message: "Post could not be created!" });
    }
 
    res.json(createdPost);
}

// @desc Get a post
// @route GET /post
// @access Private
const getPost = async (req, res) => {
    const post = await prisma.post.findUnique({
        where: {
            id: req.params.id,
        },
    });

    if (!post) {
        res.status(400).json({ message: "Post not found!" });
    }

    res.json(post);
}

// @desc Update a post
// @route UPDATE /post/:id
// @access Private
const updatePost = async (req, res) => {

    const id = req.params.id;

    const { title, content } = req.body;

    const updatedPost = await prisma.post.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            content: content,
        },
    });

    if (!updatedPost) {
        res.status(401).json({ message: "Post could not be updated!" });
    }

    res.json(updatedPost);
}

// @desc Delete a post
// @route DELETE /post/:id
// @access Private
const deletePost = async (req, res) => {

    const deletedPost = await prisma.post.delete({
        where: {
            id: req.params.id,
        },
    });

    if (!deletedPost) {
        res.status(401).json({ message: "Post could not be deleted!" });
    }

    res.json(deletedPost);
}

module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost
}

