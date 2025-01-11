
const Router = ReactRouterDOM.HashRouter
const Routes = ReactRouterDOM.Routes
const Route = ReactRouterDOM.Route

const initReactI18next = ReactI18next.initReactI18next


const lang = new URLSearchParams(new URL(window.location).search).get('lang') ?? navigator.language.substring(0, 2).toLocaleLowerCase()

i18next.use(initReactI18next).init({
  resources: resources,
  lng: lang,
  fallbacking: "en",
  interpolation: {
    escapeValue: false
  }
})

ReactDOM.render((
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="howto" element={<Howto />} />
    </Routes>
  </Router>
), document.getElementById('app'))