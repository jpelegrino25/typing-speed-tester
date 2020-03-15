const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

let timer=[0,0,0,0];
let inteval;
let timerRunning=false;


// Helper function leading Zero
function leadingZero(time) {
    if(time<=9) {
        time='0'+time;
    }
    return time;
}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function runTimer() {
   let currentTime=leadingZero(timer[0])+':'+leadingZero(timer[1]) +':'+leadingZero(timer[2]);
   theTimer.innerHTML=currentTime;
   timer[3]++;

   timer[0]=Math.floor(timer[3]/100/60);
   timer[1]=Math.floor((timer[3]/100)- (timer[0]*60));
   timer[2]=Math.floor(timer[3]-(timer[1] * 100)- (timer[0]*6000));

}

// Run a standard minute/second/hundredths timer:
function startOver() {
    setInterval(inteval);
    inteval=null;
    testArea.value="";
    theTimer.innerHTML="00:00:00";
    timer=[0,0,0,0];
    timerRunning=false;
    testWrapper.style.borderColor="grey";
   
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered=testArea.value;
    let textOrigin=originText;

    let originTextMatch=textOrigin.substring(0,textEntered.length);

    if(textEntered==textOrigin) {        
        clearInterval(inteval);
        testWrapper.style.borderColor="green";
    }else {
        if(textEntered==originTextMatch) {
            testWrapper.style.borderColor="blue";
        }else {
            testWrapper.style.borderColor="red";
        }
    }
}
// Start the timer:
function start() {
    let textLength=testArea.value.length;
    if(textLength===0 && !timerRunning) {
        timerRunning=true;
        inteval=setInterval(runTimer,10);
    }
    console.log(textLength)
}


// Reset everything:


// Event listeners for keyboard input and the reset button:

testArea.addEventListener('keypress',start,false);
testArea.addEventListener('keyup',spellCheck,false);
resetButton.addEventListener('click',startOver,false);