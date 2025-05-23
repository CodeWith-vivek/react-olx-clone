
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import {getStorage} from "firebase/storage"
import { collection, getDocs, getFirestore, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};



const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
const storage=getStorage()
const fireStore=getFirestore(app)


const fetchFromFireStore=async()=>{
    try{
        const productsCollection=collection(fireStore,'products')
        const productSnapshot=await getDocs(productsCollection)
        const productList=productSnapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))
        console.log("Fetched products from FireStore",productList);
        return productList
        
    }catch(error){
        console.error("Error fetching products from Firestore: ",error);
        return []
        
    }

}

const signup = async (name, email, password,navigate) => {
  if (!name) {
    return toast.error("Name is required");
  }
  if (/[^a-zA-Z0-9 ]/.test(name)) {
    return toast.error("Name can only contain letters and numbers");
  }

  if (!email) {
    return toast.error("Email is required");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return toast.error("Please enter a valid email address");
  }

  if (!password) {
    return toast.error("Password is required");
  }
  if (password.length < 6) {
    return toast.error("Password must be at least 6 characters");
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|\[\]\\:";'<>?,./]).{6,}$/;
  if (!passwordRegex.test(password)) {
    return toast.error(
      "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
  if (/\s/.test(password)) {
    return toast.error("Password cannot contain spaces");
  }
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

       await updateProfile(user, {
         displayName: name,
       });

    await addDoc(collection(fireStore, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Sign up successful!");
    navigate("/")
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password,navigate) => {
  if (!email) {
    return toast.error("Email is required");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return toast.error("Please enter a valid email address");
  }

  if (!password) {
    return toast.error("Password is required");
  }
  if (password.length < 6) {
    return toast.error("Password must be at least 6 characters");
  }
  if (/\s/.test(password)) {
    return toast.error("Password cannot contain spaces");
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
    navigate("/")
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const logout = async (navigate) => {
  try {
    await signOut(auth);
    toast.success("Successfully logged out!");
    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error("An error occurred during logout.");
  }
};
export{
    auth,
    provider,
    storage,
    fireStore,
    fetchFromFireStore,
    login,
    signup,
    logout
}

