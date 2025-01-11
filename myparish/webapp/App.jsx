const withTranslation = ReactI18next.withTranslation


class AppInner extends React.Component {

  state = {
    selected: clients.clients.find(i => i.name === store.getState().value)
  }

  getList = () => {
    const dayOfMonth = new Date().getDate()
    const month = new Date().getMonth() + 1
    const isSunday = (0 === new Date().getDay()) || (1 === month && (1 === dayOfMonth || 6 === dayOfMonth)) || (11 === month && 1 === dayOfMonth) || (12 === month && (25 === dayOfMonth || 26 === dayOfMonth)) ? true : false

    return clients.clients.map(i => {
      let incoming = ''
      const base = new Date()
      const now = new Date()
      const schedule = isSunday ? (i.sunday ?? []) : i.week
      schedule.forEach((j, _) => {
        base.setHours(j.substring(0, 2))
        base.setMinutes(j.substring(3, 5))
        const diff = base - now
        if (diff >= -(1000 * 60 * 5) && diff < (1000 * 60 * 60)) {
          incoming = `${incoming} ${j}`
        }
      })
      return {
        name: i.name,
        latitude: i.latitude,
        longitude: i.longitude,
        live: !!i.live,
        incoming: incoming.trim()
      }
    })
  }

  render() {
    const { t } = this.props

    const { selected } = this.state

    const mapDiv = React.createElement('div', { id: "map", style: { width: "100%", height: "100%" } })

    return <>
      <Navbar expand="md">
        <Container>
          <Navbar.Brand><img src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/myparish/MyParish/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" alt="" />{t('title_app')}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {selected && <Nav.Link href={`#/selected/${selected.name}`}>{t('nav_your')}</Nav.Link>}
              <Nav.Link href="#/list">{t('nav_list')}</Nav.Link>
              <Nav.Link href="#/news">{t('nav_news')}</Nav.Link>
              <Nav.Link href="https://wlap.pl" rel="author">{t('nav_aboutus')}</Nav.Link>
              <Nav.Link href={t('url_privacy')} rel="privacy-policy">{t('nav_privacy')}</Nav.Link>
              <Nav.Link href="https://play.google.com/store/apps/details?id=github.wleap.myparish" rel="external"><Image src={t('url_get')} style={{ maxHeight: "40px" }} /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ height: "calc(100vh - 59px)" }}>{mapDiv}</Container>
    </>
  }

  componentDidMount() {
    const { t } = this.props

    const { selected } = this.state

    const map = L.map('map').setView(selected ? [selected.latitude, selected.longitude] : [52.114503, 19.423561], 9)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" rel="external">OpenStreetMap</a>'
    }).addTo(map)

    const list = this.getList()
    const inactive = L.layerGroup(list.filter(i => !i.incoming).map(i => L
      .marker([i.latitude, i.longitude], { icon: markerDefault })
      .bindPopup(`<p>${i.name}</p><p>${i.incoming}</p><a href="#/selected/${i.name}"> ${t('see_link')} </a>`))).addTo(map)
    const active = L.layerGroup(list.filter(i => !!i.incoming).map(i => L
      .marker([i.latitude, i.longitude], { icon: i.live ? markerLive : markerActive })
      .bindPopup(`<p>${i.name}</p><p>${i.incoming}</p><a href="#/selected/${i.name}"> ${t('see_link')} </a>`))).addTo(map)

    L.control.layers(null, { [t('overlay_inactive')]: inactive, [t('overlay_active')]: active }).addTo(map)

    document.title = t('title_app')
    document.getElementsByTagName('meta').description.content = t('meta_description')
    document.getElementsByTagName('meta').keywords.content = t('meta_keywords')
  }
}

const App = withTranslation()(AppInner)
