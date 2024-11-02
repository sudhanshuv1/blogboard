const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    console.log("A = " + authHeader);
    if (!authHeader?.startsWith('Bearer ')) {
        console.log('NO TOKEN');
        return res.status(401).json({ message: 'No token' });
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.id = decoded.User.id;
        console.log('req.id = ' + req.id);
        next();
    });
}

module.exports = verifyJWT;