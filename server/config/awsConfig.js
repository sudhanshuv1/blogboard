const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const uploadToS3 = async (base64Data, fileName) => {
    const buffer = Buffer.from(base64Data, 'base64');
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${fileName}`,
        Body: buffer,
        ContentType: 'image/jpeg', // Adjust based on the media type
    };

    const { Location } = await s3.upload(params).promise();
    return Location; // Return the URL of the uploaded file
};

const deleteFromS3 = async (fileName) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${fileName}`,
    };

    await s3.deleteObject(params).promise();
};

module.exports = {
    uploadToS3,
    deleteFromS3,
};