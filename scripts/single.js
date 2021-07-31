//selecting all required elements
const startBox = document.querySelector(".startBox"),
  pickstart = startBox.querySelector(".pressButton .start");
const selectBox = document.querySelector(".choice"),
  pickX = selectBox.querySelector(".options .playerX"),
  pickO = selectBox.querySelector(".options .playerO"),
  board = document.querySelector(".game"),
  players = document.querySelector(".players"),
  allBox = document.querySelectorAll("section span"),
  resultBox = document.querySelector(".results"),
  win = resultBox.querySelector(".win"),
  replay = resultBox.querySelector("button");
restart = document.getElementById("reset");

//game clock variables
let clock = document.getElementById("timer");
let timer;
let interval = 0;
let hr = 0;
let min = 0;
let sec = 0;
let stop = true;

//adds onclick functionality to boxes when board first appears
window.onload = () => {
  for (let spot = 0; spot < allBox.length; spot++) {
    allBox[spot].setAttribute("onclick", "clickedBox(this)");
  }
};
//hides selection box(e.g., picking X or O)
selectBox.classList.add("hide");
pickstart.onclick = () => {
  //hides start button box
  startBox.classList.add("hide");
  //reveals selection box
  selectBox.classList.remove("hide");
};

pickX.onclick = () => {
  //disables selected box
  selectBox.classList.add("hide");
  //show the board section
  board.classList.add("show");
  startClock();
};

pickO.onclick = () => {
  //disables selected box
  selectBox.classList.add("hide");
  //show the board section
  board.classList.add("show");
  //set class attribute in players to impact slider above board(i.e., what shows the turn status)
  players.setAttribute("class", "players active player");
  startClock();
};
//setting X and O icons. credit to FontAwesome as they are...awesome
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
//setting initial value of playersign to manipulate in later functions
let playerSign = "X";
//setting initial value to later stop CPU when match is over
let cpuTurn = true;

// user click function
function clickedBox(element) {
  if (players.classList.contains("player")) {
    //if player chooses O
    playerSign = "O";
    //adding O inside user clicked box
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    //remove active status to move slider and indicate CPU's turn
    players.classList.remove("active");
    //set id attribute in box where player made selection
    element.setAttribute("id", playerSign);
  } else {
    //adding X inside user clicked box
    playerSign = "X";
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    //adding active status to move slider to indicate CPU's turn
    players.classList.add("active");
    element.setAttribute("id", playerSign);
  }

  selectWinner();
  //once user select any box they get a message saying they can't pick it anymore
  element.onclick = function () {
    alert("You've already hit this spot buddy");
  };

  //add pointerEvents none to board so user can't immediately click on any other box until CPU select
  board.style.pointerEvents = "none";
  //setting a random time delay prior to CPU making a move(the CPU "thinking" if you will)
  let randomDelay = (Math.random() * 1000 + 500).toFixed();
  setTimeout(() => {
    CPU();
  }, randomDelay);
}

//the CPU logic
function CPU() {
  //making an empty array for storing the available spots it has to choose from
  let choicesLeft = [];
  if (cpuTurn) {
    //if player has chosen X then CPU will O
    playerSign = "O";
    for (let spot = 0; spot < allBox.length; spot++) {
      if (allBox[spot].childElementCount == 0) {
        //inserting unclicked boxes number inside array
        choicesLeft.push(spot);
      }
    }
    //choosing one of the empty spot numbers at random to make a move in
    let randomBox = choicesLeft[Math.floor(Math.random() * choicesLeft.length)];
    if (choicesLeft.length > 0) {
      if (players.classList.contains("player")) {
        //if player has chosen O then CPU is X
        playerSign = "X";
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        //adding active class back move slider indicate players turn again
        players.classList.add("active");
        //set id attribute in box with CPUs sign
        allBox[randomBox].setAttribute("id", playerSign);
      } else {
        //if player has chosen X then CPU is O
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
    }

    //once CPU selects a box, player gets a message if they click on that box
    allBox[randomBox].onclick = function () {
      alert("The CPU got here before you, sorry!");
    };
    //add click functionality back for the player
    board.style.pointerEvents = "auto";
  }
}

//return id value
function getId(classname) {
  return document.querySelector(".box" + classname).id; //return id value
}

//checking all id value is equal to sign (X or O) or not
function checkIdSign(val1, val2, val3, sign) {
  //if
  if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
    return true;
  }
}
//should the one of following winning combination match then a winner's chosen
function selectWinner() {
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    //pass a falsey value to cpuTurn so CPU won't run again
    cpuTurn = false;
    CPU();
    //reveal the results box modal and remove the board
    setTimeout(() => {
      resultBox.classList.add("show");
      board.classList.remove("show");
    }, 900);
    //displaying winning text with appropriate sign
    stopClock();
    win.innerHTML = `Player <p>${playerSign}</p> won the game!`;
  }
  //if none of the boxes have equal ID's, the game is a draw
  else {
    if (
      getId(1) != "" &&
      getId(2) != "" &&
      getId(3) != "" &&
      getId(4) != "" &&
      getId(5) != "" &&
      getId(6) != "" &&
      getId(7) != "" &&
      getId(8) != "" &&
      getId(9) != ""
    ) {
      //passing falsey value to cpuTurn so it won't run
      cpuTurn = false;
      CPU();

      setTimeout(() => {
        resultBox.classList.add("show");
        board.classList.remove("show");
      }, 900);
      stopClock();
      win.textContent = "It's a draw!";
    }
  }
}

//buttons//

//reloads page with button click
replay.onclick = () => {
  window.location.reload();
};

restart.onclick = () => {
  window.location.reload();
};

//Game Clock//
//starts the game clock
function startClock() {
  if (stop == true) {
    stop = false;
    clockTick();
  }
}
//stops the game clock
function stopClock() {
  if (stop == false) {
    stop = true;
  }
}
//allows the clock to tick upward
function clockTick() {
  if (stop == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }

    clock.textContent = "Time Elapsed " + hr + ":" + min + ":" + sec;

    setTimeout("clockTick()", 1000);
  }
}
