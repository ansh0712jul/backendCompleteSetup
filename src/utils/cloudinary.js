import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null;
        // uploading the file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{ 
            resource_type:"auto"   
        });
        // file has been uploaded
        console.log("file uploaded on cloudinary",response);
        return response;
    } catch (error) {
        // removing locally saved temp file as the uploading gets failed
        fs.unlinkSync(localFilePath);
        return null
    }  
}

export { uploadOnCloudinary }