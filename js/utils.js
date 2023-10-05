function formatDateForEntry(timestamp){
    let formattedDate = new Date(timestamp*1000).toLocaleString("en-GB", {
        month:"short",
        day: "numeric",
        year: "numeric",
        hour:"numeric",
        minute:"numeric"
    })
    return formattedDate
}
function grab(selector, by = "id"){
    if(by == "id"){
        return document.getElementById(selector)
    }
    if(by == "class"){
        return document.getElementsByClassName(selector)
    }
    if(by == "all"){
        return document.querySelectorAll(selector)
    }
}
function addZero(num){
    // ? Checks if a number has 2 digits, 
    // ? and if it doesn't adds a 0 to make it two digits
    if(num<10){
        num = `0${num}`
    }
    return num
}
function emailValid(emailString) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailString.match(validRegex)) {
        return true;
    } 
    else {return false;}
}
function hide(id){
    grab(id).style.display = "none"
}
function showFlex(id){
    grab(id).style.display = "flex"
}
function showBlock(id){
    grab(id).style.display = "block"
}