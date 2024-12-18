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
    const mapDiv = React.createElement('div', { id: "map", style: { width: "100%", height: "100%"} })
    return <Container>{mapDiv}</Container>
  }

  componentDidMount() {
    const map = L.map('map')
  }
}

const App = withTranslation()(AppInner)