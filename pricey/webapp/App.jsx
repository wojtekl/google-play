const withTranslation = ReactI18next.withTranslation

const Spinner = ReactBootstrap.Spinner


class AppInner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      warning: store.getState().warning
    }
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

  handleGotit = () => {
    this.setState({ warning: false })
    store.dispatch({ type: 'warning/set' })
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
    const { warning } = this.state
    return !warning ? this.state.source : <>
  <div class="alert alert-warning" role="alert">{t('message_warning')}</div>
  <button type="button" class="btn btn-primary" onClick={this.handleGotit}>{t('button_gotit')}</button>
</>
  }
}

const App = withTranslation()(AppInner)