import {
    // * App
    initializeApp,

    // * Firestore
    getFirestore, collection, 
    initializeFirestore,
    persistentLocalCache,
    enableIndexedDbPersistence,
    CACHE_SIZE_UNLIMITED,
    getDocsFromCache,
    onSnapshot,
    getDocs, setDoc, doc,
    orderBy, query, 

    // * Auth
    getAuth, onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut
}
from "./js/firebaseUtils.js"

// * formatDateForEntry(), addZero(), emailValid()
// * hide(), showFlex(), showBlock()
// * Added to namespace from js/utils.js in index.html

//TODO MAKE VAR FOR GLOBAL VARS


const firebaseConfig = {
    apiKey: "AIzaSyBXiMzyl3Q5IwCMFSoLYVQBdRiWTVq7ChI",
    authDomain: "diary-f575d.firebaseapp.com",
    projectId: "diary-f575d",
    storageBucket: "diary-f575d.appspot.com",
    messagingSenderId: "22289005998",
    appId: "1:22289005998:web:4a539cd0d2b8c0c92b5c3f"
}
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        cacheSizeBytes:CACHE_SIZE_UNLIMITED
    })
})
const auth = getAuth();


const categories = {
    dream : {
        name : "dream",
        bgColor: "#c692cd"
    },
    diary : {
        name : "diary",
        bgColor: "#CDC392"
    },
    thought : {
        name : "thought",
        bgColor: "#bbcd92"
    },
}

const timeframe = {
    use:false,
    start:0,
    end:0,
}

class Category {
    constructor(current){
        this.current = current   
    }
    get current() {
        return this._current
    }
    set current(categoryObject) {
        try{
            if(!categories.hasOwnProperty(categoryObject.name)){
                throw new Error("Method param. is not a category")
            }
            this._current = categoryObject
            
            filterEntries(this)
            
        }
        catch(e){
            console.log("Failed to switch current category")
            console.log(e)
        }
    }    
}

const category = new Category(categories.diary)

const months = [ 
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" 
]

const inputElms =  [...grab('.login-element > input', "all")]

const entriesElm = grab("entries")
const sidebarElm = grab("sidebar")




function switchToSignup(){

// * LogIn
    showBlock("login-container")

// * SignIn
    hide("signin-container")

// * SignUp
    showFlex("signup-container")

// * Content
    hide("content-container")
    hide("entries-content-container")
    hide("new-entry-container")
}

function switchToSignin(){

// * LogIn
    showBlock("login-container")

// * SignIn
    showFlex("signin-container")

// * SignUp
    hide("signup-container")

// * Content
    hide("content-container")
    hide("entries-content-container")
    hide("new-entry-container")
}

function switchToShowEntries(){

// * LogIn
    hide("login-container")
    
// * SignIn
    hide("signin-container")

// * SignUp
    hide("signup-container")

// * Content
    showFlex("content-container")
    showFlex("entries-content-container")
    hide("new-entry-container")
    
}

function switchToAddEntry(){

// * LogIn
    hide("login-container")
    
// * SignIn
    hide("signin-container")

// * SignUp
    hide("signup-container")

// * Content
    resetAddEntryInputs()
    showFlex("content-container")
    hide("entries-content-container")
    showFlex("new-entry-container")
}



function resetLoginInputs(){

    grab("signin-email-input").value = ""
    grab("signin-password-input").value = ""
    grab("signup-email-input").value = ""
    grab("signup-password-input").value = ""
    grab("signup-confirm-password-input").value = ""
    inputElms.forEach((inputElm) => {
        inputElm.classList.remove("login-input-clicked")
        inputElm.addEventListener("click", e => { e.target.classList.add("login-input-clicked") }, {once: true})
    })    
}

function resetAddEntryInputs(){
    //TODO 
}


