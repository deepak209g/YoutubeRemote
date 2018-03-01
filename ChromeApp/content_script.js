var body = document.getElementsByTagName("body")[0];    
console.log('working')

body.style.backgroundColor = 'green'

chrome.runtime.sendMessage({dom:'dom data', browser: 'chrome'});

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event){
    console.log(event)
}