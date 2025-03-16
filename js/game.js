let canvas;
let world;
let fullscreenEnabled = false;
let soundsEnabled = true;
let keyboard = new Keyboard();

let isPaused = false;
let savedIntervals = [];

let topPanel;
let bottomPanel;
let btnSounds;
let btnFullscreen;
let btnStop;
let btnUp;
let btnDown;
let btnLeft;
let btnRight;
let btnBubble;
let btnSlap;

let intervalIds = [];

let backgroundMusic = new Audio("audio/background-music.mp3");
let currentMusic;

let mobileDevice = false;

function startGame() {
  checkDevice();
  initCanvas();
  initButtons();
  setButtons();
  initAssets();
  initLevel();
  init();

  if (!soundsEnabled) {
    toggleSound(btnSounds);
  }
  
  currentMusic = backgroundMusic;
  currentMusic.volume = 0.2;
  currentMusic.loop = true;
  currentMusic.play();
}

function initCanvas() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameoverScreen").style.display = "none";
  document.getElementById("winningScreen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
}

function initButtons() {
  topPanel = document.getElementById("topPanel");
  bottomPanel = document.getElementById("bottomPanel");
  btnSounds = document.getElementById("btnSounds");
  btnFullscreen = document.getElementById("btnFullscreen");
  btnStop = document.getElementById("btnStop");
  btnUp = document.getElementById("btnUp");
  btnDown = document.getElementById("btnDown");
  btnLeft = document.getElementById("btnLeft");
  btnRight = document.getElementById("btnRight");
  btnBubble = document.getElementById("btnBubble");
  btnSlap = document.getElementById("btnSlap");
}

function setButtons() {
  btnSounds.style.display = "flex";
  btnFullscreen.style.display = "flex";
  btnStop.style.display = "flex";
  if (mobileDevice) {
    btnUp.style.display = "flex";
    btnDown.style.display = "flex";
    btnLeft.style.display = "flex";
    btnRight.style.display = "flex";
    btnBubble.style.display = "flex";
    btnSlap.style.display = "flex";
  }
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  if (mobileDevice) {
    enterFullscreen();
    btnFullscreen.style.display = "none";
  }
}

function stopGame(screenType) {
  intervalIds.forEach((id) => clearInterval(id));
  intervalIds.splice(0, intervalIds.length);
  if (fullscreenEnabled) {
    exitFullscreen();
  }
  stopMusic();
  stopSounds();

  document.getElementById(screenType).style.display = "flex";
  disableButtons();
}

function stopMusic() {
  currentMusic.pause();
  currentMusic.currentTime = 0;
}

function stopSounds() {
  world.character.bubbleSound.pause();
  world.character.bubbleSound.currentTime = 0;
  world.character.snoringSound.pause();
  world.character.snoringSound.currentTime = 0;
}

function disableButtons() {
  btnSounds.style.display = "none";
  btnFullscreen.style.display = "none";
  btnStop.style.display = "none";
  btnUp.style.display = "none";
  btnDown.style.display = "none";
  btnLeft.style.display = "none";
  btnRight.style.display = "none";
  btnBubble.style.display = "none";
  btnSlap.style.display = "none";
  canvas.style.display = "none";
}

function toggleSound(button) {
  soundsEnabled = !soundsEnabled;

  const svg1 = `
    <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,30 40,30 60,10 60,90 40,70 20,70" fill="currentColor" />
      <path d="M70 30 Q85 50 70 70" stroke="currentColor" stroke-width="8" fill="none" />
      <path d="M80 20 Q100 50 80 80" stroke="currentColor" stroke-width="6" fill="none" />
    </svg>
  `;

  const svg2 = `
    <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,30 40,30 60,10 60,90 40,70 20,70" fill="currentColor" />
      <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" stroke-width="8" />
    </svg>
  `;

  button.innerHTML = button.innerHTML.includes("path") ? svg2 : svg1;
  if (soundsEnabled) {
    currentMusic.play();
    world.character.idleTime >= 150 && world.character.snoringSound.play();
  } else {
    currentMusic.pause();
    world.character.snoringSound.pause();
    world.character.bubbleSound.pause();
  }
}

function toggleFullscreen() {
  fullscreenEnabled ? exitFullscreen() : enterFullscreen();
}

function toggleBtnFullscreen(button) {
  const svg1 = `
    <svg
      width="60"
      height="60"
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
      width="60"
      height="60"
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
  canvas.classList.toggle("fullscreen");
  toggleBtnFullscreen(btnFullscreen);
  arrangeButtons();
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

function arrangeButtons() {
  canvas.classList.toggle("relative");
  topPanel.classList.toggle("top-absolute");
  bottomPanel.classList.toggle("bottom-absolute");
}

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullscreenEnabled = false;
    toggleBtnFullscreen(btnFullscreen);
    canvas.classList.toggle("fullscreen");
    arrangeButtons();
  }
});

function pushToIntervals(intervals) {
  intervals.forEach((interval) => {
    intervalIds.push(interval);
  });
}

function checkDevice() {
  if ("ontouchstart" in window) {
    mobileDevice = true;
  } else {
    mobileDevice = false;
  }
}

function checkTouchEvents() {
  if (btnLeft) {
    btnLeft.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
      },
      { passive: false }
    );

    btnLeft.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
      },
      { passive: false }
    );
  }

  if (btnRight) {
    btnRight.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
      },
      { passive: false }
    );

    btnRight.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
      },
      { passive: false }
    );
  }

  if (btnUp) {
    btnUp.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        keyboard.UP = true;
      },
      { passive: false }
    );

    btnUp.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();
        keyboard.UP = false;
      },
      { passive: false }
    );
  }

  if (btnDown) {
    btnDown.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        keyboard.DOWN = true;
      },
      { passive: false }
    );

    btnDown.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();
        keyboard.DOWN = false;
      },
      { passive: false }
    );
  }

  if (btnBubble) {
    btnBubble.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        keyboard.D = true;
      },
      { passive: false }
    );
  }

  if (btnSlap) {
    btnSlap.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
      },
      { passive: false }
    );
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
