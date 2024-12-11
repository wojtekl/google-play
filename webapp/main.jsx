const Router = ReactRouterDOM.HashRouter;
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
    <Route exact path="/" component={App} />
    <Route path="/test" render={() => <p>Mój test</p>} />
  </Router>
), document.getElementById('app'));