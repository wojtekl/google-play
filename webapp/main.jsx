const Router = ReactRouterDOM.HashRouter;
const Route = ReactRouterDOM.Route;
const Routes = ReactRouterDOM.Routes;

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
      <Route path="/" element={<App />} />
      <Route path="/test" element={<p>Mój test dwa</p>} />
    </Routes>
  </Router>
), document.getElementById('app'));