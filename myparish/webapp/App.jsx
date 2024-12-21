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

    const locale = new URLSearchParams(new URL(window.location).search).get('lang') ?? navigator.language.substring(3).toLocaleLowerCase()
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const formatTime = { hour: "numeric", minute: "numeric", timezone: timezone }
    const time = new Date().toLocaleString(locale, formatTime)
    const formatDay = { weekday: "numeric", timezone: timezone }
    const isSunday = new Date().toLocaleString(locale, formatDay) === 0 ? true : false
    console.log(time, isSunday)

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

    const map = L.map('map').setView(selected ? [selected.latitude, selected.longitude] : [52.114503, 19.423561], 10)
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