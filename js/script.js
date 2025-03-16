let startScreen;
let instructionDialog;
let orientationMessage;
let impressumDialog;
let dialogOpened = false;

function initStartScreen() {
    startScreen = document.getElementById("startScreen");
    instructionDialog = document.getElementById("instructionsDialog");
    impressumDialog = document.getElementById("impressumDialog");
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

function toggleDialog(dialog) {
    if (!dialogOpened) {
        dialog.style.display = "flex";
        startScreen.style.borderRadius = "25px";  
        dialogOpened = true;
    } else {
        dialog.style.display = "none";
        startScreen.style.borderRadius = "0px";  
        dialogOpened = false;
    }
}

/* window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation); */
