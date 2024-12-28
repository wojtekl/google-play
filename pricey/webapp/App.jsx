const withTranslation = ReactI18next.withTranslation

const Spinner = ReactBootstrap.Spinner


class AppInner extends React.Component {
  constructor(props) {
    super(props)

    const { t } = this.props
    document.title = t('title_app')
    document.getElementsByTagName('meta').description.content = t('meta_description')
    document.getElementsByTagName('meta').keywords.content = t('meta_keywords')

    this.state = {
      source: (
        <Container fluid>
          <Row className="mt-3">
            <Spinner animation="border" variant="warning" role="status" />
          </Row>
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