import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAHyEi7naCL3mQQg9XB1uoGJjwsxZRkxPQ",
  authDomain: "readme-9f2ba.firebaseapp.com",
  projectId: "readme-9f2ba",
  storageBucket: "readme-9f2ba.appspot.com",
  messagingSenderId: "1026392192561",
  appId: "1:1026392192561:web:db552461ab654ee9624710",
  measurementId: "G-BYHWMKF40L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function App() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function uploadFile() {
    // console.log(image);
    // reference is just like folder/image_name
    const storageRef = ref(storage, "images/screenshot11.png");
    try {
      setIsLoading(true);
      const url = await uploadBytes(storageRef, image);
      console.log("Uploaded a blob", url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setImage(null);

    /*
      uploadBytes doesn't have pause, resume, cancel functionality
      For that we can use uploadBytesResumable
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.pause()
      uploadTask.resume()
      uploadTask.cancel()

    */

  }

  async function downloadFile() {
    try {
      setIsLoading(true);
      const url = await getDownloadURL(ref(storage, "images/screenshot11.png"));
      console.log(url);
      setImage(url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>Hello firebase storage bucket</h1>
      {isLoading ? <h1>Uploading...</h1> : <h1>Done!</h1>}
      <input type="file" onChange={(evt) => setImage(evt.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
      <button onClick={downloadFile}>Download image</button>
      {image && <img src={image} alt="firebase" />}
    </>
  );
}
