import axios from "axios";

export const uploadImage = async (image: File) => {
  if (!image) return;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDY_NAME || "no-cloud-name";

  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "basic-img-preset");
  data.append("cloud_name", cloudName);

  const res = await axios
    .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data)
    .catch((err) => console.error(err));

  if (res?.data) {
    const imageUrl = res.data.secure_url;
    console.log(imageUrl);
    return imageUrl;
  }
};
