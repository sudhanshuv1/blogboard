const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { constants } = require('http2');



// @desc Check for existing email
// @route POST /profile/email
// @access Public
const matchEmail = async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.status(400).json({ message: 'Email is required'});
    }

    const foundUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    if(foundUser) {
        return res.status(400).json({ message: 'A profile with this email already exists!'});
    }
    else {
        return res.status(200).json({ message: 'Email is available!'});
    }
}

// @desc Create new profile
// @route POST /profile
// @access Public
const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required"});
    }
    
    const foundUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if(foundUser) {
        return res.status(401).json({message: `A profile with the email ${email} already exists!`});
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPwd,
        },
    });

    const profile = await prisma.profile.create({
        data: {
            userId: user.id,
        },
    });

    if(user && profile) {
        res.status(201).json({message: `Your profile with email ${email} has been created!`})
    }
    else {
        res.status(400).json({message: "User could not be created."});
    }
}

// @desc Get a profile
// @route GET /profile
// @access Private
const getProfile = async (req, res) => {

    const id = req.id;

    const profile = await prisma.profile.findUnique({
        where: {
            userId: id,
        },
    });

    if (!profile) {
        return res.status(400).json({ message: "Profile not found" });
    }

    res.json(profile);
}

// @desc Update a profile
// @route PATCH /profile
// @access Private
const updateProfile = async (req, res) => {
    const id = req.id;

    const { name, bio } = req.body;

    if (!name) {
        return res.status(400).json({message: "Fields marked as * are required!"});
    }

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if(!user) {
        return res.status(400).json({ message: "User not found." });
    }

    const updateUser = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            name: name,
        },
    });

    const updateProfile = await prisma.profile.update({
        where: {
            userId: id,
        },
        data: {
            bio: bio,
        },
    });

    if (updateUser && updateProfile) {
        res.status(201).json({ message: "Profile updated!" });
    }
    else {
        res.status(400).json({ message: "Profile could not be updated!" });
    }
}

// @desc Delete a profile
// @route DELETE /profile
// @access Private
const deleteProfile = async (req, res) => {
    const id = req.id;

    const user = prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!user) {
        return res.status(400).json({ message: "User not found!" });
    }
/*
    const blog = prisma.blog.findUnique({
        where: {
            userId: id,
        },
    });

    if (blog) {
        const deletedPosts = await prisma.post.deleteMany({
            where: {
                blogId: blog.id,
            },
        });

        const deletedBlog = await prisma.blog.delete({
            where: {
                userId: id,
            },
        });
    }    

    const deletedProfile = await prisma.profile.delete({
        where: {
            userId: id,
        },
    });
*/
    const deletedUser = await prisma.user.delete({
        where: {
            id: id,
        },
    });

    if (deletedUser) {
        res.status(201).json({ message: "Profile deleted!"});
    }
    else {
        res.status(400).json({ message: "Profile could not be deleted!" });
    }
}

module.exports = {
    matchEmail,
    signUp,
    getProfile,
    updateProfile,
    deleteProfile
}