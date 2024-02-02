const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click", () => downloadAndDisplayImages(images));

async function downloadAndDisplayImages(images) {
  // Create an array of Promises to download each image
  const promises = images.map((image) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () =>
        reject(new Error(`Failed to load image's URL: ${image.url}`));
      img.src = image.url;
    });
  });

  // Use Promise.all to download all images in parallel
  return Promise.all(promises)
    .then((images) => {
      console.log(images.length);
      // Once all images are downloaded, display them on the webpage
      images.forEach((image) => {
        output.appendChild(image);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}