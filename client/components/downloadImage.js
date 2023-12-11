

export const handleDownload = (imageBlob, filename = 'downloaded_image.png') => {
    if (imageBlob) {
      const url = URL.createObjectURL(imageBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };
  