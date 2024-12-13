const Provider = ReactRedux.Provider;

const Breadcrumb = ReactBootstrap.Breadcrumb;
const Button = ReactBootstrap.Button;
const Container = ReactBootstrap.Container;
const Form = ReactBootstrap.Form;
const Nav = ReactBootstrap.Nav;
const Row = ReactBootstrap.Row;
const Spinner = ReactBootstrap.Spinner;
const Table = ReactBootstrap.Table;


const initialState = {
  value: []
}

const selectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'selected/added':
      return { ...state, value: state.value.concat([action.payload]) };
    case 'selected/removed':
      return { ...state, value: state.value.filter(i => i != action.payload) };
    default:
      return state;
  }
}

const store = Redux.createStore(selectedReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));