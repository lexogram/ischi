// https://stackoverflow.com/a/65996386/1927589
export async function copyToClipboardAsync(textToCopy) {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy);
      
  } else {
    // You can't use navigator.clipboard when using http://
    // Use the old 'out of viewport hidden text area' trick
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
        
    // Move textarea out of the viewport so it's not visible
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";
        
    document.body.prepend(textArea);
    textArea.select();

    try {
      // Deprecated method:
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/  execCommand#browser_compatibility
      document.execCommand('copy');
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
}



export const capitalize = string => {
  return string.split(/\n/)
   .map( word => word[0].toUpperCase() + word.slice(1))
   .join(" ")
}



// COLOURS // COLOURS / COLOURS // COLOURS / COLOURS // COLOURS //

export const GOLDEN_ANGLE = 180 * (3 - Math.sqrt(5))
// 137.50776405003785



export const getGoldenAngleAt = index => {
  let angle = index * GOLDEN_ANGLE
  angle -= Math.floor(angle / 360) * 360 // 0.0 ≤ angle < 360.0

  return angle
}



export const rgbify = (color) => {
  if (color.substring(0, 3).toLowerCase() === "hsl" ) {
    return HSLtoRGB(color)
  }

  if (color[0] === "#") {
    color = color.slice(1)
  }

  if (color.length === 3) {
    color = color[0]+color[0]+color[1]+color[1]+color[2]+color[2]
  }

  const hex = parseInt(color, 16)

  return [
    hex >> 16           // red
  ,(hex >>  8) & 0x00FF // green
  , hex        & 0xFF   // blue
  ]
}



/**
 * Multiplies the rgb values of color by ratio, in the range
 * 0 - 255.
 *
 * E.g. toneColor("#cc8844 ", 0.5)
 * // "#642"
 * toneColor("#c84", 2.0)
 * // "#ffff88"
 */
export const toneColor = (color, ratio) => {
  const prefix = color[0] === "#"

  if (prefix) {
    color = color.slice(1)
  }

  const rgb = rgbify(color)
             .map( value => {
    value = Math.floor(Math.max(0, Math.min(255, value * ratio)))
    return ((value < 16) ? "0" : "") + value.toString(16)
  })

  return (prefix ? "#" : "") + rgb.join("")
}