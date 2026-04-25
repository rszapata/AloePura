import { useEffect } from 'react'

const DEFAULT_TITLE = 'AloePura · Cosmética Natural de Aloe Vera'
const DEFAULT_DESCRIPTION =
  'AloePura - Cosméticos naturales de aloe vera certificados, cultivados en las Islas Canarias. Orgánicos, sostenibles y avalados por dermatólogos.'

/**
 * Sets <title> and <meta name="description"> for the current page.
 * Restores previous values on unmount so SPA navigation stays clean.
 */
export default function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    const prevTitle = document.title
    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content') ?? DEFAULT_DESCRIPTION

    if (title) {
      document.title = `${title} · AloePura`
    } else {
      document.title = DEFAULT_TITLE
    }

    if (metaDesc && description) {
      metaDesc.setAttribute('content', description)
    }

    return () => {
      document.title = prevTitle
      if (metaDesc) metaDesc.setAttribute('content', prevDesc)
    }
  }, [title, description])
}
