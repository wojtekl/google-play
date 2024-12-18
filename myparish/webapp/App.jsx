const withTranslation = ReactI18next.withTranslation


class AppInner extends React.Component {
  constructor(props) {
    super(props)
    
    const { t } = this.props

    this.state = {
    }
  }

  render() {
    return <p>Działa</p>
  }
}

const App = withTranslation()(AppInner)