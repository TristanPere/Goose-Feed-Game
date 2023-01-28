const gallery = document.querySelector(".gallery");
const restartButton = document.querySelector(".title-bar__re-start");
const score = document.querySelector(".title-bar__score");
// writes the div for each goose giving it a unique id
const gooseHTML = (idNum) => {
  const innerHTML = `<div class="goose" id="goose${idNum}">
    <input class="goose__button" type="image" src="goose.png" value="${idNum}">
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

// Functions currently in handle restart are there as page has to be populated before querySelector works
// To introduce rounds i will wrap necessary function decleration outside of rounds
const handleRestart = () => {
  // idArr is the number of geese on screen in a round
  const idArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  gallery.innerHTML = "";
  hatchGeese(idArr);
  let fedCount = 0;
  const gooseArr = document.querySelectorAll(".goose");
  const gooseButtonArr = document.querySelectorAll(".goose__button");

  // moves the geese on screen into place
  positionGeese(gooseArr);

  //  function in handleRestart as fed count is in here. Looking to move out eventually
  const handleFeeding = (event) => {
    gooseArr[event.target.value].remove(); //changing galleryDiv but not changing gooseArry
    fedCount += 1;
    score.innerText = `Geese Fed:${fedCount}`;
  };
  gooseButtonArr.forEach((gooseButton) => {
    gooseButton.addEventListener("click", handleFeeding);
  });

  let hatchedGeese = 0;
  let lostGeese = 0;
  const gooseHatchTimed = () => {
    if (hatchedGeese === gooseArr.length) {
      clearInterval(gooseHatchInterval)
    } else {
      gooseArr[hatchedGeese].style.display = "inline-block"; // not changing display from none to inline
      hatchedGeese += 1;
    }
  };
  const gooseLooseTimed = () => {
    if (lostGeese == gooseArr.length) {
      clearInterval(gooseLooseInterval)
    } else {
        gooseArr[lostGeese].remove();
        lostGeese+=1;
    }
  }

  gooseHatchInterval = setInterval(gooseHatchTimed, 1000);
  gooseLooseInterval = setInterval(gooseLooseTimed, 3000);



  // setinterval(function, time) function will happen every time seconds
  // clearinterval(intervalID) in function using counter and if check. or while

  // write a function that hatches a goose from the array every x seconds then uses settimeout to clear it from display
  // Set timeout(function, time) function will happen after given time
};
const time = () =>{
  console.log(0)
}
// window.setInterval(time,1)
restartButton.addEventListener("click", handleRestart);
