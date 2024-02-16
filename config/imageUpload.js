const cloudinary = require("cloudinary").v2

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder };

    if (height) {
      options.height = height;
    }

    if (quality) {
      options.quality = quality;
    }

    // Set the resource type based on the file type
    if (file.mimetype.includes("pdf")) {
      options.resource_type = "raw";
    } else {
      options.resource_type = "auto";
    }

    console.log("OPTIONS", options);

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);

    console.log("Upload result", result);

    return result;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error;
  }
}
