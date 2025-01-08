const Provider = ReactRedux.Provider
const i18n = i18next
const initReactI18next = ReactI18next.initReactI18next
const useTranslation = ReactI18next.useTranslation

const Button = ReactBootstrap.Button
const Container = ReactBootstrap.Container
const Form = ReactBootstrap.Form
const Image = ReactBootstrap.Image


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

const state = localStorage.getItem('redux')
const initialState = !state ? {
  value: [],
  warning: true
} : JSON.parse(state)

const selectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'selected/added':
      return { ...state, value: state.value.concat([action.payload]) }
    case 'selected/removed':
      return { ...state, value: state.value.filter(i => i != action.payload) }
    case 'warning/set':
      return { ...state, warning: false }
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

const storeName = new URLSearchParams(new URL(window.location).search).get('store') ?? null

const store = Redux.createStore(selectedReducer)
store.subscribe(() => { localStorage.setItem('redux', JSON.stringify(store.getState())) })

const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)

root.render(<Provider store={store}><App /></Provider>)