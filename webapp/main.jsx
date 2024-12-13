import i18n from 'i18next';
const initReactI18next = ReactI18Next.initReactI18next;

const Router = ReactRouterDOM.HashRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;
const useNavigate = ReactRouterDOM.useNavigate;
const NavLink = ReactRouterDOM.NavLink;

const Button = ReactBootstrap.Button;
const Carousel = ReactBootstrap.Carousel;
const Col = ReactBootstrap.Col;
const Container = ReactBootstrap.Container;
const Image = ReactBootstrap.Image;
const ListGroup = ReactBootstrap.ListGroup;
const Row = ReactBootstrap.Row;

i18n.use(initReactI18next).init({
  resources: {
    pl: {
      translation: {
        "pow": "wojtek hej"
      }
    }
  },
  lng: "pl",
  fallbacking: "pl",
  interpolation: {
    escapeValue: false
  }
})

ReactDOM.render((
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="offer" element={<Offer />} />
      <Route path="products" element={<Products />} />
      <Route path="contact" element={<Contact />} />
    </Routes>
  </Router>
), document.getElementById('app'));