const Provider = ReactRedux.Provider
const i18n = i18next
const initReactI18next = ReactI18next.initReactI18next
const useTranslation = ReactI18next.useTranslation

const Button = ReactBootstrap.Button
const Container = ReactBootstrap.Container
const Form = ReactBootstrap.Form
const Image = ReactBootstrap.Image


const initialState = {
  value: []
}

const selectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'selected/added':
      return { ...state, value: state.value.concat([action.payload]) }
    case 'selected/removed':
      return { ...state, value: state.value.filter(i => i != action.payload) }
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

const itemStore = new URLSearchParams(new URL(window.location).search).get('store') ?? ''

const store = Redux.createStore(selectedReducer)

const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)

root.render(<Provider store={store}><App /></Provider>)