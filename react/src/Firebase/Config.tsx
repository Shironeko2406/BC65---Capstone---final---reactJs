// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth"; 
import { message } from "antd";

const firebaseConfig = {
  apiKey: "AIzaSyAVOqm2RjCokn1aAgXs85hxupmyVWNA-cQ",
  authDomain: "imageupdatedb.firebaseapp.com",
  projectId: "imageupdatedb",
  storageBucket: "imageupdatedb.appspot.com",
  messagingSenderId: "640036381047",
  appId: "1:640036381047:web:13ba29c6b5c7ba260b8172",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const imageDB = getStorage(app);

// Set up Facebook Auth Provider
const provider = new FacebookAuthProvider();

export const signInWithFacebook = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log('User Info: ', user);
      message.success("Thành công!! Hãy Theo dõi trên console (Làm cho vui chứ api không lưu được token)")
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error during sign-in:', errorCode, errorMessage);
    });
};