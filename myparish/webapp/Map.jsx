const withTranslation = ReactI18next.withTranslation


class MapInner extends React.Component {
  constructor(props) {
    super(props)

    const { t } = this.props
    document.title = t('title_app')

    this.state = {
    }
  }

  handleSee = (selected) => {
    store.dispatch({ type: 'selected/added', payload: selected })
    console.log(selected)
  }

  render() {
    const mapDiv = React.createElement('div', { id: "map", style: { width: "100%", height: "100%" } })
    return <Container fluid className="vh-100">{mapDiv}</Container>
  }

  componentDidMount() {
    const { t } = this.props

    const mapView = L.map('map').setView([52.114503, 19.423561], 10)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapView)
    clients.clients.forEach((val, index) => {
      var marker = L.marker([val.latitude, val.longitude]).addTo(mapView);
      marker.bindPopup(`<p>${val.name}</p><a href="#/selected/${val.name}"> ${t('see_link')} </a>`).openPopup();
    })
  }
}

const Map = withTranslation()(MapInner)