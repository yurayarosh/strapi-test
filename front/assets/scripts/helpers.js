// const detectBrowser = exp => {
//   if (!window) return false
//   return exp
// }

// export const {
//   isAndroid,
//   isCordova,
//   isEdge,
//   isFirefox,
//   isChrome,
//   isChromeIOS,
//   isChromiumBased,
//   isIE,
//   isIOS,
//   isOpera,
//   isSafari,
// } = {
//   isAndroid: detectBrowser(/Android/.test(navigator.userAgent)),
//   isCordova: detectBrowser(!!window.cordova),
//   isEdge: detectBrowser(/Edge/.test(navigator.userAgent)),
//   isFirefox: detectBrowser(/Firefox/.test(navigator.userAgent)),
//   isChrome: detectBrowser(/Google Inc/.test(navigator.vendor)),
//   isChromeIOS: detectBrowser(/CriOS/.test(navigator.userAgent)),
//   isChromiumBased: detectBrowser(!!window.chrome && !/Edge/.test(navigator.userAgent)),
//   isIE: detectBrowser(/Trident/.test(navigator.userAgent)),
//   isIOS: detectBrowser(/(iPhone|iPad|iPod)/.test(navigator.platform)),
//   isOpera: detectBrowser(/OPR/.test(navigator.userAgent)),
//   isSafari: detectBrowser(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)),
// }

// const detectWebkit = () => {
//   if (!window) return false
//   return isChrome || isChromiumBased || isChromeIOS || isSafari || isAndroid || isIOS
// }
// export const isWebkit = detectWebkit()

const detectTouch = () => {
  if (typeof window === 'undefined') return
  return 'ontouchstart' in window || navigator.maxTouchPoints
}

export const isTouch = detectTouch()

export function preventScroll() {
  if (typeof window === 'undefined') return

  const getScrollbarWidth = (() => window.innerWidth - document.documentElement.clientWidth)()
  document.body.style.overflow = 'hidden'
  if (getScrollbarWidth > 0) document.body.style.marginRight = `${getScrollbarWidth}px`
}

export function allowScroll() {
  if (typeof window === 'undefined') return

  document.body.style.overflow = ''
  document.body.style.marginRight = ''
}

export function toggleScroll(condition) {
  if (typeof window === 'undefined') return

  condition ? preventScroll() : allowScroll()
}
