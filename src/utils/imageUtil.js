import Resizer from "react-image-file-resizer";

export const resizeImageFile = ({
  file,
  maxWidth,
  maxHeight,
  compressFormat = "JPEG",
  quality,
  rotation,
}) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
