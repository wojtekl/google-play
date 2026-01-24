import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { resources } from './resources'
import i18next from 'https://esm.sh/i18next'
import { default as initReactI18next } from 'https://esm.sh/react-i18next'
//const Router = ReactRouterDOM.BrowserRouter
//const Routes = ReactRouterDOM.Routes
//const Route = ReactRouterDOM.Route

//const initReactI18next = ReactI18next.initReactI18next

console.log(i18next)
console.log(initReactI18next)

const lang = new URLSearchParams(new URL(window.location).search).get('lang') ?? navigator.language.substring(0, 2).toLocaleLowerCase()

i18next.use(initReactI18next).init({
  resources: resources,
  lng: lang,
  fallbacking: "pl",
  interpolation: {
    escapeValue: false
  }
})

render((
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/howto" element={<Howto />} />
    </Routes>
  </Router>
), document.getElementById('app'))
