/**
 * Handles collisions between the character and a specific asset.
 * @param {Array<Object>} asset - The list of assets.
 * @param {Object} element - The specific asset the character collided with.
 * @param {World} world - The game world instance.
 */
function handleCollision(asset, element, world) {
  switch (asset) {
    case world.level.enemies:
      handleEnemyCollision(element, world);
      break;
    case world.level.coins:
      collectCoins(element, world);
      break;
    case world.level.bottles:
      collectBottles(element, world);
      break;
    default:
      break;
  }
}

/**
 * Handles collisions between the character and an enemy.
 * @param {Object} enemy - The enemy the character collided with.
 * @param {World} world - The game world instance.
 */
function handleEnemyCollision(enemy, world) {
  world.character.collisionWithEnemy(enemy);
  if (world.keyboard.SPACE && world.character.enemyType == "pufferFish") {
    world.character.executeAttack = true;
    world.character.attack(enemy);
    killEnemy(enemy, world);
  } else if (!world.character.executeAttack) {
    enemyCollisions(enemy.collisionDamage, world);
  }
}

/**
 * Handles the logic for killing an enemy.
 * @param {Object} enemy - The enemy to be killed.
 * @param {World} world - The game world instance.
 */
function killEnemy(enemy, world) {
  if (enemy.health <= 0 && !enemy.isDying) {
    startEnemyDeathSequence(enemy, world);
    cleanupEnemyAfterDeath(enemy, world);
  }
}

/**
 * Handles collisions between the character and an enemy.
 * Applies damage to the character and updates the life status bar.
 * Plays the hurt sound if sounds are enabled.
 * @param {number} collisionDamage - The amount of damage caused by the collision.
 */
function enemyCollisions(collisionDamage, world) {
  let hurtSound = getHurtSound(world.character);
  world.character.hit(collisionDamage);
  if (soundsEnabled && hurtSound) {
    hurtSound.play();
  }
  world.statusBarLife.setPercentage(
    world.character.energy,
    world.statusBarLife.IMAGES_LIFE
  );
  if (world.character.isDead(world.character)) {
    if (!currentMusic.paused) {
      currentMusic.pause();
    }
    currentMusic.currentTime = 0;
    setTimeout(() => {
      if (soundsEnabled && world.gameOverSound) {
        world.gameOverSound.play();
      }
      stopGame("gameoverScreen");
    }, 2000);
  }
}

/**
 * Starts the death animation sequence for an enemy.
 * @param {Object} enemy - The enemy to start the death sequence for.
 * @param {World} world - The game world instance.
 */
function startEnemyDeathSequence(enemy, world) {
  enemy.isDying = true;
  getDyingInterval(enemy);
  enemy.loadImages(enemy.enemyDyingImages);
  world.animationInterval = setInterval(() => {
    enemy.playAnimation(enemy.enemyDyingImages);
  }, enemy.animationTime);

  if (enemy.moveInterval) {
    clearInterval(enemy.moveInterval);
  }
  clearInterval(enemy.animationInterval);
}

/**
 * Sets the animation time for the dying animation based on the enemy type.
 * Adjusts the duration of the dying animation to match the specific enemy.
 * @param {Object} enemy - The enemy object for which the dying interval is being set.
 * @param {string} enemy.enemyType - The type of the enemy (e.g., "pufferFish", "jellyFish").
 */
function getDyingInterval(enemy) {
  switch (enemy.enemyType) {
    case "pufferFish":
      this.animationTime = 130;
      break;
    case "jellyFish":
      this.animationTime = 100;
      break;
    default:
      break;
  }
}

/**
 * Cleans up the enemy after its death animation is complete.
 * @param {Object} enemy - The enemy to be cleaned up.
 * @param {World} world - The game world instance.
 */
function cleanupEnemyAfterDeath(enemy, world) {
  setTimeout(() => {
    clearInterval(world.animationInterval);
    world.level.enemies = world.level.enemies.filter((e) => e !== enemy);
    world.character.executeAttack = false;
    if (world.endboss.isDying) {
      handleEndbossDeath(world);
    }
  }, enemy.enemyDyingImages.length * enemy.animationTime);
}

/**
 * Handles the logic for when the endboss is defeated.
 * @param {World} world - The game world instance.
 */
