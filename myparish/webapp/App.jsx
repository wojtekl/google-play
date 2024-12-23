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
  <Navbar expand="md">
    <Container>
    <Navbar.Brand><img src="https://github.com/wojtekl/google-play/raw/refs/heads/main/myparish/MyParish/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" />{t('title_app')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#/list">{t('nav_list')}</Nav.Link>
          <Nav.Link href="#/news">{t('nav_news')}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Container style={{height: "calc(100vh - 56px)"}}>{mapDiv}</Container>
</>}

  componentDidMount() {
    const { t } = this.props

    const selected = clients.clients.find(i => i.name === store.getState().value)

    const locale = new URLSearchParams(new URL(window.location).search).get('lang') ?? navigator.language.substring(3).toLocaleLowerCase()
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const formatDay = { weekday: "long", timezone: timezone }
    const isSunday = new Date().toLocaleString(locale, formatDay) === 0 ? true : false

    const map = L.map('map').setView(selected ? [selected.latitude, selected.longitude] : [52.114503, 19.423561], 10)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    const markerRed = L.icon({ iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png", iconSize: [32, 59] })
    const markerPurple = L.icon({ iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png", iconSize: [20, 33] })
    clients.clients.forEach((i, _) => {
      let incoming = false
      const base = new Date()
      const now = new Date()
      i.week.forEach((j, _) => {
        base.setHours(j.substring(0, 2))
        base.setMinutes(j.substring(3, 5))
        const diff = base - now
        incoming = diff >= 0 && diff < (1000 * 60 * 30)
      })
      var marker = L.marker([i.latitude, i.longitude], { icon: incoming ? markerRed : markerPurple }).addTo(map);
      marker.bindPopup(`<p>${i.name}</p><a href="#/selected/${i.name}"> ${t('see_link')} </a>`);
    })
  }
}

const App = withTranslation()(AppInner)