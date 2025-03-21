/**
 * Handles collisions and plays appropriate sounds.
 */
export function handleCollisionsAndSounds(character) {
    character.checkBarrierCollisions();
    soundsEnabled && character.playCollisionSound();
    character.swimmingSound.pause();
  }
  
  /**
   * Handles the character's movement based on keyboard input.
   * @param {Object} character - The character instance.
   * @param {number} deltaTime - The time elapsed since the last frame.
   */
  export function handleMovement(character, deltaTime) {
    if (character.world.keyboard.RIGHT && character.x < character.world.level.levelEndX && character.canMoveRight) {
      character.moveRight(deltaTime);
      handleMovementStart(character, "right");
    }
    if (character.world.keyboard.LEFT && character.x > character.world.level.levelStartX && character.canMoveLeft) {
      character.moveLeft(deltaTime);
      handleMovementStart(character, "left");
    }
    if (character.world.keyboard.UP && character.y > character.world.level.levelStartY && character.canMoveUp) {
      character.moveUp(deltaTime);
      handleMovementStart(character);
    }
    if (character.world.keyboard.DOWN && character.y < character.world.level.levelEndY && character.canMoveDown) {
      character.moveDown(deltaTime);
      handleMovementStart(character);
    }
  }
  
  /**
   * Handles the start of a movement action and resets idle-related states.
   * @param {Object} character - The character instance.
   * @param {string} [direction] - The direction of movement ("right" or "left").
   */
  export function handleMovementStart(character, direction) {
    clearInterval(character.gravityInterval);
    soundsEnabled && character.swimmingSound.play();
    character.snoringSound.pause();
    character.idleTime = 0;
    switch (direction) {
      case "right":
        character.otherDirection = false;
        break;
      case "left":
        character.otherDirection = true;
        break;
      default:
        break;
    }
  }
  
  /**
   * Handles the character's idle movement when no input is detected.
   * @param {Object} character - The character instance.
   * @param {number} deltaTime - The time elapsed since the last frame.
   */
  export function handleIdleMovement(character, deltaTime) {
    if (character.idleTime >= 150 && character.y < character.world.level.levelEndY && character.canMoveDown) {
      if (soundsEnabled) {
        character.snoringSound.loop = true;
        character.snoringSound.play();
      }
      character.moveDown(deltaTime / 5);
    }
  }
  
  /**
   * Handles the death animation for the character.
   * Determines the type of death animation based on the enemy type.
   * @param {Object} character - The character instance.
   * @param {number} deltaTime - The time elapsed since the last frame.
   */
  export function handleDeathAnimation(character, deltaTime) {
    if (character.isDead()) {
      if (character.enemyType === "jellyFish") {
        animateJellyFishDeath(character, deltaTime);
      } else {
        animateDefaultDeath(character, deltaTime);
      }
    }
  }
  
  /**
   * Retrieves the appropriate animation images based on the character's current state.
   * @param {Object} character - The character instance.
   * @returns {Array<string>} The array of image paths for the current animation.
   */
  export function getAnimationImages(character) {
    if (character.isDead()) return getDyingImages(character);
    if (character.isHurt()) return getHurtImages(character);
    if (character.world.keyboard.D) return getBubbleAttackImages(character);
    if (character.world.keyboard.SPACE) return getFinSlapImages(character);
    if (isMoving(character)) return character.IMAGES_SWIM;
    return getIdleImages(character);
  }
  
  /**
   * Retrieves the images for the fin slap attack animation.
   * Sets the attack damage to 2.
   * @param {Object} character - The character instance.
   * @returns {Array<string>} The array of image paths for the fin slap attack animation.
   */
  export function getFinSlapImages(character) {
    character.world.attackDamage = 2;
    return character.IMAGES_ATTACK_FIN_SLAP;
  }
  
  /**
   * Checks if the character is currently moving based on keyboard input.
   * @param {Object} character - The character instance.
   * @returns {boolean} True if the character is moving, otherwise false.
   */
  export function isMoving(character) {
    const { RIGHT, LEFT, UP, DOWN } = character.world.keyboard;
    return RIGHT || LEFT || UP || DOWN;
  }
  
  /**
   * Retrieves the images for the idle animation based on the idle time.
   * @param {Object} character - The character instance.
   * @returns {Array<string>} The array of image paths for the idle animation.
   */
  export function getIdleImages(character) {
    if (character.idleTime >= 150 && character.idleTime < 164) return character.IMAGES_FALL_ASLEEP;
    if (character.idleTime >= 164) return character.IMAGES_SLEEP;
    return character.IMAGES_IDLE;
  }
  
  /**
   * Retrieves the images for the hurt animation based on the enemy type.
   * @param {Object} character - The character instance.
   * @returns {Array<string>} The array of image paths for the hurt animation.
   */
  export function getHurtImages(character) {
    switch (character.enemyType) {
      case "pufferFish":
        return character.IMAGES_HURT_POISONED;
      case "endboss":
        return character.IMAGES_HURT_POISONED;
      case "jellyFish":
        return character.IMAGES_HURT_ELECTRO_SHOCK;
    }
  }
  
  /**
   * Retrieves the sound effect to play when the character is hurt.
   * @param {Object} character - The character instance.
   * @returns {Audio} The audio object for the hurt sound effect.
   */
  export function getHurtSound(character) {
    switch (character.enemyType) {
      case "pufferFish":
        return character.posionedSound;
      case "endboss":
        return character.posionedSound;
      case "jellyFish":
        return character.electricShockSound;
    }
  }
  
  /**
   * Retrieves the images for the dying animation based on the enemy type.
   * @param {Object} character - The character instance.
   * @returns {Array<string>} The array of image paths for the dying animation.
   */
  export function getDyingImages(character) {
    switch (character.enemyType) {
      case "pufferFish":
        return character.IMAGES_DEAD_POISONED;
      case "endboss":
        return character.IMAGES_DEAD_POISONED;
      case "jellyFish":
        return character.IMAGES_DEAD_ELECTRO_SHOCK;
    }
  }
  
  /**
   * Retrieves the images for the bubble attack animation based on the number of bottles.
   * @param {Object} character - The character instance.
   * @returns {Array<string>} The array of image paths for the bubble attack animation.
   */
  export function getBubbleAttackImages(character) {
    if (character.bottles > 0) {
      return character.IMAGES_ATTACK_POISONED_BUBBLES;
    } else {
      return character.IMAGES_ATTACK_BUBBLES;
    }
  }