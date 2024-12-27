const Router = ReactRouterDOM.HashRouter
const Routes = ReactRouterDOM.Routes
const Route = ReactRouterDOM.Route
const useNavigate = ReactRouterDOM.useNavigate
const useParams = ReactRouterDOM.useParams
const NavLink = ReactRouterDOM.NavLink
const Provider = ReactRedux.Provider
const i18n = i18next
const initReactI18next = ReactI18next.initReactI18next
const useTranslation = ReactI18next.useTranslation

const Button = ReactBootstrap.Button
const Container = ReactBootstrap.Container
const Form = ReactBootstrap.Form
const Image = ReactBootstrap.Image
const ListGroup = ReactBootstrap.ListGroup
const Navbar = ReactBootstrap.Navbar
const Nav = ReactBootstrap.Nav


const markerDefault =  L.divIcon({ html: '<i class="bi bi-geo-alt-fill" style="font-size: 20px"></i>', className: "markerDefault", size: [20, 23], iconAnchor: [10, 11] })
const markerLive = L.divIcon({ html: '<i class="bi bi-geo-alt-fill" style="font-size: 20px; color: red"></i>', className: "markerLive", size: [20, 23], iconAnchor: [10, 11] })
const markerActive = L.divIcon({ html: '<i class="bi bi-geo-alt-fill" style="font-size: 20px; color: blue"></i>', className: "markerActive", size: [20, 23], iconAnchor: [10, 11] })

const initialState = {
  value: null
}

const selectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'selected/added':
      return { ...state, value: action.payload }
    case 'selected/removed':
      return { ...state, value: null }
    default:
      return state
  }
}

const lang = new URLSearchParams(new URL(window.location).search).get('lang') ?? navigator.language.substring(0, 2).toLocaleLowerCase()

i18n.use(initReactI18next).init({
  resources: resources,
  lng: lang,
  fallbacking: "en",
  interpolation: {
    escapeValue: false
  }
})

const store = Redux.createStore(selectedReducer)

const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)

root.render(<Provider store={store}>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="selected/:name" element={<Selected />} />
      <Route path="list" element={<List />} />
      <Route path="news" element={<News />} />
    </Routes>
  </Router>
</Provider>)