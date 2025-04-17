const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc login
// @route POST /auth
// @access Public
const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    const foundUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!foundUser) {
        return res.status(401).json({message: 'We don\'t have a user with that email'});
    }

    const blog = await prisma.blog.findUnique({
        where: {
            userId: foundUser.id,
        },
    });

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
        return res.status(401).json({message: 'Wrong password'});
    }

    const payload = {
        "User": {
            "id": foundUser.id,
            "email": email
        }
    };

    console.log("Blog of the logged in user = ", blog);

    const accessToken = jwt.sign (payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '50m' /* 30 min */});
    const refreshToken = jwt.sign (payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '60m' /* 7 days */});

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        maxAge: 7*24*60*60*1000
    });

    if(!blog) {
        res.json({ "accessToken" : accessToken, "user" : foundUser });
    }
    else {
        res.json({ "accessToken" : accessToken, "user": foundUser, "blog": blog });
    }
}

// desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.refreshToken) {
        res.status(401).json({message: "Unauthorized"});
    }

    const refreshToken = cookies.refreshToken;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({message: "Forbidden"});
        }

        const foundUser = await prisma.user.findUnique({
            where: {
                email: decoded.User.email,
            },
        });

        if (!foundUser) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const payload = {
            "User": {
                "id": decoded.User.id,
                "email": decoded.User.email
            }
        };

        const accessToken = jwt.sign (payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m' /* 30 min */});

        res.json({ accessToken });
    });
}

// @desc Logout
// @route POST /auth/logout
// @public - just to clear the refreshToken cookie if it exists
const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        return res.sendStatus(204)   //No content
    }
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: "Cookie cleared" });
}

module.exports = {
    login,
    refresh,
    logout
}

