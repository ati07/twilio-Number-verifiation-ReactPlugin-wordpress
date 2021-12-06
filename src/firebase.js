import { initializeApp } from 'firebase/app'
// import 'firebase/auth'

var firebaseConfig = {
  // apiKey: "AIzaSyDqOLoTWxAa62adawEjxpSbkf2ZwYUYL9A",
  // authDomain: "friendly-chat-99089.firebaseapp.com",
  // databaseURL: "https://friendly-chat-99089.firebaseio.com",
  // projectId: "friendly-chat-99089",
  // storageBucket: "friendly-chat-99089.appspot.com",
  // messagingSenderId: "240867706099",
  // appId: "1:240867706099:web:c6b92181b62981e3b6e386"
    apiKey: "AIzaSyB5Yhdme9h81z6i6tKpI98j2HeHeMkxNro",
  authDomain: "eula-4615b.firebaseapp.com",
  projectId: "eula-4615b",
  storageBucket: "eula-4615b.appspot.com",
  messagingSenderId: "692208077890",
  appId: "1:692208077890:web:f86d24361f0aa153e6b1db",
  measurementId: "G-5GWV8N4XSV"
  };
  // Initialize Firebase
  const firebaseApp =initializeApp(firebaseConfig);
  
export default firebaseApp