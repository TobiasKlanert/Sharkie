/**
 * Listens for changes in fullscreen mode and updates UI elements accordingly.
 * @event fullscreenchange
 * @listens document#fullscreenchange
 */
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullscreenEnabled = false;
    toggleBtnFullscreen(btnFullscreen);
    canvas.classList.toggle("fullscreen");
    arrangeButtons();
  }
});

/**
 * Handles keydown events to update the keyboard state.
 * @event keydown
 * @listens window#keydown
 * @param {KeyboardEvent} event - The event object containing the key pressed.
 */
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

/**
 * Handles keyup events to update the keyboard state.
 * @event keyup
 * @listens window#keyup
 * @param {KeyboardEvent} event - The event object containing the key released.
 */
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

/**
 * Event listener for the "DOMContentLoaded" event to initialize the start screen.
 * @event DOMContentLoaded
 */
addEventListener("DOMContentLoaded", initStartScreen);

/**
 * Event listener for the "resize" event to check and adjust the screen orientation.
 * @event resize
 */
window.addEventListener("resize", checkOrientation);

/**
 * Event listener for the "orientationchange" event to check and adjust the screen orientation.
 * @event orientationchange
 */
window.addEventListener("orientationchange", checkOrientation);