// async function addEntry(
//     
//     categoryObj,
//     unixSecs=Math.round(Date.now() / 1000),
//     content="Lorem Ipsum"
// ){
//     console.log(categoryObj.current.name, unixSecs, content)
//     if(1){
//         try{
//             let docRef = setDoc(doc(db, `users/${userId}/entries`, unixSecs), {
//                 
//                 category:categoryObj.current.name,
//                 content:content
//             })
//         }
//         catch(e){
//             console.error("Error adding document: ", e);
//         }
//     }
// }
// await new Promise(r => setTimeout(r, 2000));
// addEntry(category)
// await new Promise(r => setTimeout(r, 2000));
// addEntry(category)
// await new Promise(r => setTimeout(r, 2000));
// addEntry(category)
// await new Promise(r => setTimeout(r, 2000));
// addEntry(category)
// await new Promise(r => setTimeout(r, 2000));
// addEntry(category)

// async function loadEntries(userId){
//     //console.log("Load data")
//     //TODO Add pagination, for now just load all then cache

//     let queryCached = query(collection(db, `users/${userId}/entries`))
    
//     let cachedDocs = await getDocsFromCache(queryCached)

//     if(cachedDocs.empty){
//         let queryAll = query(collection(db, `users/${userId}/entries`))
//         //getDocs(queryAll)
//     }
//     else{
//         //TODO Check for missing indexes between last index and first index of cached docs

//         // 
//     }

//     console.log(cachedDocs.empty)




//     // onSnapshot(
//     //     query(collection(db, `users/${userId}/entries`)), { includeMetadataChanges: true }, (snapshot) => {
//     //         snapshot.docChanges().forEach((change) => {
//     //             const source = snapshot.metadata.fromCache ? "local cache" : "server";
//     //             if(change.type === "added"){
//     //                 console.log("added:",change.doc.data(), "from", source)
//     //             }
//     //             if(change.type === "modified"){
//     //                 console.log("modified:",change.doc.data(), "from", source)
//     //             }
//     //             if(change.type === "removed"){
//     //                 console.log("removed:",change.doc.data(), "from", source)
//     //             }
//     //         })
//     //     }
//     // )
// }
async function loadEntries(userId){

}

function filterEntries(categoryObj){
    //console.log(grab("entries").children)
    if(grab("entries").children.length){
        console.log("filter entries",categoryObj.current, timeframe)
    }
    else{
        //console.log("no content to filter")
    }
}
function reverseChildren(){
    if(entriesElm.dataset.flipped == "false"){
        entriesElm.style.flexDirection = "column-reverse";
        entriesElm.style.justifyContent = "flex-end"
        sidebarElm.style.flexDirection = "column-reverse";
        sidebarElm.style.justifyContent = "flex-end"
        entriesElm.dataset.flipped = "true"
        grab("sidebar-toggle-button").innerHTML = "&#8593;"
        return
    }
    if(entriesElm.dataset.flipped == "true"){
        entriesElm.style.flexDirection = "column";
        entriesElm.style.justifyContent = "flex-start"
        sidebarElm.style.flexDirection = "column";
        sidebarElm.style.justifyContent = "flex-start"
        entriesElm.dataset.flipped = "false"
        grab("sidebar-toggle-button").innerHTML = "&#8595;"
        return
    }
}
function unloadEntries(){
    //console.log("Unload data")
}

function addEventListenersToElements(){

// ? Signin buttons
    grab("signin-button").addEventListener("click", signInUser)
    grab("signup-redirect-button").addEventListener("click", switchToSignup)

// ? Signup buttons
    grab("signup-button").addEventListener("click", createAndSignInUser)
    grab("signin-redirect-button").addEventListener("click", switchToSignin)

// ? Content buttons
    grab("dream-selector-button").addEventListener("click", () => category.current = categories.dream)
    grab("diary-selector-button").addEventListener("click", () => category.current = categories.diary)
    grab("thought-selector-button").addEventListener("click", () => category.current = categories.thought)

    grab("sidebar-toggle-button").addEventListener("click", reverseChildren)
    grab("add-entry-button").addEventListener("click", switchToAddEntry)

    grab("logout-button").addEventListener("click", signOutUser)
    

// ? Add entry buttons
    grab("cancel-entry-button").addEventListener("click", switchToShowEntries)

    //TODO On add entry button, add a one time click event listener for loading drafts, so that theyre only read if theyre needed, and after that theyre saved in a variable

}



