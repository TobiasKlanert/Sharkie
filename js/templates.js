/**
 * @returns SVG for sounds enabled
 */
function getSoundOnSvg() {
  return `
    <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,30 40,30 60,10 60,90 40,70 20,70" fill="currentColor" />
      <path d="M70 30 Q85 50 70 70" stroke="currentColor" stroke-width="8" fill="none" />
      <path d="M80 20 Q100 50 80 80" stroke="currentColor" stroke-width="6" fill="none" />
    </svg>
  `;
}

/**
 * @returns SVG for sounds disabled
 */
function getSoundOffSvg() {
  return `
    <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,30 40,30 60,10 60,90 40,70 20,70" fill="currentColor" />
      <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" stroke-width="8" />
    </svg>
  `;
}

/**
 * @returns SVG for fullscreen enabled
 */
function getEnableFullscreenSvg() {
  return `
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
}

/**
 * @returns SVG for fullscreen disabled
 */
function getDisableFullscreenSvg() {
  return `
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
}
