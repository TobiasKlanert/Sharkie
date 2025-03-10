let startScreen;
let instructionDialog;
let orientationMessage;
let dialogOpened = false;

function initStartScreen() {
    startScreen = document.getElementById("startScreen");
    instructionDialog = document.getElementById('instructions-dialog');
    orientationMessage = document.getElementById("orientationMessage");
}

function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    orientationMessage.style.display = "flex";
    startScreen.style.backgroundImage = "none";
  } else {
    orientationMessage.style.display = "none";
    startScreen.style.backgroundImage = "url('graphics/3. Background/Mesa de trabajo 1.png')";
  }
}

function toggleInstructions() {
    if (!dialogOpened) {
        instructionDialog.style.display = "flex";
        startScreen.style.backgroundImage = "none";   
        dialogOpened = true;
    } else {
        instructionDialog.style.display = "none";
        startScreen.style.backgroundImage = "url('graphics/3. Background/Mesa de trabajo 1.png')";   
        dialogOpened = false;
    }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
