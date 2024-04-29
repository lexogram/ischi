const hostname = location.hostname
export const IS_DEPLOYED = /lexogram.github.io/.test(hostname) // true //

export const PROTOCOL = "https://"

export const HOSTNAME = IS_DEPLOYED
  ? "nevzorovyh.lexogram.com"
  : "localhost"

export const PORT = IS_DEPLOYED
  ? ""       // no colon
  : ":10000" // includes colon

export const PACK_SOURCE = "ischi/packs.json"

export const DELAY_ARRAY = [
  [500,  "Show next card after half a second"],
  [1000, "Show next card after 1 second"],
  [2000, "Show next card after 2 seconds"],
  [3000, "Show next card after 3 seconds"],
  [5000, "Show next card after 5 seconds"],
  ["click", "Click \"Next Card\" button to show it"]
]

export const BACKEND  = `${PROTOCOL}${HOSTNAME}${PORT}`
export const SIGNUP   = `${BACKEND}/signup`
export const SIGNIN   = `${BACKEND}/signin`
export const SIGNOUT  = `${BACKEND}/signout`
export const SIGNEDIN = `${BACKEND}/signedin`
export const CONNECTION_PATH = "/login"
