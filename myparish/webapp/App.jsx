const withTranslation = ReactI18next.withTranslation


class AppInner extends React.Component {
  constructor(props) {
    super(props)

    const { t } = this.props
    document.title = t('title_app')

    this.state = {
      active: false,
      filtered: this.getList()
    }
  }

  getList = () => {
    const locale = new URLSearchParams(new URL(window.location).search).get('lang') ?? navigator.language.substring(3).toLocaleLowerCase()
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const formatDay = { weekday: "long", timezone: timezone }
    const isSunday = new Date().toLocaleString(locale, formatDay) === 0 ? true : false

    return clients.clients.map(i => {
      let incoming = ''
      const base = new Date()
      const now = new Date()
      const schedule = isSunday ? i.sunday : i.week
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
  })}

  handleSwitchActive = (event) => {
    this.setState({
      active: !this.state.active,
      filtered: !this.state.active ? this.getList().filter(i => !!i.incoming) : this.state.filtered
    })
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
        <form class="form-inline my-2">
        <div class="form-check form-switch">
          <input type="checkbox" class="form-check-input" id="switchActive" onChange={this.handleSwitchActive} />
          <label class="form-check-label" for="switchActive">{t('label_active')}</label>
        </div>
      </form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Container style={{height: "calc(100vh - 59px)"}}>{mapDiv}</Container>
</>}

  componentDidUpdate() {
    console.log('did update')
    const { t } = this.props

    const selected = clients.clients.find(i => i.name === store.getState().value)

    const map = L.map('map').setView(selected ? [selected.latitude, selected.longitude] : [52.114503, 19.423561], 9)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    this.state.filtered.forEach((i, _) => {
      var marker = L.marker([i.latitude, i.longitude], { icon: !!i.incoming ? (i.live ? markerLive : markerActive) : markerDefault }).addTo(map);
      marker.bindPopup(`<p>${i.name}</p><p>${i.incoming}</p><a href="#/selected/${i.name}"> ${t('see_link')} </a>`);
    })
  }

  componentDidMount() {
    console.log('did mount')
    const { t } = this.props

    const selected = clients.clients.find(i => i.name === store.getState().value)

    const map = L.map('map').setView(selected ? [selected.latitude, selected.longitude] : [52.114503, 19.423561], 9)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    this.state.filtered.forEach((i, _) => {
      var marker = L.marker([i.latitude, i.longitude], { icon: !!i.incoming ? (i.live ? markerLive : markerActive) : markerDefault }).addTo(map);
      marker.bindPopup(`<p>${i.name}</p><p>${i.incoming}</p><a href="#/selected/${i.name}"> ${t('see_link')} </a>`);
    })
  }
}

const App = withTranslation()(AppInner)