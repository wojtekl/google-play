const Spinner = ReactBootstrap.Spinner


const App = React.memo(() => {
  const { t } = useTranslation()
  
  const [source, setSource] = React.useState(<Container fluid>
    <Row className="mt-3">
      <Spinner animation="border" variant="warning" role="status" />
    </Row>
  </Container>)
  const [warning, setWarning] = React.useState(store.getState().warning)

  const handleReplace = (source) => {
    setSource(source)
  }

  const handleBack = () => {
    setSource(<App />)
  }

  const handleGotit = () => {
    setWarning(false)
    store.dispatch({ type: 'warning/set' })
  }

  useEffect(() => {
    const searchParams = new URLSearchParams()
    searchParams.append('lang', store.getState().lang)
    const selected = new URLSearchParams(new URL(window.location).search).get('selected')
    if (selected) {
      searchParams.append('selected', selected)
    }
    const parent = this
    axios.get(`items?${searchParams.toString()}`).then(function (response) {
      handleReplace(<List properties={columns_list} list={response.data} expandable={true} replace={handleReplace} back={handleBack} />)
    })

    document.title = t('title_app')
    document.getElementsByTagName('meta').description.content = t('meta_description')
    document.getElementsByTagName('meta').keywords.content = t('meta_keywords')
  }, [store])

  return !warning ? source : <div class="px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold"></h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead m-4">{t('message_warning')}</p>
      <div class="d-grip gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" class="btn btn-primary btn-lg px-4 gap-3" onClick={handleGotit}>{t('button_gotit')}</button>
      </div>
    </div>
  </div>
})
