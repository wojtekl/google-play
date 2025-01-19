const Provider = ReactRedux.Provider
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
  warning: true,
  lang: navigator.language.substring(0, 2).toLocaleLowerCase()
} : JSON.parse(state)

const selectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'selected/added':
      return { ...state, value: state.value.concat([action.payload]) }
    case 'selected/removed':
      return { ...state, value: state.value.filter(i => i != action.payload) }
    case 'warning/set':
      return { ...state, warning: false }
    case 'lang/set':
      return { ...state, lang: action.payload }
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

const storeName = new URLSearchParams(new URL(window.location).search).get('store') ?? null

const store = Redux.createStore(selectedReducer)
store.subscribe(() => { localStorage.setItem('redux', JSON.stringify(store.getState())) })
store.dispatch({ type: 'lang/set', payload: lang })

const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)

root.render(<Provider store={store}><App /></Provider>)
