require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logger');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 5000;

app.use(logger);

app.use(cors(corsOptions));

// Increase the payload size limit for JSON and URL-encoded data
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());

app.use(cookieParser());


app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/profile', require('./routes/profileRoutes'));
app.use('/blog', require('./routes/blogRoutes'));
app.use('/blog/post', require('./routes/postRoutes'));

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});