async function signInUser(){
    
    let emailInput      = grab("signin-email-input").value
    let passwordInput   = grab("signin-password-input").value

    let errorsList = []

    if(!emailValid(emailInput)){        errorsList.push("Email invalid.") }
    if(emailInput == ""){               errorsList.push("Email cannot be empty.") }
    if(passwordInput == ""){            errorsList.push("Password cannot be empty.") }
    if(!passwordInput.length > 1000){   errorsList.push("Your passowrd does not need to be that long. cmon.") }

    if(errorsList.length == 0){
        await signInWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => { 
            // ? Throws to signin-state observer
        })
        .catch((error) => { 
            errorsList.push(`Server: ${error.code.split("/")[1].replaceAll("-"," ")} `) 
        });   
    }
    
    if(errorsList.length > 0){
        grab("signin-error").style.display = "block" 
        grab("signin-error").innerHTML = ""
        errorsList.forEach((error) => { grab("signin-error").innerHTML += `# ${error} <br>` } ) 
    }  
}

async function createAndSignInUser(){

    //TODO Add email verification

    let emailInput              = grab("signup-email-input").value
    let passwordInput           = grab("signup-password-input").value
    let confirmPasswordInput    = grab("signup-confirm-password-input").value

    let errorsList = []

    if(!emailValid(emailInput)){                errorsList.push("Email invalid.") }
    if(emailInput == ""){                       errorsList.push("Email cannot be empty.") }
    if(passwordInput == ""){                    errorsList.push("Password cannot be empty.") }
    if(passwordInput != confirmPasswordInput){  errorsList.push("Passwords do not match.") }
    if(!passwordInput.length > 1000){           errorsList.push("Your password does not need to be that long. cmon.") }

    if(errorsList.length == 0){
        await createUserWithEmailAndPassword(auth, emailInput, confirmPasswordInput)
        .then((userCredential) => {
            // ? Throws to observer
        })
        .catch((error) => {
            errorsList.push(`Server: ${error.code.split("/")[1].replaceAll("-"," ")} `) 
        });        
    }

    if(errorsList.length > 0){
        grab("signup-error").style.display = "block" 
        grab("signup-error").innerHTML = ""
        errorsList.forEach((error) => { grab("signin-error").innerHTML += `# ${error} <br>` } ) 
    }
}

function signOutUser(){
    signOut(auth).then(() => {
        // ? Throws to observer
    }).catch((error) => {
        let errorMessage = error.code.split("/")[1].replaceAll("-"," ")
        console.log(errorMessage)
        // TODO Handle error, retry 
    });
}



// * Page load!



onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("show content and hide signin", user.uid)

        // ? FOR NOW: 
        // * A simple database snapshot is GET'd everytime a user logs on, 
        // * New entries get POST'd to the databse then added to the local cache (not GET'd, to save read calls)
        // * i.e: 
        // * Reads per session: X amount of documents already in database
        // * Writes per session: X amount of new documents created
        // * No offline access except if the whole thing has already been loaded once and the variable is in cache

        // TODO PLAN
        // * Only get a certain amt of entries and udate as user scrolls (less reads)
        // * Do the whole local cache and offline persistence thing isjk 
        // * Offline support

        

        resetAddEntryInputs()
        switchToShowEntries()

        //await loadEntries(user.uid)
        onSnapshot(
            query(collection(db, `users/${user.uid}/entries`)), { includeMetadataChanges: true }, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const source = snapshot.metadata.fromCache ? "local cache" : "server";
                    if(change.type === "added"){
                        console.log("added:",change.doc.data(), "from", source)
                    }
                    if(change.type === "modified"){
                        console.log("modified:",change.doc.data(), "from", source)
                    }
                    if(change.type === "removed"){
                        console.log("removed:",change.doc.data(), "from", source)
                    }
                })
            }
        )
    }
    else {
        console.log("hide content and show signin")

        //TODO Remove data from session in observer
        unloadEntries()
        resetLoginInputs()
        switchToSignin()

        // ? lets say someone logs in on an account at a library, how to make the logout button remove the data from lets say the cookies
    }
})



addEventListenersToElements()

