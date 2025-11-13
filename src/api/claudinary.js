const YOUR_CLOUD_NAME = "dzkiozbbk";
const YOUR_CLOUDINARY_PRESET = "Salon_Project";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    name: file.fileName || "image.png",
    type: file.type || "image/png",
  });
  formData.append("upload_preset", YOUR_CLOUDINARY_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${YOUR_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url; // URL of uploaded image
  } catch (err) {
    throw new Error(err.message || "Cloudinary upload failed");
  }
};
