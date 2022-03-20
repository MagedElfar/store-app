import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCs5l7txmCzCGtQHj6T6Y0uCcHhvorOh3A",
    authDomain: "react-store-8d220.firebaseapp.com",
    projectId: "react-store-8d220",
    storageBucket: "react-store-8d220.appspot.com",
    messagingSenderId: "303345974418",
    appId: "1:303345974418:web:c284fc98c8dac08580fa4b"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();


const getCollection = (collection) => {
    return db.collection(collection); 
};

const deleteProduct = async (collection , id) => {
    return await db.collection(collection).doc(id).delete(); 
};

function toggelSlug (link , splitmark , joinmark){
    let slug = [];
    slug = link.split(splitmark).join(joinmark).toLowerCase();
    return slug
}



export default db;
export {getCollection , deleteProduct , toggelSlug , storage , auth};