import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config";

export const uploadFile = async (
  uri: string,
  folder: string,
  fileName?: string
): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const uniqueFileName = `${Date.now()}-${Math.random() * 10000}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, blob);
    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
