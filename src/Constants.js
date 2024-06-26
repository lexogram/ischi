const hostname = location.hostname
export const IS_DEPLOYED = /lexogram.github.io/.test(hostname) // true //


export const HOSTNAME = IS_DEPLOYED
  ? "nevzorovyh.lexogram.com"
  : "localhost"

export const PORT = IS_DEPLOYED
  ? ""      // no colon
  : ":8888" // includes colon

export const PACK_SOURCE = "ischi/packs.json"

export const DELAY_ARRAY = [
  [500,  "Show next card after half a second"],
  [1000, "Show next card after 1 second"],
  [2000, "Show next card after 2 seconds"],
  [3000, "Show next card after 3 seconds"],
  [5000, "Show next card after 5 seconds"],
  ["click", "Click \"Next Card\" button to show it"]
]

export const BACKEND       = `https://${HOSTNAME}${PORT}`
export const SIGNUP        = `${BACKEND}/signup`
export const SIGNIN        = `${BACKEND}/signin`
export const SIGNOUT       = `${BACKEND}/signout`
export const SIGNEDIN      = `${BACKEND}/signedin`
export const GETPACKS      = `${BACKEND}/owned`
export const GETEVENTPACKS = `${BACKEND}/event`
export const ISCHI         = `${BACKEND}/ischi`
export const SAVEPACK      = `${BACKEND}/save`

export const CONNECTION_PATH = "/connection"

export const FETCH_OPTIONS = {
  headers: { "Content-Type": "application/json" },
  method: "POST",
  credentials: "include"
}