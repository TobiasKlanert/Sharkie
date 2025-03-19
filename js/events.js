document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      fullscreenEnabled = false;
      toggleBtnFullscreen(btnFullscreen);
      canvas.classList.toggle("fullscreen");
      arrangeButtons();
    }
  });

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