
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

const i18n = i18next;
const initReactI18next = ReactI18next.initReactI18next;
const useTranslation = ReactI18next.useTranslation;


const lang = new URLSearchParams(new URL(window.location).search).get("lang") ?? navigator.language.substring(0, 2).toLocaleLowerCase();

i18n.use(initReactI18next).init({
  resources: resources,
  lng: lang,
  fallbacking: "en",
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