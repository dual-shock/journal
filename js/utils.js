function binaryFind(array, searchElement) {
    'use strict';
    let minIndex = 0;
    let maxIndex = array.length - 1;
    let currentIndex;
    let currentElement;
  
    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0; //more performant than math.floor
        currentElement = array[currentIndex];
  
        if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
        }
        else {
            return { // Modification
                found: true,
                index: currentIndex
            };
        }
    }      
    return { 
        found: false,
        index: currentElement < searchElement ? currentIndex + 1 : currentIndex
    };
};

function formatDateForEntry(date){
    let formattedDate = date.toLocaleString("en-GB", {
        month:"short",
        day: "numeric",
        year: "numeric",
        hour:"numeric",
        minute:"numeric",
        second:"numeric"
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