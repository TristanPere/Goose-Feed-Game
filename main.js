const gallery = document.querySelector(".gallery");
const restartButton = document.querySelector(".title-bar__re-start");
const score = document.querySelector(".title-bar__score");
const levelSelect = document.querySelector(".level-select");

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

// all functions to occur in a round are store in here so can be called when a round button is clicked
const handleRound = (event) => {
  // packaged handleRestart into handle a round with input of numberOfGeese and round number to determine speed of geese appearing
  const roundNumber = event.target.value;
  const numberOfGeese = 10 * (1.3 * roundNumber);
  // console.log(roundNumber)
  let fedCount = 0;
  // const numberOfGeese = 20;
  const idArr = [...Array(numberOfGeese).keys()]; // idArr is the number of geese on screen in a round
  gallery.innerHTML = "";
  hatchGeese(idArr);

  const gooseArr = document.querySelectorAll(".goose");
  const gooseButtonArr = document.querySelectorAll(".goose__button");
  let hatchedGeese = 0;
  let lostGeese = 0;
  // moves the geese on screen into place
  positionGeese(gooseArr);

  const handleFeeding = (event) => {
    gooseArr[event.target.value].style.display = "none"; //no longer changing galleryDiv. instead just disappearing the geese
    fedCount += 1;
    score.innerText = `Geese Fed:${fedCount}`;
  };

  gooseButtonArr.forEach((gooseButton) => {
    gooseButton.addEventListener("click", handleFeeding);
  });

  const gooseHatchTimed = () => {
    if (hatchedGeese === gooseArr.length) {
      clearInterval(gooseHatchInterval);
    } else {
      gooseArr[hatchedGeese].style.display = "inline-block"; // changing display from none to inline
      hatchedGeese += 1;
    }
  };
  const gooseLooseTimed = () => {
    if (lostGeese === gooseArr.length) {
      clearInterval(gooseLooseInterval);
    } else {
      gooseArr[lostGeese].style.display = "none";
      lostGeese += 1;
    }
  };
  const spawnSpeed = (1000 * 1) / (0.5 * roundNumber);
  const lifeTime = 3 * spawnSpeed;
  gooseHatchInterval = setInterval(gooseHatchTimed, spawnSpeed);
  setTimeout(() => {
    gooseLooseInterval = setInterval(gooseLooseTimed, spawnSpeed);
  }, lifeTime); // Adds 3.2s delay onto despawning of each goose
};

const handleRestart = (event) => {
  handleRound(event);
};

levelSelectButtons.forEach((levelButton) => {
  levelButton.addEventListener("click", handleRound);
});

restartButton.addEventListener("click", handleRestart);
