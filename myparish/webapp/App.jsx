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
    return <Container><div id="map"></div></Container>
  }
}

const App = withTranslation()(AppInner)