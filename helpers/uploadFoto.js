export const uploadFoto = async (foto) => {
  var imgArray = [];
  for (const item of foto) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", process.env.CLOUD_UPLOAD_PRESET);
    formData.append("cloud_name", process.env.CLOUD_NAME);

    const res = await fetch(process.env.CLOUD_API, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    imgArray.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArray;
};
