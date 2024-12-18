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
    const mapDiv = React.createElement('div', { id: "map", style: { width: "100%", height: "300px"} })
    return <Container fluid>{mapDiv}</Container>
  }

  componentDidMount() {
    const map = L.map('map').setView([51.505, 20.09], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
  }
}

const App = withTranslation()(AppInner)