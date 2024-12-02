const Router=ReactRouterDOM.HashRouter;
const Route=ReactRouterDOM.Route;

const initialState = {
  value: []
}

const selectedReducer = (state = this.initialState, action) => {
  switch(action.type) {
    case 'selected/added':
      return {...state, value: state.value.concat(['dodane'])};
    case 'selected/removed':
      return {...state, value: state.value.filter(i => i != 'dodane')};
    default:
      return state;
  }
}

const store = ReactRedux.createStoreHook(selectedReducer);

ReactDOM.render(<App />, document.getElementById('app'));

/*

(
<Router>
  <Route exact path="/" component={App} />
  <Route path="/listaZakupow" render={ () => <List properties={["produkt", "sklep", "cena", "dodano"]} list={[]} />} />
</Router>
)

*/
