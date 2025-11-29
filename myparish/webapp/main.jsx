const Router = ReactRouterDOM.HashRouter
const Routes = ReactRouterDOM.Routes
const Route = ReactRouterDOM.Route
const useNavigate = ReactRouterDOM.useNavigate
const Provider = ReactRedux.Provider
const initReactI18next = ReactI18next.initReactI18next
const useTranslation = ReactI18next.useTranslation

const Container = ReactBootstrap.Container
const Image = ReactBootstrap.Image
const ListGroup = ReactBootstrap.ListGroup
const Navbar = ReactBootstrap.Navbar
const Nav = ReactBootstrap.Nav
const Offcanvas = ReactBootstrap.Offcanvas


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

const markerDefault = L.divIcon({ html: '<i class="bi bi-geo-alt-fill" style="font-size: 20px" aria-label="Marker default"></i>', className: "markerDefault", size: [20, 23], iconAnchor: [10, 11] })
const markerLive = L.divIcon({ html: '<i class="bi bi-geo-alt-fill" style="font-size: 20px; color: red" aria-label="Marker live"></i>', className: "markerLive", size: [20, 23], iconAnchor: [10, 11] })
const markerActive = L.divIcon({ html: '<i class="bi bi-geo-alt-fill" style="font-size: 20px; color: blue" aria-label="Marker active"></i>', className: "markerActive", size: [20, 23], iconAnchor: [10, 11] })

const state = localStorage.getItem('redux')
const initialState = !state ? {
  value: null,
  lang: navigator.language.substring(0, 2).toLocaleLowerCase(),
  tenant: 'demo'
} : JSON.parse(state)

const selectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'selected/added':
      return { ...state, value: action.payload }
    case 'selected/removed':
      return { ...state, value: null }
    case 'lang/set':
      return { ...state, lang: action.payload }
    case 'tenant/set':
      return { ...state, tenant: action.payload }
    default:
      return state
  }
}

const lang = new URLSearchParams(new URL(window.location).search).get('lang') ?? initialState.lang ?? navigator.language.substring(0, 2).toLocaleLowerCase()
i18next.use(initReactI18next).init({
  resources: resources,
  lng: lang,
  fallbacking: "pl",
  interpolation: {
    escapeValue: false
  }
})

const store = Redux.createStore(selectedReducer)
store.subscribe(() => { localStorage.setItem('redux', JSON.stringify(store.getState())) })
store.dispatch({ type: 'lang/set', payload: lang })

const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)

root.render(<Provider store={store}>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="selected/:name" element={<Selected />} />
      <Route path="list" element={<List />} />
      <Route path="news" element={<News />} />
      <Route path="manage" element={<Manage />} />
      <Route path="signin" element={<Signin />} />
      <Route path=":tenant" element={<Reader />} />
      <Route path="password" element={<Password />} />
    </Routes>
  </Router>
</Provider>)
