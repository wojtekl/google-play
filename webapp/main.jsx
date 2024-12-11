const Router = ReactRouterDOM.HashRouter;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;

const Button = ReactBootstrap.Button;
const Carousel = ReactBootstrap.Carousel;
const Col = ReactBootstrap.Col;
const Container = ReactBootstrap.Container;
const Image = ReactBootstrap.Image;
const ListGroup = ReactBootstrap.ListGroup;
const Row = ReactBootstrap.Row;

//ReactDOM.render(<App />, document.getElementById('app'));

ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/test">
        <p>Mój test</p>
      </Route>
    </Switch>
  </Router>
), document.getElementById('app'));