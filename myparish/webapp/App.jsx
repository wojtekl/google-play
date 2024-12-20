const withTranslation = ReactI18next.withTranslation


class AppInner extends React.Component {
  constructor(props) {
    super(props)

    const { t } = this.props
    document.title = t('title_app')

    this.state = {
    }
  }

  render() {
    const { t } = this.props

    const mapDiv = React.createElement('div', { id: "map", style: { width: "100%", height: "100%" } })

    return <>
  <Navbar>
    <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#list">{t('nav_list')}</Nav.Link>
          <Nav.Link href="#news">{t('nav_news')}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Container fluid style={{height: "calc(100vh - 56px)"}}>{mapDiv}</Container>
</>
  }

  componentDidMount() {
    const { t } = this.props

    const map = L.map('map').setView([52.114503, 19.423561], 10)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    clients.clients.forEach((item, index) => {
      var marker = L.marker([item.latitude, item.longitude]).addTo(map);
      marker.bindPopup(`<p>${item.name}</p><a href="#/selected/${item.name}"> ${t('see_link')} </a>`);
    })
  }
}

const App = withTranslation()(AppInner)