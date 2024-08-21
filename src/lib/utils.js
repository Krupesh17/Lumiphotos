export const getImageDimensions = async (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };
    };
    reader.onerror = (error) => reject(error);
  });
};

export const getBlurredCompressedImageFile = (imageFile, imageFileName) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      maxWidthOrHeight: 8,
    };

    try {
      const originalImage = new Image();
      originalImage.src = URL.createObjectURL(imageFile);

      originalImage.onload = () => {
        const aspectRatio = originalImage.width / originalImage.height;
        const compressedHeight = Math.round(
          options.maxWidthOrHeight / aspectRatio
        );

        const canvas = document.createElement("canvas");
        canvas.width = options.maxWidthOrHeight;
        canvas.height = compressedHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File(
              [blob],
              `${imageFileName}_blurred.jpg`,
              {
                type: "image/jpeg",
              }
            );
            resolve(compressedFile);
          },
          "image/jpeg",
          0.9
        );
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const getCompressedImageFile = (file, percentage) => {
  return new Promise((resolve, reject) => {
    if (!file || !percentage || percentage <= 0 || percentage > 100) {
      reject(new Error("Invalid file or percentage"));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const scaleSize = percentage / 100;
        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas to Blob conversion failed"));
              return;
            }

            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          "image/jpeg",
          0.8
        ); // 0.8 is the quality parameter
      };
      img.onerror = () => {
        reject(new Error("Image loading failed"));
      };
    };
    reader.onerror = () => {
      reject(new Error("File reading failed"));
    };
  });
};
