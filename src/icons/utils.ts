import { nextTick } from 'vue'
import insertCss from './insert-css'

export const iconStyles = `
.gdesign-icon {
  width: 1em; height: 1em; overflow: hidden; font-size: var(--icon-font-size-inherit, 20px); vertical-align: -0.15em;
}`

let cssInjectedFlag = false

export const useInsertStyles = (styleStr = iconStyles) => {
    nextTick(() => {
        if (!cssInjectedFlag) {
            if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
                insertCss(styleStr, {
                    prepend: true
                })
            }
            cssInjectedFlag = true
        }
    })
}
