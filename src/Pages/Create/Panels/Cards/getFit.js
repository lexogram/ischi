/**
 * src/Pages/Create/Panels/Cards/getFit.js
 */


// Create a hidden SVG element
const svgText = (() => {
  const SVGNS = "http://www.w3.org/2000/svg";
  const XMLNS = "http://www.w3.org/2000/xmlns/"
  const XLINK = "http://www.w3.org/1999/xlink"
  const svg = document.createElementNS(SVGNS, "svg");
  svg.setAttributeNS(XMLNS, "xmlns:xlink", XLINK);

  svg.setAttributeNS(null, "width", "100")
  svg.setAttributeNS(null, "height", "100")
  svg.setAttributeNS(null, "viewPort", "-10 -10 120 120")

  // Ensure that the element is displayed, but remains hidden
  svg.setAttributeNS(null, "style", `
    position: absolute;
    left: -9999px;
    width: 0px;
    height: 0px;
    pointer-events: 0
  `)

  const rect = document.createElementNS(SVGNS, 'rect');
  rect.setAttributeNS(null,'x', 0);
  rect.setAttributeNS(null,'y', 0);
  rect.setAttributeNS(null,'width', 100);
  rect.setAttributeNS(null,'height', 100);
  rect.setAttributeNS(null,'fill', "#f006");

  svg.append(rect)

  const family = '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  // Create an SVG text element for getting x, y and font-size
  const text = document.createElementNS(SVGNS, 'text');
  text.setAttributeNS(null,'font-family', family);
  text.setAttributeNS(null,'fill', "white");
  svg.append(text)
  document.body.appendChild(svg);

  return text
})()




export const getBestFit = (text, dimension) => {
  svgText.textContent = text

  const margin = (100 - dimension) / 2

  // Start too big for the square
  let size = dimension * 1.2
  svgText.setAttribute("font-size", size)
  let delta = size / 2

  let smallEnough = 1 // ridiculously small, certain to fit

  // Starting situation: width or height will be too big
  let bBox = svgText.getBBox()
  let { x, y, width, height } = bBox
  let newX, newY

  while (delta > 0.125) {
    if (width > dimension || height > dimension) {
      // Make it smaller
      size -= delta     

    } else if (width < dimension || height < dimension) {
      // It's not too big, but perhaps it could be bigger
      smallEnough = size // remember that this size fits
      size += delta // might now be too big
    }

    resize(size) // updates width and height

    delta /= 2
  }

  function resize(size) {
    svgText.setAttribute("font-size", size)

    // After resizing
    bBox = svgText.getBBox()
    x = bBox.x // edge of text box, including some padding
    y = bBox.y
    width = bBox.width // includes padding to left and right
    height = bBox.height

    const yNow = svgText.getAttribute("y")
    const yGap = (100 - height) / 2
    const adjustY = y - yGap
    newY = yNow - adjustY
    svgText.setAttribute("y", newY)

    const xNow = svgText.getAttribute("x") // where text starts
    const xGap = (100 - width) / 2 // where bBox should start
    const adjustX = xNow - x // offset from xGap to text.x
    newX = xGap + adjustX
    svgText.setAttribute("x", newX)
  }

  // Ensure that everything fits inside, but maybe too small
  if (width > 100 || height > 100) {
    resize(smallEnough)
  }

  return {
    x: newX - margin,
    y: newY - margin,
    size
  }
}