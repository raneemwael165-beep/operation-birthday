// ===================================
// OPERATION : BIRTHDAY
// ===================================

const startScreen = document.getElementById("startScreen");
const introScreen = document.getElementById("introScreen");
const mission1 = document.getElementById("mission1");
const mission2 =
document.getElementById("mission2");

const mission3 =
document.getElementById("mission3");
const hud = document.getElementById("hud");

const beginBtn = document.getElementById("beginBtn");

const introMusic = document.getElementById("introMusic");
const missionMusic = document.getElementById("missionMusic");
const clickSound = document.getElementById("clickSound");
const hoverSound = document.getElementById("hoverSound");
const successSound = document.getElementById("successSound");
const errorSound = document.getElementById("errorSound");
const introLoading = document.getElementById("introLoading");
const bootText = document.getElementById("bootText");

beginBtn.addEventListener("click", startOperation);

function startOperation(){

clickSound.play();

startScreen.classList.add("hidden");

introScreen.classList.remove("hidden");

introMusic.play();

introAnimation();

}
function introAnimation(){

let progress = 0;

const loading = setInterval(function(){

progress += 2;

introLoading.style.width = progress + "%";

if(progress < 20){

bootText.innerHTML =
"Initializing Security Protocol...";

}

else if(progress < 40){

bootText.innerHTML =
"Connecting To Riot Server...";

}

else if(progress < 60){

bootText.innerHTML =
"Decrypting Birthday Files...";

}

else if(progress < 80){

bootText.innerHTML =
"Recovering Classified Memories...";

}

else{

bootText.innerHTML =
"Operation Ready.";

}

if(progress >= 100){

clearInterval(loading);

setTimeout(openMission1,1000);

}

},80);

}
function openMission1(){

introScreen.classList.add("hidden");

mission1.classList.remove("hidden");

hud.classList.remove("hidden");

introMusic.pause();

missionMusic.play();

}
// ===================================
// MISSION 1
// ===================================

function mission1Answer(answer){

clickSound.play();

if(answer==="Dody"){

successSound.play();

document.getElementById("fragmentBar").innerHTML="0 █ █ █";

document.getElementById("mission1Result").innerHTML="ACCESS GRANTED";

document.getElementById("mission1Result").style.color="#19c37d";

setTimeout(function(){

mission1.classList.add("hidden");

document.getElementById("mission2").classList.remove("hidden");

document.getElementById("missionCounter").innerHTML="2 / 4";

},1800);

}

else{

errorSound.play();

document.getElementById("mission1Result").innerHTML="ACCESS DENIED";

document.getElementById("mission1Result").style.color="#ff4655";

mission1.animate([

{transform:"translateX(-8px)"},

{transform:"translateX(8px)"},

{transform:"translateX(-8px)"},

{transform:"translateX(0px)"}

],{

duration:350

});

}

}
// ===================================
// MISSION 2
// ===================================

let selectedMemory = null;

const memories = document.querySelectorAll("#timeline .memory");
const checkTimelineBtn = document.getElementById("checkTimeline");

memories.forEach(memory => {

memory.addEventListener("click", () => {

clickSound.play();

if(selectedMemory === null){

selectedMemory = memory;
memory.classList.add("selected");

}
else if(selectedMemory === memory){

memory.classList.remove("selected");
selectedMemory = null;

}
else{

const temp = selectedMemory.innerHTML;

selectedMemory.innerHTML = memory.innerHTML;
memory.innerHTML = temp;

const order = selectedMemory.dataset.order;

selectedMemory.dataset.order = memory.dataset.order;
memory.dataset.order = order;

selectedMemory.classList.remove("selected");

selectedMemory = null;

}

});

});

checkTimelineBtn.addEventListener("click", () => {

let currentOrder = "";

document.querySelectorAll("#timeline .memory").forEach(card => {

currentOrder += card.dataset.order;

});

if(currentOrder === "1234"){

successSound.play();

document.getElementById("timelineResult").innerHTML =
"TIMELINE RESTORED";

document.getElementById("timelineResult").style.color="#19c37d";

document.getElementById("fragmentBar").innerHTML =
"0 9 █ █";

setTimeout(()=>{

mission2.classList.add("hidden");

mission3.classList.remove("hidden");

document.getElementById("missionCounter").innerHTML="3 / 4";

},1500);

}
else{

errorSound.play();

document.getElementById("timelineResult").innerHTML =
"ACCESS DENIED";

document.getElementById("timelineResult").style.color="#ff4655";

}

});
// ===================================
// MISSION 3 - PUZZLE
// ===================================

const pieces = document.querySelectorAll(".piece");

const correctOrder = [
0,1,2,
3,4,5,
6,7,8
];

let currentOrder = [
0,1,2,
3,4,5,
6,7,8
];

let firstPiece = null;

const positions = [

"0% 0%",
"50% 0%",
"100% 0%",

"0% 50%",
"50% 50%",
"100% 50%",

"0% 100%",
"50% 100%",
"100% 100%"

];

pieces.forEach((piece,index)=>{

piece.style.backgroundPosition=
positions[index];

});

shufflePuzzle();

