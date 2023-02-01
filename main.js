const gallery = document.querySelector(".gallery");
const restartButton = document.querySelector(".title-bar__re-start");
const score = document.querySelector(".title-bar__score");
const levelSelect = document.querySelector(".current-mode__level-select");
const roundTimer = document.querySelector("#round-timer");
const currentRound = document.querySelector("#current-round");
const endlessRound = document.querySelector("#endless-level");
const dropdown = document.querySelector("#gamemode-select");
const currentModeTitle = document.querySelector(".current-mode__title");
const instructionsButton = document.querySelector(".title-bar__intructions")
const instructionsExitButton = document.querySelector(".overlay__button")
const instructions = document.querySelector(".overlay")
let highestAvailableRounds = 1;
let highestAvailableFlyingRounds = 1;
let levelActive = false;
instructionsButton.addEventListener("click",()=> {
  instructions.style.display = "block";
})
instructionsExitButton.addEventListener("click",() => {
  instructions.style.display = "none";
})
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
//Centre's geese before being launched
const centreGeese = (gooseArr) => {
  for (let i = 0; i < gooseArr.length; i++) {
    gooseArr[i].style.top = gallery.clientHeight - 75 + "px";
    gooseArr[i].style.left = (gallery.clientWidth - 75) / 2 + "px";
  }
};
//Generates an array of vectors for gees to follow to the right.
const rightVectorGenerator = (length, level) => {
  let vectorArr = [];
  let x = [];
  let maxSpeed = level * 15;
  for (let i = 0; i < length; i++) {
    x[0] = Math.floor(Math.random() * maxSpeed) / 10 + 1;
    x[1] = Math.floor(Math.random() * maxSpeed) / 10 + 1;
    vectorArr[i] = [x[0], x[1]];
  }
  return vectorArr;
};
//Generates an array determining if the goose goes left or right.
const directionArrGenerator = (length) => {
  const directionArr = [];
  for (let i = 0; i < length; i++) {
    directionArr.push(Math.round(Math.random()));
  }
  return directionArr;
};
// counts down in seconds from time given displaying it in timer div
const countDownTimer = (amountOfTime) => {
  let timer;
  clearInterval(timer);
  let sec = Math.floor(amountOfTime / 1000);
  timer = setInterval(() => {
    roundTimer.innerHTML = `Round Timer: 00:${sec}s`;
    sec--;
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
  }, amountOfTime + 1000);
};
let animation = [];
const moveGoose = (goose, vector, id, direction) => {
  //load in goose and its relative vectors [0]=dx,[1]=dy
  let xpos = (gallery.clientWidth - 75) / 2 / vector[0]; //initial position
  let ypos = (gallery.clientHeight - 75) / vector[1];
  clearInterval(animation[id]);
  const frame = () => {
    if (direction[id] == 1) {
      if (ypos < 0 || xpos > (gallery.clientWidth - 75) / vector[0]) {
        clearInterval(animation[id]);
        goose.style.display = "none";
      } else {
        xpos++; //moves it right
        ypos--;
        goose.style.left = vector[0] * xpos + "px"; // moves one pixel right every frame
        goose.style.top = vector[1] * ypos + "px"; //moves one pixel up every frame
      }
    } else if (direction[id] == 0) {
      if (ypos < 0 || xpos < 0) {
        clearInterval(animation[id]);
        goose.style.display = "none";
      } else {
        xpos--; //moves it left
        ypos--;
        goose.style.left = vector[0] * xpos + "px"; // moves one pixel left every frame
        goose.style.top = vector[1] * ypos + "px"; //moves one pixel up every frame
      }
    }
  };
  animation[id] = setInterval(frame, 10);
};
// all functions to occur in a standard round are store in here so can be called when a round button is clicked
const handleRound = (event) => {
  // packaged handleRestart into handle a round with input of numberOfGeese and round number to determine speed of geese appearing

  if (event.target.value <= highestAvailableRounds) {
    if (levelActive) {
      alert("Must complete round before exiting");
    } else {
      levelActive = true;
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
        levelActive = false;
        if (fedCount >= numberOfGeese / 2) {
          // levelSelectButtons[event.target.value].addEventListener("click", handleRound);
          levelButtonsHTML[event.target.value].style.backgroundColor = "white";
          if (highestAvailableRounds == event.target.value) {
            highestAvailableRounds += 1;
          }
        }
      }, roundLength);
    }
  } else {
    alert(
      `Must feed 50% of geese from level ${
        event.target.value - 1
      } before proceeding to level ${event.target.value}`
    );
  }
};
// all functions to occur in a flying round are store in here so can be called when a round button is clicked
const handleFlyingRound = (event) => {
  if (event.target.value <= highestAvailableFlyingRounds) {
    if (levelActive) {
      alert("Must complete round before exiting");
    } else {
      const roundNumber = event.target.value;
      const numberOfGeese = Math.floor(10 * (1.5 * roundNumber));
      const idArr = []; //move to function
      for (let i = 0; i < numberOfGeese; i++) {
        idArr.push(i);
      }
      const spawnSpeed = (1000 * 1) / roundNumber;
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
      // moves the geese on screen into place
      centreGeese(gooseArr);
      countDownTimer(roundLength);
      const vectorArr = rightVectorGenerator(numberOfGeese, roundNumber);
      const gooseDirectionArr = directionArrGenerator(numberOfGeese);
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
          clearInterval(animation);
        } else {
          gooseArr[hatchedGeese].style.display = "inline-block"; // changing display from none to inline
          moveGoose(
            gooseArr[hatchedGeese],
            vectorArr[hatchedGeese],
            hatchedGeese,
            gooseDirectionArr
          );
          hatchedGeese++;
        }
      };
      // This function:
      // Removes geese in order of their id
      // Counts the number of loops and clears interval when number of loops is equal to number of geese
      const gooseLooseTimed = () => {
        if (lostGeese === gooseArr.length) {
          clearInterval(gooseLooseInterval);
        } else {
          gooseArr[lostGeese].style.display = "none";
          lostGeese++;
        }
      };
      gooseHatchInterval = setInterval(gooseHatchTimed, spawnSpeed);
      setTimeout(() => {
        gooseLooseInterval = setInterval(gooseLooseTimed, spawnSpeed);
      }, lifeTime); // Adds lifetime delay onto despawning of each goose
      // After a round is complete it checks if number of geese fed are greater than 50% if so next level is unlocked.
      setTimeout(() => {
        levelActive = false;
        if (fedCount >= numberOfGeese / 2) {
          // levelSelectButtons[event.target.value].addEventListener("click", handleRound);
          levelButtonsHTML[event.target.value].style.backgroundColor = "white";
          if (highestAvailableRounds == event.target.value) {
            highestAvailableFlyingRounds += 1;
          }
        }
      }, roundLength);
    }
  } else {
    alert(
      `Must feed 50% of the flying geese from level ${
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

//Initialise game with standard mode
currentModeTitle.innerHTML = "Current Mode: Standard";
levelSelectButtons.forEach((levelButton) => {
  levelButton.addEventListener("click", handleRound);
});

const handleModeSelect = (event) => {
  if (levelActive) {
    alert("Must complete level before exiting");
  } else {
    currentModeTitle.innerHTML = `Current Mode: ${event.target.value}`;
    if (event.target.value == "Standard") {
      levelSelectButtons.forEach((levelButton) => {
        for(let i=0;i<highestAvailableRounds;i++){
          levelButtonsHTML[i].style.backgroundColor = "white";
        }
        for(let i=highestAvailableRounds;i<10;i++){
          levelButtonsHTML[i].style.backgroundColor = "rgb(58, 58, 58)";
        }
        levelButton.removeEventListener("click", handleFlyingRound);
        levelButton.removeEventListener("click", handleRound);
        levelButton.addEventListener("click", handleRound);
      });
    } else if (event.target.value == "Flying") {
      levelSelectButtons.forEach((levelButton) => {
        for(let i=0;i<highestAvailableFlyingRounds;i++){
          levelButtonsHTML[i].style.backgroundColor = "white";
        }
        for(let i=highestAvailableFlyingRounds;i<10;i++){
          levelButtonsHTML[i].style.backgroundColor = "rgb(58, 58, 58)";
        }
        levelButton.removeEventListener("click", handleFlyingRound);
        levelButton.removeEventListener("click", handleRound);
        levelButton.addEventListener("click", handleFlyingRound);
      });
    } else if (event.target.value == "Endless") {
      currentModeTitle.innerHTML = `Current Mode: (Unavailable)`;
      levelSelectButtons.forEach((levelButton) => {
        levelButton.removeEventListener("click", handleFlyingRound);
        levelButton.removeEventListener("click", handleRound);
      });
    }
  }
};

dropdown.addEventListener("click", handleModeSelect);
restartButton.addEventListener("click", handleRestart);




// endlessRound.addEventListener("click", handleEndless);
