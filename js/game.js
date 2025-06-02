let canvas;
let world;
let fullscreenEnabled = false;
let soundsEnabled = true;
let keyboard = new Keyboard();

let isPaused = false;
let savedIntervals = [];
let animationFrameIds = [];
let gameRunning;

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

/**
 * Initializes and starts the game by setting up the canvas, buttons, and game assets.
 */
function startGame() {
  checkDevice();
  initCanvas();
  initButtons();
  setButtons();
  loadSoundState();
  initAssets();
  initLevel();
  init();

  currentMusic = backgroundMusic;
  currentMusic.volume = 0.2;
  currentMusic.loop = true;
  if (soundsEnabled) {
    currentMusic.play();
  }
}

/**
 * Initializes the game canvas and hides unnecessary UI elements.
 */
function initCanvas() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameoverScreen").style.display = "none";
  document.getElementById("winningScreen").style.display = "none";
  document.getElementById("btn-impressum").style.display = "none";
  document.getElementById("game").style.display = "flex";
  document.getElementById("canvas").style.display = "block";
}

/**
 * Assigns button elements from the DOM to their respective variables.
 */
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

/**
 * Displays the appropriate control buttons based on the device type.
 */
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

/**
 * Initializes the game world and keyboard controls.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  if (mobileDevice) {
    enterFullscreen();
    btnFullscreen.style.display = "none";
  }
}

/**
 * Stops the game and resets all elements.
 * @param {string} screenType - The screen to display after stopping the game.
 */
function stopGame(screenType) {
  if (fullscreenEnabled) {
    exitFullscreen();
  }
  stopIntervals();
  stopAllAnimations();
  stopMusic();
  stopSounds();
  removeAllBubbles();
  clearCanvas();
  resetKeyboard();
  changeScreen(screenType);
  disableButtons();
}

/**
 * Clears all active interval timers.
 */
function stopIntervals() {
  intervalIds.forEach((id) => clearInterval(id));
  intervalIds = [];
}

/**
 * Cancels all active animation frames and stops the game loop.
 */
function stopAllAnimations() {
  animationFrameIds.forEach((id) => cancelAnimationFrame(id));
  animationFrameIds = [];
  gameRunning = false;
}

/**
 * Stops the background music and resets its playback position.
 */
function stopMusic() {
  currentMusic.pause();
  currentMusic.currentTime = 0;
}

/**
 * Stops all character-related sounds.
 */
function stopSounds() {
  world.character.snoringSound.pause();
  world.character.snoringSound.currentTime = 0;
}

/**
 * Changes the game screen to the specified type.
 * @param {string} screenType - The ID of the screen to be displayed.
 */
function changeScreen(screenType) {
  document.getElementById("game").style.display = "none";
  document.getElementById(screenType).style.display = "flex";
  document.getElementById("btn-impressum").style.display = "flex";
}

/**
 * Removes all active bubbles from the game.
 */
function removeAllBubbles() {
  world.bubbles.forEach((bubble) => {
    bubble.sound.pause();
    bubble.sound.currentTime = 0;
    bubble.isActive = false;
  });
  world.bubbles = [];
}

/**
 * Clears the game canvas.
 */
function clearCanvas() {
  world.ctx.clearRect(0, 0, world.canvas.width, world.canvas.height);
}

/**
 * Resets all keyboard input states.
 */
function resetKeyboard() {
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.SPACE = false;
  keyboard.D = false;
}

/**
 * Hides all game control buttons and the game canvas.
 */
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

/**
 * Saves the state of the sound button and soundsEnabled to local storage.
 */
function saveSoundState() {
  const soundState = {
    soundsEnabled: soundsEnabled,
    btnSoundsState: btnSounds.innerHTML, // Save the current icon or state of the button
  };
  localStorage.setItem("soundState", JSON.stringify(soundState));
}

/**
 * Checks if the sound state is stored in local storage and retrieves it.
 * Updates the `soundsEnabled` and `btnSounds` state accordingly.
 */
function loadSoundState() {
  const soundState = localStorage.getItem("soundState");
  if (soundState) {
    const { soundsEnabled: storedSoundsEnabled, btnSoundsState } =
      JSON.parse(soundState);
    soundsEnabled = storedSoundsEnabled;
    btnSounds.innerHTML = btnSoundsState; // Update the button state (e.g., icon)
  }
}

/**
 * Toggles game sounds on or off and updates the sound button icon.
 * @param {HTMLElement} button - The button element that triggered the toggle.
 */
function toggleSound(button) {
  soundsEnabled = !soundsEnabled;

  const svg1 = getSoundOnSvg();
  const svg2 = getSoundOffSvg();

  button.innerHTML = button.innerHTML.includes("path") ? svg2 : svg1;
  if (soundsEnabled) {
    currentMusic.play();
    world.character.idleTime >= 150 && world.character.snoringSound.play();
  } else {
    currentMusic.pause();
    world.character.snoringSound.pause();
    world.bubbles.forEach((bubble) => bubble.sound.pause());
  }

  saveSoundState();
}

/**
 * Toggles between fullscreen mode and normal mode.
 */
function toggleFullscreen() {
  fullscreenEnabled ? exitFullscreen() : enterFullscreen();
}

/**
 * Toggles the fullscreen button icon between two SVG representations.
 * @param {HTMLElement} button - The button element whose icon should be toggled.
 */
function toggleBtnFullscreen(button) {
  const svg1 = getEnableFullscreenSvg();
  const svg2 = getDisableFullscreenSvg();

  button.innerHTML = button.innerHTML.includes("10,30 10,10 30,10")
    ? svg2
    : svg1;
}

/**
 * Enters fullscreen mode for the game element and adjusts UI elements accordingly.
 */
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

/**
 * Exits fullscreen mode and resets related UI elements.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  fullscreenEnabled = false;
}

/**
 * Adjusts the positioning of UI buttons for fullscreen mode.
 */
function arrangeButtons() {
  canvas.classList.toggle("relative");
  topPanel.classList.toggle("top-absolute");
  bottomPanel.classList.toggle("bottom-absolute");
}

/**
 * Pushes new interval IDs to the global interval list.
 * @param {number[]} intervals - An array of interval IDs.
 */
function pushToIntervals(intervals) {
  intervals.forEach((interval) => {
    intervalIds.push(interval);
  });
}

/**
 * Pushes new animation request frame IDs to the global list.
 * @param {number[]} animationIds - An array of animation frame IDs.
 */
function pushToRequests(animationIds) {
  animationIds.forEach((id) => animationFrameIds.push(id));
}

/**
 * Checks if the game is running on a mobile device.
 */
function checkDevice() {
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    mobileDevice = true;
  } else {
    mobileDevice = false;
  }
}

/**
 * Adds touch event listeners to control buttons.
 * This function maps touch events to keyboard states.
 */
function checkTouchEvents() {
  const buttons = [
    { btn: btnLeft, key: "LEFT" },
    { btn: btnRight, key: "RIGHT" },
    { btn: btnUp, key: "UP" },
    { btn: btnDown, key: "DOWN" },
    { btn: btnBubble, key: "D", end: false },
    { btn: btnSlap, key: "SPACE", end: false },
  ];

  buttons.forEach(({ btn, key, end = true }) => {
    if (btn) {
      btn.addEventListener("touchstart", () => (keyboard[key] = true), {
        passive: false,
      });
      if (end)
        btn.addEventListener("touchend", () => (keyboard[key] = false), {
          passive: false,
        });
    }
  });
}
