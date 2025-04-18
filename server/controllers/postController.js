const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { uploadToS3, deleteFromS3 } = require('../config/awsConfig');
const { extractMediaFromContent } = require('../utils/contentUtils');


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

    // Fetch the existing post from the database
    const existingPost = await prisma.post.findUnique({
        where: { id },
    });

    if (!existingPost) {
        return res.status(400).json({ message: 'Post not found!' });
    }

    const previousContent = existingPost.content;

    // Extract media from the previous and updated content
    const { media: previousMedia } = extractMediaFromContent(previousContent);
    const { media: updatedMedia, document } = extractMediaFromContent(content);

    console.log("Previous Media:", previousMedia);
    console.log("Updated Media:", updatedMedia);


    const previousMediaSrcs = previousMedia.map((item) => item.src);
    const updatedMediaSrcs = updatedMedia.map((item) => item.src);

    console.log('Previous Media Srcs:', previousMediaSrcs);
    console.log('Updated Media Srcs:', updatedMediaSrcs);

    // Identify removed media
    const removedMedia = previousMedia.filter((item) => !updatedMediaSrcs.includes(item.src));

    // Identify newly added media
    const addedMedia = updatedMedia.filter((item) => !previousMediaSrcs.includes(item.src));

    console.log('Removed Media:', removedMedia);
    console.log('Added Media:', addedMedia);

    // Delete removed media from S3
    for (const media of removedMedia) {
        const fileName = media.src.split('/').pop(); // Extract file name from URL
        await deleteFromS3(fileName);
    }

    // Upload new media to S3 and update the content
    for (const media of addedMedia) {
        const base64Data = media.src.split(',')[1]; // Extract the Base64 data
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.jpg`; // Generate a unique file name
        const s3Url = await uploadToS3(base64Data, fileName);

        // Update the `src` attribute in the content
        media.element.setAttribute('src', s3Url);
    }

    // Serialize the updated content back to HTML
    const updatedContent = document.documentElement.outerHTML;

    // Update the post in the database
    const updatedPost = await prisma.post.update({
        where: { id },
        data: {
            title,
            content: updatedContent,
        },
    });

    if (!updatedPost) {
        return res.status(400).json({ message: 'Post could not be updated!' });
    }

    res.json(updatedPost);
};


// @desc Delete a post
// @route DELETE /post/:id
// @access Private
const deletePost = async (req, res) => {
    const postId = req.params.id;

    // Fetch the post from the database
    const existingPost = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!existingPost) {
        return res.status(400).json({ message: "Post not found!" });
    }

    const postContent = existingPost.content;

    // Extract media from the post content
    const { media: postMedia } = extractMediaFromContent(postContent);

    // Delete all media from S3
    for (const media of postMedia) {
        const fileName = media.src.split('/').pop(); // Extract file name from URL
        console.log(fileName);
        await deleteFromS3(fileName);
    }

    // Delete the post from the database
    const deletedPost = await prisma.post.delete({
        where: { id: postId },
    });

    if (!deletedPost) {
        return res.status(400).json({ message: "Post could not be deleted!" });
    }

    res.json({ message: "Post and associated media deleted successfully!" });
};

module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost
}