function shufflePuzzle(){

currentOrder.sort(()=>Math.random()-0.5);

pieces.forEach((piece,index)=>{

piece.style.backgroundPosition=
positions[currentOrder[index]];

piece.dataset.correct=
currentOrder[index];

});

}
pieces.forEach(piece=>{

piece.addEventListener("click",()=>{

clickSound.play();

if(firstPiece==null){

firstPiece=piece;

piece.classList.add("selected");

}

else{

swapPieces(firstPiece,piece);

firstPiece.classList.remove("selected");

firstPiece=null;

checkPuzzle();

}

});

});

function swapPieces(a,b){

let bg=a.style.backgroundPosition;

let data=a.dataset.correct;

a.style.backgroundPosition=
b.style.backgroundPosition;

a.dataset.correct=
b.dataset.correct;

b.style.backgroundPosition=bg;

b.dataset.correct=data;

}
// ===================================
// CHECK PUZZLE
// ===================================

function checkPuzzle(){

let solved = true;

pieces.forEach((piece,index)=>{

if(Number(piece.dataset.correct)!==index){

solved = false;

}

});

if(solved){

successSound.play();

document.getElementById("puzzleResult").innerHTML =
"MEMORY RESTORED";

document.getElementById("puzzleResult").style.color =
"#19c37d";

document.getElementById("fragmentBar").innerHTML =
"0 9 0 █";

setTimeout(()=>{

document
.getElementById("fragmentReward3")
.classList.remove("hidden");

},1200);

}

}
// ===================================
// GO TO MISSION 4
// ===================================

function goMission4(){

clickSound.play();

mission3.classList.add("hidden");

document
.getElementById("mission4")
.classList.remove("hidden");

document
.getElementById("missionCounter")
.innerHTML = "4 / 4";

}
// ===================================
// MISSION 4
// ===================================

function checkMonth(answer){

clickSound.play();

if(answer==="September"){

successSound.play();

document.getElementById("monthResult").innerHTML =
"ACCESS GRANTED";

document.getElementById("monthResult").style.color =
"#19c37d";

document.getElementById("fragmentBar").innerHTML =
"0 9 0 9";

setTimeout(()=>{

document
.getElementById("fragmentReward4")
.classList.remove("hidden");

},1200);

}

else{

errorSound.play();

document.getElementById("monthResult").innerHTML =
"ACCESS DENIED";

document.getElementById("monthResult").style.color =
"#ff4655";

const buttons =
document.querySelectorAll("#mission4 .answerBtn");

buttons.forEach(btn=>{

btn.animate([

{transform:"translateX(-6px)"},
{transform:"translateX(6px)"},
{transform:"translateX(-6px)"},
{transform:"translateX(0px)"}

],{

duration:250

});

});

}

}
// ===================================
// VAULT
// ===================================

function openVault(){

clickSound.play();

mission4.classList.add("hidden");

document
.getElementById("vaultScreen")
.classList.remove("hidden");

}

function unlockVault(){

const code =
document.getElementById("vaultCode").value;

if(code==="0909"){

vaultSound.play();
missionMusic.pause();
missionMusic.currentTime = 0;
introMusic.pause();
introMusic.currentTime = 0;

document.getElementById("vaultResult").innerHTML=
"VAULT UNLOCKED";

document.getElementById("vaultResult").style.color=
"#19c37d";

setTimeout(function(){

document
.getElementById("vaultScreen")
.classList.add("hidden");

document
.getElementById("giftScreen")
.classList.remove("hidden");

startLetter();

},1800);

}

else{

errorSound.play();

document.getElementById("vaultResult").innerHTML=
"INVALID CODE";

document.getElementById("vaultResult").style.color=
"#ff4655";

}
}
// ===================================
// GIFT LETTER
// ===================================

const finalLetter = `🎁 FINAL REWARD UNLOCKED

This isn't a skin.
This isn't XP.
This isn't a trophy.

It's a message from someone who loves you. ❤️

Happy Birthday, Dody.

I don't think words will ever be enough to tell you how much you mean to me, but today I wanted to try.

You are my home, my peace, and the person with the purest heart I've ever known.

Thank you for always checking on me, making sure I got home safely, asking if I'm okay, and making me feel loved every single day.

One of my favorite things about you is that whenever you know something hurts me, you never ignore it—you always try to become better. That means more to me than you probably realize.

I wanted to make this little game because I know how much you love games.

I wanted to wish you a happy birthday in a way that felt special, personal, and made just for you.

I hope every mission made you smile, even if just a little.

I truly hope this year brings you everything you've been dreaming of.

I hope you achieve every goal, become as successful as you've always wanted to be, and never stop believing in yourself.

You deserve every good thing this world has to offer.

And if I could wish for one thing for myself, it would simply be to stay by your side and keep making more memories with you.

0909 wasn't just the final code.

It was the beginning of my favorite story. ❤️

Happy Birthday, Habeby.

I'll always be by your side. ❤️`;

const typingText = document.getElementById("typingText");


let textIndex = 0;

function startLetter(){

typingText.innerHTML = "";

textIndex = 0;

typeText();

}

function typeText(){

if(textIndex < finalLetter.length){

typingText.innerHTML += finalLetter.charAt(textIndex);

textIndex++;

setTimeout(typeText,25);


}

}
const buttons = document.querySelectorAll("button");

buttons.forEach(button=>{

button.addEventListener("mouseenter",()=>{

hoverSound.currentTime = 0;
hoverSound.play();

});

});