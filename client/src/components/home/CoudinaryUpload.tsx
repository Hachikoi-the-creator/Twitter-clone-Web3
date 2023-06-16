import React, { useRef } from "react";
import { createReadStream } from "fs";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET",
});

export default function CloudinaryUpload() {
  const imageRef = useRef(null);

  const handleImageUpload = async () => {
    const file = imageRef.current.files[0];

    try {
      const uploadResult = await cloudinary.v2.uploader
        .upload_stream({ resource_type: "image" }, async (error, result) => {
          if (error) {
            console.log("Upload error:", error);
          } else {
            console.log("Upload result:", result);
          }
        })
        .end(createReadStream(file.path));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" ref={imageRef} />
      <button onClick={handleImageUpload}>Upload</button>
    </div>
  );
}
