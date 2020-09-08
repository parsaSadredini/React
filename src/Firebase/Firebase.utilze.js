import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

  const firebaseConfig = {
    apiKey: "AIzaSyD4_LuPzohpRMhhGih6M5rzERhU7Q8ORGA",
    authDomain: "crwn-db-b6eef.firebaseapp.com",
    databaseURL: "https://crwn-db-b6eef.firebaseio.com",
    projectId: "crwn-db-b6eef",
    storageBucket: "crwn-db-b6eef.appspot.com",
    messagingSenderId: "228476670694",
    appId: "1:228476670694:web:fa3ec0ead056b452af2127"
  };
  export const createUserProfileDocument = async(userAuth,additionalData)=>{
      if(!userAuth) return;
        const userRef= firestore.doc(`users/${userAuth.uid}`);
        const snapShot =await userRef.get();
        if(!snapShot.exists){
          const {displayName , email} = userAuth;
          const date = new Date();
          try{
            await userRef.set({
              displayName,email,date,...additionalData
            });
          }catch(error){
            console.log("error")
          }
        }

        return userRef;
      }
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider =new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: "select_account"});
  export const sigInWithGoolge = ()=> auth.signInWithPopup(provider)

  export default firebase; 

