const soundMap = {
  backgroundMusic: "audio/background-music.mp3",
  bubbleAttackSound: "audio/bubble-attack.mp3",
  collectBottleSound: "audio/collect-bottle.mp3",
  collectCoinsSound: "audio/collect-coins.mp3",
  collisionSound: "audio/collision.mp3",
  electricShockSound: "audio/electric-shock.mp3",
  endbossAttackSound: "audio/endboss-attack.mp3",
  endbossMusic: "audio/endboss-music.mp3",
  finSlapSound: "audio/fin-slap.mp3",
  gameOverSound: "audio/game-over.mp3",
  poisonedSound: "audio/poisoned.mp3",
  characterSwimmingSound: "audio/swimming.mp3",
  characterSnoringSound: "audio/snoring.mp3",
  winningMusic: "audio/winning-music.mp3",
};

const loadedSounds = {};

let sounds = {};

/**
 * Preloads all audio files and stores them in a JSON object with descriptive keys.
 * @returns {Promise<Object>} A promise that resolves to an object containing all loaded sounds.
 */
function preloadSounds() {
  const soundPromises = Object.entries(soundMap).map(([key, path]) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(path);
      audio.addEventListener(
        "canplaythrough",
        () => {
          loadedSounds[key] = audio;
          resolve();
        },
        { once: true }
      );
      audio.addEventListener(
        "error",
        () => reject(`Failed to load sound: ${path}`),
        { once: true }
      );
    });
  });
  return Promise.all(soundPromises).then(() => loadedSounds);
}

preloadSounds()
  .then((loadedSounds) => {
    sounds = loadedSounds;
  })
  .catch((error) => {
    console.error(error);
  });
