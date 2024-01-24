import {
    // * App
    initializeApp,

    collection, 
    initializeFirestore,
    persistentLocalCache,
    CACHE_SIZE_UNLIMITED,
    onSnapshot,
    setDoc, doc,
    query, 

    // * Auth
    getAuth, onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut
}
from "./js/firebaseUtils.js"

// * formatDateForEntry(), addZero(), emailValid()
// * hide(), showFlex(), showBlock(), binaryFind()
// * Added to namespace from js/utils.js in index.html

//TODO add email verification, pagination, make it so action buttons go up when typing in new entry, drafts functionality, and fix sidebar and category buttons highlight styling when selected
//TODO make entries go thru data sanitation SERVER SIDE
//TODO ? E2E encryption?
//TODO Add service worker to make downloadable
//TODO Add delete button (or mby just COMMAND, yk)
//TODO Make it so u can't add future entries, or edit entry date or entry content



const firebaseConfig = {
    apiKey: "AIzaSyBXiMzyl3Q5IwCMFSoLYVQBdRiWTVq7ChI",
    authDomain: "diary-f575d.firebaseapp.com",
    projectId: "diary-f575d",
    storageBucket: "diary-f575d.appspot.com",
    messagingSenderId: "22289005998",
    appId: "1:22289005998:web:4a539cd0d2b8c0c92b5c3f"
}
const app = initializeApp(firebaseConfig);



