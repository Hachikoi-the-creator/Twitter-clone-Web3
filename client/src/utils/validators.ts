import { uploadImage } from "./cloudyUpload";

export async function validateTweetData(image: File | null, message: string) {
  // send the missing data as "" if theres at least one valid param
  if (!image) {
    if (!message.length) {
      throw new Error("either send message or imageUrl");
    } else {
      return { msg: message, imgUrl: "" };
    }
  }

  if (image) {
    // upload image to cloudy
    const imageUrl = await uploadImage(image);
    if (message.length) {
      return { msg: message, imgUrl: imageUrl };
    } else {
      return { msg: "", imgUrl: imageUrl };
    }
  }

  // whit this extra error throwing we tell ts that it wont have to account for return undefined
  throw new Error("unreachable"); // Indicate that this line should never be reached
}
