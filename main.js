const gallery = document.querySelector(".gallery");
const restartButton = document.querySelector(".title-bar__re-start");
const score = document.querySelector(".title-bar__score")
const gooseHTML = (idNum) => {
  const innerHTML = `<div class="goose" id="goose${idNum}">
    <input class="goose__button" type="image" src="goose.png" value="${idNum}">
    </div>`;
  return innerHTML;
};
const hatchGoose = () => {
  gallery.innerHTML = gooseHTML(0);
  return gallery.innerHTML;
};
const idArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const hatchGeese = (idArr) => {
  for (let i = 0; i < idArr.length; i++) {
    gallery.innerHTML += gooseHTML(idArr[i]);
  }
};

const handleRestart = () => {
  gallery.innerHTML = "";
  hatchGeese(idArr);
  let fedCount = 0;
  const gooseArr = document.querySelectorAll(".goose");
  const gooseButtonArr = document.querySelectorAll(".goose__button");

  const positionArrGenerator = (length) => {
    let arrayXY = [];
    let x = [];
    for (let i = 0; i < length; i++) {
      x[0] = Math.random() * (gallery.clientWidth-75); //width
      x[1] = Math.random() * (gallery.clientHeight - 75); //height
      arrayXY[i] = [Math.floor(x[0]), Math.floor(x[1])];
    }
    return arrayXY;
  };
  const positionGeese = () => {
    const positionArr = positionArrGenerator(idArr.length);
    for (let i = 0; i < gooseArr.length; i++) {
      gooseArr[i].style.left = positionArr[i][0] + "px";
      gooseArr[i].style.top = positionArr[i][1] + "px";
    }
  };
  positionGeese();

  const handleFeeding = (event) => {
    gooseArr[event.target.value].remove(); //changing galleryDiv but not changing gooseArry
    fedCount += 1;
    score.innerText = `Geese Fed:${fedCount}`
  };

  gooseButtonArr.forEach((gooseButton) => {
    gooseButton.addEventListener("click", handleFeeding);
  });




};

restartButton.addEventListener("click", handleRestart);
