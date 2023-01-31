const gallery = document.querySelector(".gallery");
const restartButton = document.querySelector(".title-bar__re-start");
const score = document.querySelector(".title-bar__score");
const levelSelect = document.querySelector(".level-select");
const roundTimer = document.querySelector("#round-timer");
const currentRound = document.querySelector("#current-round");
let highestAvailableRounds = 1;

const LevelSelectHTML = (idNum) => {
  const innerHTML = `<div class="level" id="level${idNum}">
    <input class="level__button" type="button" value="${idNum}">
    </div>`;
  return innerHTML;
};
const populateLevelSelectDiv = () => {
  for (let i = 0; i < 10; i++) {
    levelSelect.innerHTML += LevelSelectHTML(i + 1);
  }
};
populateLevelSelectDiv();
const levelSelectButtons = document.querySelectorAll(".level");
const levelButtonsHTML = document.querySelectorAll(".level__button");

// writes the div for each goose giving it a unique id
const gooseHTML = (idNum) => {
  const innerHTML = `<div class="goose" id="goose${idNum}">
    <input class="goose__button" type="image" src="/images/goose.png" value="${idNum}">
    </div>`;
  return innerHTML;
};

const hatchGoose = (idnum) => {
  gallery.innerHTML = gooseHTML(idnum);
  return gallery.innerHTML;
};

// populates galleryDiv with as many geese as there are in the id array.
const hatchGeese = (idArr) => {
  for (let i = 0; i < idArr.length; i++) {
    gallery.innerHTML += gooseHTML(idArr[i]);
  }
};

// Creates an array of (x,y) coordinates that will be given to the geese
const positionArrGenerator = (length) => {
  let arrayXY = [];
  let x = [];
  for (let i = 0; i < length; i++) {
    x[0] = Math.random() * (gallery.clientWidth - 75); //width
    x[1] = Math.random() * (gallery.clientHeight - 75); //height
    arrayXY[i] = [Math.floor(x[0]), Math.floor(x[1])];
  }
  return arrayXY;
};

// allocates a set of coordinates to each goose
const positionGeese = (gooseArr) => {
  const positionArr = positionArrGenerator(gooseArr.length);
  for (let i = 0; i < gooseArr.length; i++) {
    gooseArr[i].style.left = positionArr[i][0] + "px";
    gooseArr[i].style.top = positionArr[i][1] + "px";
  }
};

const countDownTimer = (amountOfTime) => {
  let sec = Math.floor(amountOfTime / 1000);
  let timer = setInterval(() => {
    roundTimer.innerHTML = `Round Timer: 00:${sec}s`;
    sec--;
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
  }, amountOfTime + 1000);
};

// all functions to occur in a round are store in here so can be called when a round button is clicked
const handleRound = (event) => {
  // packaged handleRestart into handle a round with input of numberOfGeese and round number to determine speed of geese appearing
  if (event.target.value <= highestAvailableRounds) {
    const roundNumber = event.target.value;
    const numberOfGeese = Math.floor(10 * (1.5 * roundNumber));
    const idArr = [];
    for (let i = 0; i < numberOfGeese; i++) {
      idArr.push(i);
    }
    const spawnSpeed = (1000 * 1) / (0.5 * roundNumber);
    const lifeTime = 3 * spawnSpeed;
    const roundLength = spawnSpeed * numberOfGeese + lifeTime;
    let fedCount = 0;
    gallery.innerHTML = "";
    currentRound.innerHTML = `Current Round: ${event.target.value}`;
    hatchGeese(idArr);

    const gooseArr = document.querySelectorAll(".goose");
    const gooseButtonArr = document.querySelectorAll(".goose__button");
    let hatchedGeese = 0;
    let lostGeese = 0;
    positionGeese(gooseArr);






    
    // moves the geese on screen into place
    countDownTimer(roundLength);
    const handleFeeding = (event) => {
      gooseArr[event.target.value].style.display = "none";
      fedCount += 1;
      score.innerText = `Geese Fed:${fedCount}/${numberOfGeese}`;
    };
    gooseButtonArr.forEach((gooseButton) => {
      gooseButton.addEventListener("click", handleFeeding);
    });

    //This function:
    //Adds geese in order of their id
    //Counts the number of loops and clears interval when number of loops is equal to number of geese
    const gooseHatchTimed = () => {
      if (hatchedGeese === gooseArr.length) {
        clearInterval(gooseHatchInterval);
      } else {
        gooseArr[hatchedGeese].style.display = "inline-block"; // changing display from none to inline
        hatchedGeese += 1;
      }
    };

    //This function:
    //Removes geese in order of their id
    //Counts the number of loops and clears interval when number of loops is equal to number of geese
    const gooseLooseTimed = () => {
      if (lostGeese === gooseArr.length) {
        clearInterval(gooseLooseInterval);
      } else {
        gooseArr[lostGeese].style.display = "none";
        lostGeese += 1;
      }
    };

    gooseHatchInterval = setInterval(gooseHatchTimed, spawnSpeed);
    setTimeout(() => {
      gooseLooseInterval = setInterval(gooseLooseTimed, spawnSpeed);
    }, lifeTime); // Adds lifetime delay onto despawning of each goose

    // After a round is complete it checks if number of geese fed are greater than 50% if so next level is unlocked.
    setTimeout(() => {
      if (fedCount >= numberOfGeese / 2) {
        // levelSelectButtons[event.target.value].addEventListener("click", handleRound);
        levelButtonsHTML[event.target.value].style.backgroundColor = "white";
        if (highestAvailableRounds == event.target.value) {
          highestAvailableRounds += 1;
        }
      }
    }, roundLength);
  } else {
    alert(
      `Must feed 50% of geese from level ${
        event.target.value - 1
      } before proceeding to level ${event.target.value}`
    );
  }
};

const handleRestart = (event) => {
  // highestAvailableRounds = 1;
  // score.innerText = `Geese Fed:`;
  // currentRound.innerHTML = `Current Round:`;
  // roundTimer.innerHTML = `Round Timer: 00:00s`;

  // levelButtonsHTML.forEach((buttonHTML) => {
  //   buttonHTML.style.backgroundColor = "rgb(58, 58, 58)";
  // });
  // levelButtonsHTML[0].style.backgroundColor = "white";

  // handleRound(event);
  location.reload();
};
levelButtonsHTML[0].style.backgroundColor = "white";

levelSelectButtons.forEach((levelButton) => {
  levelButton.addEventListener("click", handleRound);
});
restartButton.addEventListener("click", handleRestart);
