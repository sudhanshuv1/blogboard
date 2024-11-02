const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
    const allUsers = await prisma.user.findMany();

    if(!allUsers?.length) {
        return res.status(400).json({ message: 'No users found' });
    }

    res.json(allUsers);
}

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    const foundUser = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if(!foundUser) {
        return res.status(401).json({ message: 'User not found' });
    }

    const userBlog = await prisma.blog.findUnique({
        where: {
            userId: id,
        },
    });
    
   if (userBlog) {
        await prisma.post.deleteMany({
            where: {
                blogId: userBlog.id,
            },
        });

        await prisma.blog.delete({
            where: {
                userId: id,
            },
        });
   }

    await prisma.profile.delete({
        where: {
            userId: id,
        },
    });

    const deletedUser = await prisma.user.delete({
        where: {
            id: id,
        },
    });

    const reply = `User with email ${deletedUser.email} and id ${id} has been deleted.`;

    res.json(reply);
}

module.exports = {
    getAllUsers,
    deleteUser
}