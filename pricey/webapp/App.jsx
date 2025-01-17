const withTranslation = ReactI18next.withTranslation

const Spinner = ReactBootstrap.Spinner


class AppInner extends React.Component {

  state = {
    source: (
      <Container fluid>
        <Row className="mt-3">
          <Spinner animation="border" variant="warning" role="status" />
        </Row>
      </Container>
    ),
    warning: store.getState().warning
  }

  handleReplace = (source) => {
    this.setState({ source: source })
  }

  handleBack = () => {
    this.setState({ source: <App /> })
  }

  handleGotit = () => {
    this.setState({ warning: false })
    store.dispatch({ type: 'warning/set' })
  }

  componentDidMount() {
    const formData = new FormData()
    formData.append('lang', lang)
    const selected = new URLSearchParams(new URL(window.location).search).get('selected')
    const searchParams = new URLSearchParams()
    searchParams.append('lang', lang)
    if (selected) {
      formData.append('selected', selected)
      searchParams.append('selected', selected)
    }
    const parent = this
    axios.get(`items?${searchParams.toString()}`).then(function (response) {
      parent.handleReplace(<List properties={columns_list} list={response.data} expandable={true} replace={parent.handleReplace} back={parent.handleBack} />)
    })

    const { t } = this.props
    document.title = t('title_app')
    document.getElementsByTagName('meta').description.content = t('meta_description')
    document.getElementsByTagName('meta').keywords.content = t('meta_keywords')
  }

  render() {
    const { t } = this.props
    const { warning, source } = this.state
    return !warning ? source : <>
      <div class="alert alert-warning" role="alert">{t('message_warning')}</div>
      <button type="button" class="btn btn-primary" onClick={this.handleGotit}>{t('button_gotit')}</button>
    </>
  }
}

const App = withTranslation()(AppInner)