const Router = ReactRouterDOM.HashRouter;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouter.Route;
const Routes = ReactRouter.Routes;

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
    <Routes>
    <Route exact path="/" component={App} />
    <Route path="/test" render={() => <p>Mój test</p>} />
    </Routes>
  </Router>
), document.getElementById('app'));