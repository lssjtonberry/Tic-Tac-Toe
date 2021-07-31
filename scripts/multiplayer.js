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

//turn variables
let xTurn = false;
let oTurn = false;
//switching turns helper function. When it's O's turn, it's value is set to false to mark it's completion. Vice-versa with X
function XOrO() {
  if (oTurn) {
    xTurn = true;
    oTurn = false;
  } else if (xTurn) {
    oTurn = true;
    xTurn = false;
  }
}

chooseNames();
//choosing player names
function chooseNames() {
  firstName = window.prompt(
    "Welcome to Multiplayer Tic Tac Toe! Here you can 1v1 friends, family, your pets or anybody you want in a classic game of Tic Tac Toe.\nBefore we go forward and pick our sides..let's find out your names. Who's player one?"
  );
  //getting confirmation that entered name is what player really wants
  let isFactial = window.confirm(
    `You entered: ${firstName}. Is that your name?`
  );

  if (isFactial) {
    alert("Sounds good. Let's move onto player two!");
  } else {
    //alerts player that game will loop back to player one name selection
    alert("Let's run this back and try again");
    chooseNames();
  }

  secondName = window.prompt(
    "What about your opponent? What's player two's name?"
  );

  let isTruth = window.confirm(
    `You've entered ${secondName}. Is that YOUR name?`
  );
  if (isTruth) {
    //alert to move on to picking sides
    alert("AAALLLLLRRRRIIIGGGHGHHHTTYYY THEN. Let's move onto the next step!");
  } else {
    alert("Maybe you two wanna switch sides?");
    chooseNames();
  }
}
//hides selection box(e.g., picking X or O)
selectBox.classList.add("hide");
pickstart.onclick = () => {
  //hides start button box
  startBox.classList.add("hide");
  //reveals selection box
  selectBox.classList.remove("hide");
};

chooseSides();
function chooseSides() {
  //Assigning X or O to Player One. Player two gets leftover choice as there are only two options.
  alert(
    `Time to pick sides. For the sake of speeding things along for everyone. The choice ${firstName} makes will dictate what ${secondName} gets to play as. Probably not ideal, but hey! You guys will get to play faster :D\nWhat will you choose ${firstName}?`
  );
  pickX.onclick = () => {
    //disables selected box
    selectBox.classList.add("hide");
    //show the board section
    board.classList.add("show");
    oTurn = true;
    startClock();
  };

  pickO.onclick = () => {
    //disables selected box
    selectBox.classList.add("hide");
    //show the board section
    board.classList.add("show");
    //set class attribute in players to impact slider above board(i.e., what shows the turn status)
    players.setAttribute("class", "players active player");
    xTurn = true;
    startClock();
  };
}
//setting X and O icons. credit to FontAwesome as they are...awesome
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
//setting initial value of playersign to manipulate in later functions
playerSign = "";

// user click function
for (let spot = 0; spot < allBox.length; spot++) {
  allBox[spot].addEventListener("click", function clickedBox() {
    XOrO();
    if (allBox[spot].innerHTML.trim() == "" && oTurn) {
      //if player chooses O
      playerSign = "O";
      //adding O inside user clicked box
      allBox[spot].innerHTML = `<i class="${playerOIcon}"></i>`;
      //remove active status to move slider and indicate next player's turn
      players.classList.remove("active");
      //set id attribute in box where player made selection
      allBox[spot].setAttribute("id", playerSign);
    } else if (allBox[spot].innerHTML.trim() == "" && xTurn) {
      //adding X inside user clicked box
      playerSign = "X";
      allBox[spot].innerHTML = `<i class="${playerXIcon}"></i>`;
      //adding active status to move slider to indicate the next Players turn
      players.classList.add("active");
      allBox[spot].setAttribute("id", playerSign);
    } else if (allBox[spot].textContent == playerOIcon || playerXIcon) {
      alert("Sorry but that spots already taken.");
      XOrO();
    }
    selectWinner();
  });
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
    //reveal the results box modal and remove the board
    setTimeout(() => {
      resultBox.classList.add("show");
      board.classList.remove("show");
    }, 100);
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
      setTimeout(() => {
        resultBox.classList.add("show");
        board.classList.remove("show");
      }, 100);
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
