const useEffect = React.useEffect
const useState = React.useState
const Router = ReactRouterDOM.HashRouter
const Routes = ReactRouterDOM.Routes
const Route = ReactRouterDOM.Route
const useNavigate = ReactRouterDOM.useNavigate
const useParams = ReactRouterDOM.useParams
const Provider = ReactRedux.Provider
const initReactI18next = ReactI18next.initReactI18next
const useTranslation = ReactI18next.useTranslation

const ListGroup = ReactBootstrap.ListGroup


let installPrompt = null;
window.addEventListener("beforeinstallprompt", (event) => {
  installPrompt = event;
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://raw.githubusercontent.com/wojtekl/google-play/main/myparish/webapp/sw.js')
}

const state = localStorage.getItem('redux')
const initialState = !state ? {
  value: null,
  lang: navigator.language.substring(0, 2).toLocaleLowerCase(),
  tenant: null
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

const store = Redux.createStore(selectedReducer)
store.subscribe(() => { localStorage.setItem('redux', JSON.stringify(store.getState())) })

const lang = new URLSearchParams(new URL(window.location).search).get('lang') ?? initialState.lang
i18next.use(initReactI18next).init({
  resources: resources,
  lng: lang,
  fallbacking: "pl",
  interpolation: {
    escapeValue: false
  }
})
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
      <Route path="password" element={<Password />} />
      <Route path=":tenant" element={<Reader />} />
    </Routes>
  </Router>
</Provider>)
