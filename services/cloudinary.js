
const cloudinary = require('cloudinary');
const { gravity } = require('sharp');
cloudinary.config({
    cloud_name: 'dclszdyzb',
    api_key: process.env.V2_API,
    api_secret: process.env.V2_SECRET,
    secure: true,
});

async function uploadImageBuffer(image) {
    try {
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream(
                {
                    folder: 'testing',
                    transformation: {
                        quality: 'auto:best',
                    }
                },
                (error, uploadResult) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(uploadResult);
                }).end(image);
        });
        return uploadResult;
    }
    catch (e) {
        return new Error('error uploading to cloudinary');
    }
}

async function getRecipeBanner(image) {
    try {
        let url = await cloudinary.url(image, { quality: 'auto', gravity: "auto", height: 300, width: 1280, crop: "fill" })
        return url;
    }
    catch (e) {
        throw ('Error while transforming the image');
    }

}


/*async function getRecipeSquare(image) {
    console.log('running');
    let res = await cloudinary.url(image, { width: 300, height: 300, crop: 'lfill' });
    console.log(res);
    return res;
}*/


async function getUserFace(image) {
    cloudinary.image(image, {
        transformation: [
            { gravity: "face", height: 200, width: 200, crop: "thumb" },
            { radius: "max" },
            { fetch_format: "auto" }
        ]
    })
}

module.exports = { uploadImageBuffer, getRecipeBanner, getUserFace }