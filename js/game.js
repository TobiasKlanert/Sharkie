let canvas;
let world;
let fullscreenEnabled = false;
let soundsEnabled = true;
let keyboard = new Keyboard();

let isPaused = false;
let savedIntervals = [];

function startGame() {
  initButtons();
  initAssets();
  initLevel();
  init();
}

function initButtons() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameoverScreen").style.display = "none";
  document.getElementById("winningScreen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.getElementById("btnSounds").style.display = "flex";
  document.getElementById("btnFullscreen").style.display = "flex";
  document.getElementById("btnStop").style.display = "flex";
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function stopGame(screenType) {
  DrawableObject.intervalIds.forEach(clearInterval);
  if (fullscreenEnabled) {
    toggleBtnFullscreen(document.getElementById("btnFullscreen"));
    document.getElementById("canvas").classList.toggle("fullscreen");
    exitFullscreen();
  }
  document.getElementById("btnSounds").style.display = "none";
  document.getElementById("btnFullscreen").style.display = "none";
  document.getElementById("btnStop").style.display = "none";
  document.getElementById("canvas").style.display = "none";
  document.getElementById(screenType).style.display = "flex";
  document.getElementById("btnFullscreen").classList.add("d-none");
}

function toggleSound(button) {
  soundsEnabled = !soundsEnabled;

  const svg1 = `
    <svg width="100" height="81" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,30 40,30 60,10 60,90 40,70 20,70" fill="currentColor" />
      <path d="M70 30 Q85 50 70 70" stroke="currentColor" stroke-width="8" fill="none" />
      <path d="M80 20 Q100 50 80 80" stroke="currentColor" stroke-width="6" fill="none" />
    </svg>
  `;

  const svg2 = `
    <svg width="100" height="81" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,30 40,30 60,10 60,90 40,70 20,70" fill="currentColor" />
      <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" stroke-width="8" />
    </svg>
  `;

  button.innerHTML = button.innerHTML.includes("path") ? svg2 : svg1;
}

function toggleFullscreen(button) {
  fullscreenEnabled ? exitFullscreen() : enterFullscreen();
  document.getElementById("canvas").classList.toggle("fullscreen");
  toggleBtnFullscreen(button);
}

function toggleBtnFullscreen(button) {
  const svg1 = `
    <svg
      width="70"
      height="70"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="12"
      fill="none"
    >
      <polyline points="10,30 10,10 30,10" />
      <polyline points="70,10 90,10 90,30" />
      <polyline points="10,70 10,90 30,90" />
      <polyline points="70,90 90,90 90,70" />
    </svg>
  `;

  const svg2 = `
    <svg
      width="70"
      height="70"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="12"
      fill="none"
    >
      <polyline points="10,30 30,30 30,10" />
      <polyline points="90,30 70,30 70,10" />
      <polyline points="10,70 30,70 30,90" />
      <polyline points="90,70 70,70 70,90" />
    </svg>

  `;

  button.innerHTML = button.innerHTML.includes("10,30 10,10 30,10")
    ? svg2
    : svg1;
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
  fullscreenEnabled = true;
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  fullscreenEnabled = false;
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
