
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBNP8Yjbh_gLVySBlQC0XvGc6Oxmpn7nAE",
    authDomain: "profile-picture-zerowaste.firebaseapp.com",
    projectId: "profile-picture-zerowaste",
    storageBucket: "profile-picture-zerowaste.appspot.com",
    messagingSenderId: "372951723990",
    appId: "1:372951723990:web:0cd5c7950f87eefa6f7e77",
    measurementId: "G-27JG6W8JEX"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export default storage