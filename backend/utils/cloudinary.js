const cloudinary = require('cloudinary').v2;
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("File uploaded Successfully, ", response.url);
    fs.unlink(localFilePath);
    return response;
  } catch (e) {
    fs.unlink(localFilePath);  
    return null;
  }
};

export {uploadOnCloudinary}