 const downloadImage = (url) => {
  const imageUrl = url?.qr;
  const fileName = url?.title;

  const anchor = document.createElement("a");
  anchor.href = imageUrl;
  anchor.download = fileName;

  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);
};

export default downloadImage;
