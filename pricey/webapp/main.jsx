const Provider = ReactRedux.Provider

const Badge = ReactBotstrap.Badge
const Breadcrumb = ReactBotstrap.Breadcrumb
const Button = ReactBotstrap.Button
const Container = ReactBotstrap.Container
const Form = ReactBotstrap.Form
const BModal = ReactBotstrap.Modal
const Nav = ReactBotstrap.Nav
const Row = ReactBotstrap.Row
const Spinner = ReactBotstrap.Spinner
const Table = ReactBotstrap.Table


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

const store = Redux.createStore(selectedReducer)

const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)

root.render(<Provider store={store}><App /></Provider>)