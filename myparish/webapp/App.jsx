const withTranslation = ReactI18next.withTranslation


class AppInner extends React.Component {
  constructor(props) {
    super(props)
    
    const { t } = this.props
    document.title = t('title_myparish')

    this.state = {
    }
  }

  render() {
    return <p>Działa</p>
  }
}

const App = withTranslation()(AppInner)