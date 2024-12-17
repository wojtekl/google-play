const withTranslation = ReactI18next.withTranslation

const Spinner = ReactBootstrap.Spinner


class AppInner extends React.Component {
  constructor(props) {
    super(props)
    
    const { t } = this.props

    this.state = {
      source: (
        <Container>
          <Button variant="secondary" disabled><Spinner animation="border" size="sm" role="status" /> {t('label_loading')} </Button>
          <p>Nie widzisz cen? Kliknij <a href="https://pricey.wuaze.com" rel="noreferrer" referrerpolicy="no-referrer">tutaj</a></p>
        </Container>
      )
    }
  }

  replace = (source) => {
    this.setState({ source: source })
  }

  back = () => {
    this.setState({ source: <App /> })
  }

  componentWillMount() {
    const self = this
    const formData = new FormData()
    formData.append('lang', lang)
    const selected = new URLSearchParams(new URL(window.location).search).get('selected')
    if (selected) {
      formData.append('selected', selected)
    }
    axios.post(`items?lang=${lang}`, formData).then(function (response) {
      self.replace(<List properties={columns_list} list={response.data} expandable={true} replace={self.replace} back={self.back} />)
    })
  }

  render() {
    return this.state.source
  }
}

const App = withTranslation()(AppInner)