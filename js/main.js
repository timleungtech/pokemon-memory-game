//Allow click on all elements of an array
let cards = document.querySelectorAll(".box");
let faces = document.querySelectorAll(".faceUp");

let cardsArr = Array.from(cards);
cardsArr.forEach((card) => card.addEventListener("click", changeImg));

// console.log(cards);

function randomCards() {
  cards.forEach((card) => {
    let randomIndex = Math.floor(Math.random() * cards.length);
    //resets the order of the cards randomly
    //style.order this is a property from flex!
    card.style.order = randomIndex;
  });
}
//run this function on the button reset!!!
randomCards();

//array of box section elements getting clicked on
let clickedBox = [];
let counter = 0;

function changeImg() {
  let faceDown = this.querySelector(".faceDown");
  faceDown.classList.add("hidden");

  let faceUp = this.querySelector(".faceUp");
  faceUp.classList.remove("hidden");

  // let imgsrc = faceUp.src;
  // clickedBox.push(imgsrc);
  //save this card
  clickedBox.push(this);

  //a card is already clicked on waiting to be matched
  if (clickedBox.length === 2) {
    checkCards();
    //even if the cards match or not, you want the counter to reset!!
  }

  winningBoard();
}

function checkCards() {
  //compare images of two clicked box values

  let img1 = getBoxImage(clickedBox[0]);
  let img2 = getBoxImage(clickedBox[1]);
  console.log(clickedBox);

  if (img1 !== img2) {
    //flip the card back to the original position
    setTimeout(flipBack, 1000, clickedBox[0], clickedBox[1]);

    console.log("no match");
  }

  //this will keep the front faces showing up!
  else {
    //SET THE STATE OF THE CARDS TO BE PERMENANTELY UP!!
  }
  clickedBox = [];
}

//this will flip the box section elements back over when clicked on
//takes away the class of hidden on faceDown and adding hidden to faceUp, flipping it over
function flipBack(boxElem, boxElem2) {
  let faceDown = boxElem.querySelector(".faceDown");
  faceDown.classList.remove("hidden");

  let faceUp = boxElem.querySelector(".faceUp");
  faceUp.classList.add("hidden");

  let faceDown2 = boxElem2.querySelector(".faceDown");
  faceDown2.classList.remove("hidden");

  let faceUp2 = boxElem2.querySelector(".faceUp");
  faceUp2.classList.add("hidden");
}

function getBoxImage(boxElem) {
  let faceUp = boxElem.querySelector(".faceUp");
  return faceUp.src;
}

function flipImage() {
  console.log(counter++);
  if (counter === 2) {
    console.log(clickedBox);
    cards.forEach((card) => card.removeEventListener("click", changeImg));
  }
}

function winningBoard() {
  //if each of the boxes have a faceUp, then
  let facesToArray = Array.from(faces);
  console.log(facesToArray);

  let faceGang = facesToArray.every((card) => {
    let nodeToArray = Array.from(card.classList);
    let checkClass = nodeToArray.includes("hidden");
    if (!checkClass) {
      return true;
    } else {
      return false;
    }
  });

  if (faceGang === true) {
    document.querySelector("h2").innerText = "YOU WIN!";
    document.querySelector("button").classList.remove("hidden");
  } else {
    document.querySelector("h2").innerText = "Gotta match 'em all!";
    document.querySelector("button").classList.add("hidden");
  }
  return faceGang;
}