const cardsArray = [
    {
        name: "slug1",
        img: "./images/slug1.png",
    },
    {
        name: "slug2",
        img: "./images/slug2.png",
    },
    {
        name: "slug3",
        img: "./images/slug3.png",
    },
    {
        name: "slug4",
        img: "./images/slug4.png",
    },
    {
        name: "slug5",
        img: "./images/slug5.png",
    },
    {
        name: "slug6",
        img: "./images/slug6.png",
    },
    {
        name: "slug7",
        img: "./images/slug7.png",
    },
    {
        name: "slug8",
        img: "./images/slug8.png",
    },
    {
        name: "slug9",
        img: "./images/slug9.png",
    },
    {
        name: "slug10",
        img: "./images/slug10.png",
    },
    {
        name: "slug11",
        img: "./images/slug11.png",
    },
    {
        name: "slug12",
        img: "./images/slug12.png",
    },
    // {
    //     name: "slug13",
    //     img: "./images/slug13.png",
    // },
    // {
    //     name: "slug14",
    //     img: "./images/slug14.png",
    // },
    // {
    //     name: "slug15",
    //     img: "./images/slug15.png",
    // },
    // {
    //     name: "slug16",
    //     img: "./images/slug16.png",
    // },
    // {
    //     name: "slug17",
    //     img: "./images/slug17.png",
    // },
    // {
    //     name: "slug18",
    //     img: "./images/slug18.png",
    // },
];

const game = document.getElementById("game");  
   const grid = document.createElement("section");  
   grid.classList.add("grid");  
 
   game.appendChild(grid);   
   let gameGrid = cardsArray.concat(cardsArray);  
   gameGrid.sort(() => 0.5 - Math.random());  

   gameGrid.forEach((item) => {  
    const card = document.createElement("div");  
    card.classList.add(`card`,`${item.name}`);  
    card.dataset.name = item.name;  
    const front = document.createElement("div");  
    front.classList.add("front");  
    const back = document.createElement("div");  
    back.classList.add("back");  
    back.style.backgroundImage = `url(${item.img})`;  
    grid.appendChild(card);  
    card.appendChild(front);  
    card.appendChild(back);  
   });  

   let attemptCount = 0;  
   let attempts = document.querySelector(".count");  
   attempts.innerText = attemptCount;  
    
   var sec = 0;  
   var timeInSec;  
   let min = 0;  
   function secCount() {  
    sec = sec + 1;  
    document.querySelector(".sec-count").innerText = Math.floor(sec % 60);  
    timeInSec = setTimeout(secCount, 1000);  
    min = Math.floor(sec / 60);  
    document.querySelector(".min-count").innerText = min;  
   }  
   var timeStarted = false;  

   let reset = document.querySelector(".reset");  
   reset.addEventListener("click", () => {  
    let confirmReset = confirm("Whole game will start again. continue to reset?");  
    if (confirmReset === true) {  
     window.location.reload();  
    }   
   });  

   let firstGuess = "";  
   let secondGuess = "";  
   let previousTarget = null;  
   let count = 0;  
   let delay = 1200;  

   const match = () => {  
    var selected = document.querySelectorAll(".selected");  
    selected.forEach((card) => {  
     card.classList.add("match");  
    });  
   };  
   const resetGuesses = () => {  
    firstGuess = "";  
    secondGuess = "";  
    count = 0;  
    var selected = document.querySelectorAll(".selected");  
    selected.forEach((card) => {  
     card.classList.remove("selected");  
    });  
   };  

   grid.addEventListener("click", function (event) {  
    !timeStarted && secCount();  
    timeStarted = true;  
    let clicked = event.target;   
    attemptCount++;  
    attempts.innerText = attemptCount;  
    if (  
     clicked.nodeName === "SECTION" ||  
     clicked === previousTarget ||  
     clicked.parentNode.classList.contains("selected")  
    ) {  
     return;  
    }  
    if (count < 2) {  
     count++;  
     if (count === 1) {    
      firstGuess = clicked.parentNode.dataset.name;  
      clicked.parentNode.classList.add("selected");  
     } else {  
      secondGuess = clicked.parentNode.dataset.name;  
      clicked.parentNode.classList.add("selected");  
     }  
     if (firstGuess !== "" && secondGuess !== "") {    
      if (firstGuess === secondGuess) {  
       setTimeout(match, delay);  
       setTimeout(resetGuesses, delay);  
       var matched = document.querySelectorAll(`.${firstGuess}`);  
       matched.forEach(node => node.addEventListener('click',function (e) {    
        e.stopPropagation();  
       }))  
      } else {  
       setTimeout(resetGuesses, delay);  
      }  
     }  
    }  
    // Set previous target to clicked  
    //previousTarget = clicked;  
   });  
  