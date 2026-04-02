import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// prevents auto CSS injection issues in SSR
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  // add ALL icons from packs (easy mode)
  library.add(fas, far, fab)

  // register component globally
  nuxtApp.vueApp.component('Fa', FontAwesomeIcon)
})