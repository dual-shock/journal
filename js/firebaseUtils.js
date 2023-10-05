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
    onSnapshot,
    getFirestore, 
    collection, 
    getDocs, 
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
    getFirestore, 
    collection, 
    getDocs, 
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