const months = [ 
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" 
]
const categories = {
    dream : {
        name : "dream"
    },
    diary : {
        name : "diary"
    },
    thought : {
        name : "thought"
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

const inputElms =  [...grab('.login-element > input', "all")]

const entriesElm = grab("entries")
const sidebarElm = grab("sidebar")

var sortedListOfIds = []
var sortedListOfEntries = []

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
    grab("time-input").value = `${new Date().getFullYear()}-${addZero(new Date().getMonth()+1)}-${addZero(new Date().getDate())}T${addZero(new Date().getHours())}:${addZero(new Date().getMinutes())}:${addZero(new Date().getSeconds())}`
    grab("text-input").value = ""
    grab("text-input").placeholder = "type here..."
}   

function addNewEntry(){
    let timeInput = grab("time-input").value
    let textInput = grab("text-input").value 

    let entryId = Math.round(new Date(timeInput).getTime() / 1000)


    if(textInput == ""){
        grab("text-input").placeholder = "entry cannot be empty! type something..."
    }
    else{
        console.log(userId)
        try{
            let docRef = setDoc( doc(db, `users/${userId}/entries`, `${entryId}`), {
                category:category.current.name,
                content:textInput
            })
            switchToShowEntries()
        }
        catch(e){
            console.log(e)
        }
    }
}
function openDrafts(){
    //TODO Add func.
    console.log("drafts functionality not yet added")
}
function addNewDraft(){
    //TODO Add func.
    console.log("drafts functionality not yet added")
}



function entryObjToEntryElement(entryObj){
    let entryElm = document.createElement("div")
    entryElm.addEventListener("click",e => e.target.classList.toggle("selected-entry-content"))
    entryElm.id = entryObj.id
    let entryDate = new Date(entryObj.id * 1000)
    entryElm.classList.add("entry")
    entryElm.dataset.category = entryObj.data().category
    entryElm.innerHTML = `
        <div class="entry-info">
            <div class="entry-date">
                ${formatDateForEntry(entryDate)}
            </div>
            <div class="entry-wordcount">
            ${entryObj.data().content.split(" ").length} words
            </div>
        </div>
        <div class="entry-content">
        ${entryObj.data().content}
        </div>
        <div class="entry-action-buttons">
            
        </div>
    ` 
    if(entryObj.data().category != category.current.name){
        entryElm.style.display = "none"
    }

    let year = `_${entryDate.getFullYear()}`
    let monthYear = `${months[entryDate.getMonth()]}_${entryDate.getFullYear()}`

    if(document.querySelector(`#${year}`) === null){
        let yearSidebarElm = document.createElement("div")
        
        yearSidebarElm.id = `${year}`
        yearSidebarElm.classList.add("year-container")
        yearSidebarElm.innerHTML = `
        <div class="year-title">${year.substring(1,5)}</div>
        <div class="months"></div>
        `
        yearSidebarElm.children[0].addEventListener("click", e => {
            if(!e.target.classList.contains("sidebar-selected")){
                if(grab("sidebar-selected","class").length){
                    grab("sidebar-selected","class")[0].classList.remove("sidebar-selected")
                }
                timeframe.use = true
                timeframe.start = Math.round(new Date(`1 January ${year.split("_")[1]} 00:00:00`).getTime() / 1000)
                timeframe.end = Math.round(new Date(`31 December ${year.split("_")[1]} 23:59:59`).getTime() / 1000)
                filterEntries(category)
                e.target.classList.add("sidebar-selected")    
            }
            else{
                timeframe.use = false
                filterEntries(category)
                e.target.classList.remove("sidebar-selected")   
            }
        })
        
        grab("sidebar").prepend(yearSidebarElm)
    }

    if(document.querySelector(`#${monthYear}`) === null){
        let monthSidebarElm = document.createElement("div")

        monthSidebarElm.addEventListener("click", e => {
            if(!e.target.classList.contains("sidebar-selected")){
                if(grab("sidebar-selected","class").length){
                    grab("sidebar-selected","class")[0].classList.remove("sidebar-selected")
                }
                timeframe.use = true
                timeframe.start = Math.round(new Date(`1 ${monthYear.replace("_"," ")} 00:00:00`).getTime() / 1000)
                timeframe.end = Math.round(new Date(`${new Date(entryDate.getFullYear(), entryDate.getMonth() + 1, 0).getDate()} ${monthYear.replace("_"," ")} 23:59:59`).getTime() / 1000)
                filterEntries(category)
                e.target.classList.add("sidebar-selected")    
            }
            else{
                timeframe.use = false
                filterEntries(category)
                e.target.classList.remove("sidebar-selected")   
            }
        })
        
        monthSidebarElm.id = `${monthYear}`
        monthSidebarElm.dataset.year = `${year}`
        monthSidebarElm.innerHTML = `${monthYear}`.substring(0,3)
        grab(`${year}`).children[1].prepend(monthSidebarElm)

    }

    return entryElm
}
function prependEntryToList(entryObj){

    let entryElm = entryObjToEntryElement(entryObj)

    sortedListOfEntries.push(entryElm)
    sortedListOfIds.push(entryObj.id)

    grab("entries").prepend(entryElm)

}
function insertEntryToList(entryObj){
    let insertInfo = binaryFind(sortedListOfIds, entryObj.id)
    if(insertInfo.found){throw new Error("item already exists at this second")}
    else{
        let entryElm = entryObjToEntryElement(entryObj)   
        
        sortedListOfIds.splice(insertInfo.index, 0, entryObj.id)
        sortedListOfEntries.splice(insertInfo.index, 0, entryElm)
    
        grab("entries").innerHTML = "";
        for(let entry of sortedListOfEntries){
            grab("entries").prepend(entry)
        }
    }
}

function filterEntries(categoryObj){
    let entries = grab("entries").children
    grab("content-container").className = categoryObj.current.name    
    if(entries.length){
        console.log("filter entries",categoryObj.current, timeframe)
        let entryVisible = false
        if(timeframe.use){
            for(let entry of entries){
                if(entry.dataset.category !== categoryObj.current.name 
                    || Number(entry.id) < timeframe.start
                    || Number(entry.id) > timeframe.end
                )
                {
                    entry.style.display = "none"
                }
                else{
                    entryVisible = true
                    entry.style.display = "block"
                }   
            }
        }
        else{
            for(let entry of entries){
                if(entry.dataset.category !== categoryObj.current.name){
                    entry.style.display = "none"
                }
                else{
                    entryVisible = true
                    entry.style.display = "block"
                }
            }
        }
        if(!entryVisible){
            //TODO Add a "no entries here" thing for when entryVisible is not true
        }
        else{

        }
    }
}
function reverseChildren(){
    if(entriesElm.dataset.flipped == "false"){
        entriesElm.style.flexDirection = "column-reverse";
        sidebarElm.style.flexDirection = "column-reverse";
        for(let monthsElm of grab(".months","all")){
            monthsElm.style.flexDirection = "column-reverse"
        }

        entriesElm.scrollTop = 0 - entriesElm.scrollHeight
        sidebarElm.scrollTop = 0 - sidebarElm.scrollHeight

        entriesElm.dataset.flipped = "true"
        grab("sidebar-toggle-button-text").style.transform ="rotate(-90deg)"
        return
    }
    if(entriesElm.dataset.flipped == "true"){
        entriesElm.style.flexDirection = "column"
        sidebarElm.style.flexDirection = "column";
        for(let monthsElm of grab(".months","all")){
            monthsElm.style.flexDirection = "column"
        }

        entriesElm.scrollTop = 0
        sidebarElm.scrollTop = 0    
    
        entriesElm.dataset.flipped = "false"
        grab("sidebar-toggle-button-text").style.transform ="rotate(90deg)"
        return
    }
    
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

// * Page load

var userId = ""
const auth = getAuth();
grab("loading").style.display = "none"
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("show content and hide signin", user.uid)
        userId = user.uid
        // TODO PLAN
        // * Only get a certain amt of entries and udate as user scrolls (less reads)
        // * Do the whole local cache and offline persistence thing isjk 

        switchToShowEntries()
        var lastId = "0"
        const db = initializeFirestore(app, {
            localCache: persistentLocalCache({
                cacheSizeBytes:CACHE_SIZE_UNLIMITED
            })
        })
        onSnapshot(
            query(collection(db, `users/${userId}/entries`)), { includeMetadataChanges: true }, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const source = snapshot.metadata.fromCache ? "local cache" : "server";
                    if(change.type === "added"){
                        if(Number(change.doc.id) > Number(lastId)){ //? If doc is newer
                            prependEntryToList(change.doc)      
                            console.log("added:",change.doc.id,change.doc.data(), "from", source)            
                        }
                        else{
                            insertEntryToList(change.doc)
                            console.log("inserted:",change.doc.data(), "from", source)
                        }
                    }
                    if(change.type === "modified"){
                        console.log("modified:",change.doc.data(), "from", source)
                    }
                    if(change.type === "removed"){
                        console.log("removed:",change.doc.data(), "from", source)
                    }
                    lastId = change.doc.id
                })
            }
        )
    }
    else {
        console.log("hide content and show signin")
        userId = ""

        resetLoginInputs()
        switchToSignin()

        // ? lets say someone logs in on an account at a library, how to make the logout button remove the data from lets say the cookies
    }
})

