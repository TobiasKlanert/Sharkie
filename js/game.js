let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameoverScreen").style.display = "none";
  document.getElementById("winningScreen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.getElementById("btnFullscreen").classList.remove("d-none");
  initAssets();
  initLevel();
  init();
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function enterFullscreen() {
  let element = document.getElementById("game");
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
  document.getElementById("canvas").classList.add("fullscreen");
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "ArrowUp":
      keyboard.UP = true;
      break;
    case "ArrowDown":
      keyboard.DOWN = true;
      break;
    case "Space":
      keyboard.SPACE = true;
      break;
    case "KeyD":
      keyboard.D = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "ArrowUp":
      keyboard.UP = false;
      break;
    case "ArrowDown":
      keyboard.DOWN = false;
      break;
  }
});
