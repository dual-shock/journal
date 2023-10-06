//TODO 
//TODO Perhaps switch from CDN to a node.js backend
//TODO I just loooove CDN's tho

import { 
    initializeApp, 
    
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

import {
    CACHE_SIZE_UNLIMITED,
    initializeFirestore,
    enableIndexedDbPersistence,
    persistentLocalCache,
    onSnapshot,
    getFirestore, 
    collection, 
    getDocs, 
    getDocsFromCache,
    setDoc, 
    orderBy, 
    doc, 
    query 
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js"

export {
    initializeApp, 
    initializeFirestore,  
    enableIndexedDbPersistence,
    CACHE_SIZE_UNLIMITED,  
    persistentLocalCache,
    getFirestore, 
    collection, 
    getDocs, 
    getDocsFromCache,
    onSnapshot,
    setDoc, 
    orderBy, 
    doc, 
    query, 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut 
}