function addEventListenersToElements(){

    // ? Signin buttons
        grab("signin-button").addEventListener("click", signInUser)
        grab("signup-redirect-button").addEventListener("click", switchToSignup)
    
    // ? Signup buttons
        grab("signup-button").addEventListener("click", createAndSignInUser)
        grab("signin-redirect-button").addEventListener("click", switchToSignin)
    
    // ? Content buttons
        grab("content-container").addEventListener("click", e =>{
            if(
                grab("sidebar-selected","class").length 
                && !e.target.classList.contains("sidebar-selected")
                && !e.target.classList.contains("category-selector-button")
                && !e.target.classList.contains("entry-content")
            )
            {
                grab("sidebar-selected","class")[0].classList.remove("sidebar-selected")
                timeframe.use = false
                filterEntries(category)
            }
        })
        
        grab("dream-selector-button").addEventListener("click", e => {
            category.current = categories.dream;
            e.target.className = "category-selector-button category-selector-selected"
            grab("diary-selector-button").className ="category-selector-button"
            grab("thought-selector-button").className ="category-selector-button"
        })
        grab("diary-selector-button").addEventListener("click", e => {
            category.current = categories.diary;
            e.target.className = "category-selector-button category-selector-selected"
            grab("dream-selector-button").className ="category-selector-button"
            grab("thought-selector-button").className ="category-selector-button"
        })
        grab("thought-selector-button").addEventListener("click", e => {
            category.current = categories.thought;
            e.target.className = "category-selector-button category-selector-selected"
            grab("diary-selector-button").className ="category-selector-button"
            grab("dream-selector-button").className ="category-selector-button"
        })
    
        grab("sidebar-toggle-button").addEventListener("click", reverseChildren)
        grab("add-entry-button").addEventListener("click", switchToAddEntry)
    
        grab("logout-button").addEventListener("click", signOutUser)
        
    
    // ? Add entry buttons
        grab("cancel-entry-button").addEventListener("click", switchToShowEntries)
        grab("pick-draft-button").addEventListener("click", openDrafts)
        grab("draft-entry-button").addEventListener("click", addNewDraft)
        grab("submit-entry-button").addEventListener("click",addNewEntry)
    
        //TODO On add entry button, add a one time click event listener for loading drafts, so that theyre only read if theyre needed, and after that theyre saved in a variable
    
    }

addEventListenersToElements()
