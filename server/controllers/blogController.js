const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc Create blog
// @route POST /blog
// @access Private
const createBlog = async (req, res) => {
    const id = req.id;
    const { name } = req.body;

    const existingBlog = await prisma.blog.findUnique({
        where: {
            userId: id,
        },
    });

    if (existingBlog) {
        return res.status(400).json({ message: "User already has a blog!" });
    }

    const blog = await prisma.blog.create({
        data: {
            name: name,
            userId: id,
        },
    });


    if (blog) {
        res.status(201).json(blog);
    }
    else {
        res.status(400).json({ message: "Blog could not be created!" });
    }
}

// @desc Get blog
// @route GET /blog
// @access Private
const getBlog = async (req, res) => {
    const id = req.params.id;
    console.log ('ID = ' + id);
    const blog = await prisma.blog.findUnique({
        where: {
            id: id,
        },
        include: {
            posts: true,
        },
    });

     console.log('FOUND');

    if (!blog) {
        res.status(400).json({ message: "Blog not found!" });
    }

    res.json(blog);
}

// @desc Update blog
// @route PATCH /blog
// @access Private
const updateBlog = async (req, res) => {
    const id = req.id;
    const { name } = req.body;

    const updatedBlog = await prisma.blog.update({
        where: {
            userId: id,
        },
        data: {
            name: name,
        },
    });

    if (!updatedBlog) {
        res.status(400).json({ message: "Blog could not be updated!" });
    }

    res.json(updatedBlog);
}

// @desc Delete blog
// @route DELETE /blog
// @access Private
const deleteBlog = async (req, res) => {
    const id = req.id;

    const blog = await prisma.blog.findUnique({
        where: {
            userId: id,
        },
    });

    const deletedPosts = await prisma.post.deleteMany({
        where: {
            blogId: blog.id,
        },
    });

    const deletedBlog = await prisma.blog.delete({
        where: {
            id: blog.id,
        },
    });

    if (!deletedBlog) {
        res.status(400).json({ message: "Blog could not be deleted!" });
    }

    res.status(201).json({ message: "Blog deleted!" });
}

module.exports = {
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog
}