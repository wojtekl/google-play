const Router=ReactRouterDOM.HashRouter;
const Route=ReactRouterDOM.Route;

const initialState = {
  value: []
}

const selectedReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'selected/added':
      return {...state, value: state.value.concat([action.payload])};
    case 'selected/removed':
      return {...state, value: state.value.filter(i => i != action.payload)};
    default:
      return state;
  }
}

const store = Redux.createStore(selectedReducer);

ReactDOM.render(<ReactRedux.Provider store={store}><App /></ReactRedux.Provider>, document.getElementById('app'));

/*

(
<Router>
  <Route exact path="/" component={App} />
  <Route path="/listaZakupow" render={ () => <List properties={["produkt", "sklep", "cena", "dodano"]} list={[]} />} />
</Router>
)

*/
