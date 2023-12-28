

export const handleDownload = (imageUrl, filename = 'downloaded_image.jpeg') => {
  if (imageUrl) {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); 
  }
};