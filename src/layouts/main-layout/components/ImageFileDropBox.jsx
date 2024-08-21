import { ExclamationCircleIcon, PhotoIcon } from "@heroicons/react/24/outline";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageFileDropBox = ({ file, setFile, fileUrl, setFileUrl }) => {
  const onDrop = useCallback(
    (acceptedFile) => {
      setFile(acceptedFile[0]);
      setFileUrl(URL.createObjectURL(acceptedFile[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg"],
    },
  });

  return (
    <section
      {...getRootProps()}
      className="bg-transparent rounded mb-2.5 cursor-pointer border border-border focus-within:outline-box"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <div className="relative bg-inherit rounded-md overflow-hidden">
          <div className="w-full min-h-[300px] max-h-[300px] bg-inherit flex justify-center p-2.5">
            <img src={fileUrl} className="w-full object-contain" />
          </div>
          <div className="absolute bottom-1.5 right-1.5 flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-md text-xs">
            <ExclamationCircleIcon className="w-5 h-5" strokeWidth={2} /> To
            replace, click or drag and drop your photo here.
          </div>
        </div>
      ) : (
        <div className="w-full min-h-[300px] flex items-center justify-center bg-inherit rounded-md">
          <div className="flex items-center flex-col gap-2 p-2.5 cursor-pointer">
            <PhotoIcon
              strokeWidth={1}
              className="w-h-32 h-32 text-border"
            />
            <p className="font-medium text-xl text-center">
              To upload, click or drag and drop your photo here.
            </p>
            <small className="text-copy-lighter">JPEG only • Max 50 MB</small>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageFileDropBox;
