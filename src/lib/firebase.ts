// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXB4YFohr7QVd8he9QmuASesyvGiNqsAc",
  authDomain: "gramtalk-fec30.firebaseapp.com",
  databaseURL: "https://gramtalk-fec30-default-rtdb.firebaseio.com",
  projectId: "gramtalk-fec30",
  storageBucket: "gramtalk-fec30.appspot.com",
  messagingSenderId: "156529274764",
  appId: "1:156529274764:web:1677de6463faef1801b0a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