function handleEndbossDeath(world) {
  if (!currentMusic.paused) {
    currentMusic.pause();
  }
  currentMusic.currentTime = 0;
  if (soundsEnabled && world.winningSound) {
    world.winningSound.play();
  }
  stopGame("winningScreen");
  showCollectedCoins(world);
}

/**
 * Displays the number of coins collected by the character.
 * @param {World} world - The game world instance.
 */
function showCollectedCoins(world) {
  document.getElementById("collectedCoins").innerHTML =
    world.character.coins + " / 25";
}

/**
 * Checks if the character collides with the left side of a barrier.
 * @param {Object} barrier - The barrier to check.
 * @param {World} world - The game world instance.
 * @returns {boolean} True if a collision occurs, otherwise false.
 */
function getBarrierCollisionLeft(barrier, world) {
  return (
    world.character.x +
      world.character.offset.left +
      (world.character.width - world.character.offset.right) >=
      barrier.x + barrier.offsetTop.left &&
    world.character.x +
      world.character.offset.left +
      (world.character.width - world.character.offset.right) <
      barrier.x + barrier.width + barrier.offsetTop.left - 50
  );
}

/**
 * Checks if the character collides with the right side of a barrier.
 * @param {Object} barrier - The barrier to check.
 * @param {World} world - The game world instance.
 * @returns {boolean} True if a collision occurs, otherwise false.
 */
function getBarrierCollisionRight(barrier, world) {
  return (
    world.character.x + world.character.offset.left <=
      barrier.x +
        barrier.offsetTop.left +
        (barrier.width - barrier.offsetTop.right) &&
    world.character.x + world.character.offset.left >
      barrier.x + barrier.offsetTop.left + 50
  );
}

/**
 * Checks if the character collides with the top side of a barrier.
 * @param {Object} barrier - The barrier to check.
 * @returns {boolean} True if a collision occurs, otherwise false.
 */
function getBarrierCollisionTop(barrier, world) {
  return (
    (world.character.y +
      world.character.offset.top +
      (world.character.height - world.character.offset.bottom) >=
      barrier.y + barrier.offsetTop.top &&
      world.character.y +
        world.character.offset.top +
        (world.character.height - world.character.offset.bottom) <
        barrier.y + barrier.offsetTop.top + 10) ||
    (world.character.y +
      world.character.offset.top +
      (world.character.height - world.character.offset.bottom) >=
      barrier.y + barrier.offsetBottom.top &&
      world.character.y +
        world.character.offset.top +
        (world.character.height - world.character.offset.bottom) <
        barrier.y + barrier.offsetBottom.top + 10)
  );
}

/**
 * Checks if the character collides with the bottom side of a barrier.
 * @param {Object} barrier - The barrier to check.
 * @returns {boolean} True if a collision occurs, otherwise false.
 */
function getBarrierCollisionBottom(barrier, world) {
  return (
    world.character.y + world.character.offset.top <=
      barrier.y +
        barrier.offsetTop.top +
        (barrier.height - barrier.offsetTop.bottom) &&
    world.character.y + world.character.offset.top >
      barrier.y +
        barrier.offsetTop.top +
        (barrier.height - barrier.offsetTop.bottom) -
        10
  );
}

/**
 * Handles the logic for collecting coins.
 * Updates the coin count, plays the coin collection sound, and updates the status bar.
 * @param {Object} coin - The coin object being collected.
 */
function collectCoins(coin, world) {
  world.character.countCoins();
  soundsEnabled && world.playSound(world.character.collectCoinSound);
  world.statusBarCoins.setPercentage(
    world.character.coinPercentage,
    world.statusBarCoins.IMAGES_COINS
  );
  world.level.coins = world.level.coins.filter((c) => c !== coin);
}

/**
 * Handles the logic for collecting bottles.
 * Updates the bottle count, plays the bottle collection sound, and updates the status bar.
 * @param {Object} bottle - The bottle object being collected.
 */
function collectBottles(bottle, world) {
  world.character.countBottles();
  soundsEnabled && world.playSound(world.character.collectBottleSound);
  world.statusBarBottles.setPercentage(
    world.character.bottles,
    world.statusBarBottles.IMAGES_BOTTLES
  );
  world.level.bottles = world.level.bottles.filter((b) => b !== bottle);
}
