var allCards = [{
  'name': 'earth',
  'img': 'images/earth.png'
}, {
  'name': 'venus',
  'img': 'images/venus.png'
}, {
  'name': 'uranus',
  'img': 'images/uranus.png'
}, {
  'name': 'mars',
  'img': 'images/mars.png'
}, {
  'name': 'jupiter',
  'img': 'images/jupiter.png'
}, {
  'name': 'Mercury',
  'img': 'images/Mercury.png'
}, {
  'name': 'neptune',
  'img': 'images/neptune.png'
}, {
  'name': 'pluto',
  'img': 'images/pluto.png'
}, {
  'name': 'saturn',
  'img': 'images/saturn.png'
}];

var gameGrid = allCards.concat(allCards).sort(function () {
  return 0.5 - Math.random();
});

var totalScore = 0;
var timerPercent = 0;
var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

var score = document.getElementById("score");

if(typeof score !== 'undefined' && score !== null) {
  score.innerHTML = "Score: " + totalScore;;
}

var highScore = document.getElementById("highScore");
if(typeof highScore !== 'undefined' && highScore !== null) {
  if (localStorage.highScore > 0) {
    highScore.innerHTML = "High Store: " + localStorage.highScore;
  } else {
    localStorage.highScore = 0;
    highScore.innerHTML = "High Store: " + localStorage.highScore;
  }
}

setInterval(function(){
  if(timerPercent < 100){
	timerPercent++;
	document.querySelector(".timerInner").setAttribute("style", "width:" + timerPercent +"%");
  } else {
    alert("Game over!");
  }
}, 700)

var grid = document.getElementById("grid");

gameGrid.forEach(function (item) {
  var name = item.name;
  var img = item.img;

  var card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = name;

  var front = document.createElement("div");
  front.classList.add("front");

  var back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = "url(" + img + ")";

  if(typeof grid !== "undefined" && grid !== null) {
    grid.appendChild(card);
  }
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.add("match");
  });
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.remove("selected");
  });
};

grid.addEventListener("click", function (event) {
  var clicked = event.target;
  if (clicked.nodeName === "SECTION" || clicked === previousTarget || clicked.parentNode.classList.contains("selected") || clicked.parentNode.classList.contains("match")) {
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

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        totalScore += 60;
        document.getElementById("score").innerHTML = "Score: " + totalScore;
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
  
  if (totalScore > localStorage.highScore) {
    localStorage.highScore = totalScore;
  }
});

