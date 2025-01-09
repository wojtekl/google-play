
const Router = ReactRouterDOM.HashRouter
const Routes = ReactRouterDOM.Routes
const Route = ReactRouterDOM.Route
const useNavigate = ReactRouterDOM.useNavigate
const NavLink = ReactRouterDOM.NavLink

const i18n = i18next
const initReactI18next = ReactI18next.initReactI18next
const useTranslation = ReactI18next.useTranslation
const Trans = ReactI18next.Trans


const lang = new URLSearchParams(new URL(window.location).search).get("lang") ?? navigator.language.substring(0, 2).toLocaleLowerCase();

i18n.use(initReactI18next).init({
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
), document.getElementById('app'));