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
      source: null
    }
  }

  render() {
    const { source } = this.state
    this.setState({ source: [{
      item: "Test 1",
      store: "Test 2",
      price: 4.0,
      posted: "Test 4"
    }] })

    return !source ? <Container fluid>
    <Row className="mt-3">
      <Spinner animation="border" variant="warning" role="status" />
    </Row>
  </Container> : <List properties={columns_list} list={source} />
  }
}

const App = withTranslation()(AppInner)