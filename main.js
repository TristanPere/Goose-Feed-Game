const gallery = document.querySelector(".gallery");
const restartButton = document.querySelector(".title-bar__re-start");

const gooseHTML = (idNum) => {
    const innerHTML = `<div class="goose" id="goose${idNum}">
        <button class="goose__button" value="goose${idNum}">
            <img class="goose__image" src="goose.png" alt="goose" />
        </button>
    </div>`;
    return innerHTML;
};
const hatchGoose = () =>{
    gallery.innerHTML = gooseHTML(0)
    return gallery.innerHTML
}
const idArr = [0,1,2,3,4,5,6,7,8,9]

const hatchGeese = (idArr) => {
    for (let i=0; i<idArr.length;i++){
        gallery.innerHTML += gooseHTML(idArr[i])
    }
}


const handleRestart = () => {
    hatchGeese(idArr)

  const gooseArr = document.querySelectorAll(".goose");
  const gooseButtonArr = document.querySelectorAll(".goose__button");
//   console.log(gooseArr);

//   const positionGoose = () => {
//     gooseArr.style.top = 90 + "px";
//     gooseArr.style.left = 90 + "px";
//   };
//   positionGoose();

  const handleFeeding = (event) => {
    // document.getElementById("goose${idNum}").remove();
    // gooseArr[event.target.value].remove()
    console.log(event.target)
// console.log( gooseArr)
  };
  gooseButtonArr.forEach((gooseButton)=>{
    gooseButton.addEventListener("click", handleFeeding);
  })
  
};

restartButton.addEventListener("click", handleRestart);
