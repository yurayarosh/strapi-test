import { isTouch } from './helpers'
import { NO_TOUCH } from './constants'

const setHTMLClassNames = () => {
  if (typeof window === 'undefined') return

  const DOC = document.documentElement
  if (!isTouch) {
    DOC.classList.add(NO_TOUCH)
  }
}

export default setHTMLClassNames
