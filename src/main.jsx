import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './utils/globalAnimationObserver'
import faviconIco from './assets/favicon.ico'

const applyFavicons = () => {
  const faviconLinks = [
    { rel: 'icon', type: 'image/x-icon', href: faviconIco },
    { rel: 'shortcut icon', type: 'image/x-icon', href: faviconIco },
  ]

  faviconLinks.forEach(({ rel, type, href }) => {
    let link = document.head.querySelector(`link[rel="${rel}"][type="${type}"]`)

    if (!link) {
      link = document.createElement('link')
      link.rel = rel
      link.type = type
      document.head.appendChild(link)
    }

    link.href = href
  })
}

applyFavicons()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
