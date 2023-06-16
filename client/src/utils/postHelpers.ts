// export const handlePostLogic = async (
//   message: string,
//   image: File | null,
//   isPermanent: boolean
// ) => {
//   let imageUrl = "";
//   if (image) {
//     imageUrl = await uploadImage(image);
//   }

//   console.log(message, imageUrl);

//   if (isPermanent) {
//     // hybrid
//     if (imageUrl.length && message.length) {
//       postNormalTweet(message, imageUrl);
//     }
//     // only message
//     else if (message.length) {
//       postNormalTweet(message, "");
//     }
//     // only image
//     else {
//       postNormalTweet("", imageUrl);
//     }
//   } else {
//     // hybrid
//     if (imageUrl.length && message.length) {
//       postNormalTweet(message, imageUrl);
//     }
//     // only message
//     else if (message.length) {
//       postNormalTweet(message, "");
//     }
//     // only image
//     else {
//       postNormalTweet("", imageUrl);
//     }
//   }
// };
