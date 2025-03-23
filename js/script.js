let startScreen;
let instructionDialog;
let orientationMessage;
let impressumBtn;
let dialogOpened = false;

/**
 * Initializes the start screen by retrieving DOM elements and checking the screen orientation.
 * @function initStartScreen
 * @listens DOMContentLoaded
 */
function initStartScreen() {
  startScreen = document.getElementById("startScreen");
  instructionDialog = document.getElementById("instructionsDialog");
  orientationMessage = document.getElementById("orientationMessage");
  impressumBtn = document.getElementById("btn-impressum");
  checkOrientation();
  preloadSounds();
}

/**
 * Checks the screen orientation and updates the UI accordingly.
 * If the device is in portrait mode, an orientation message is displayed.
 * @function checkOrientation
 * @listens resize
 * @listens orientationchange
 */
function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    orientationMessage.style.display = "flex";
    startScreen.style.borderRadius = "25px";
    dialogOpened = true;
  } else if (dialogOpened) {
    orientationMessage.style.display = "none";
    startScreen.style.borderRadius = "0";
  }
}

/**
 * Toggles the visibility of a given dialog window.
 * If the dialog is opened, the "Impressum" button is hidden and the start screen is styled accordingly.
 * If the dialog is closed, the "Impressum" button is shown again.
 * @function toggleDialog
 * @param {HTMLElement} dialog - The dialog element to be toggled.
 */
function toggleDialog(dialog) {
  if (!dialogOpened) {
    dialog.style.display = "flex";
    impressumBtn.style.display = "none";
    startScreen.style.borderRadius = "25px";
    dialogOpened = true;
  } else {
    dialog.style.display = "none";
    impressumBtn.style.display = "flex";
    startScreen.style.borderRadius = "0px";
    dialogOpened = false;
  }
}

function showStartScreen(screenType) {
  document.getElementById(screenType).style.display = "none";
  startScreen.style.display = "flex";
}
