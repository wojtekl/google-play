const CurrentWeek = React.memo((props) => {
  const { t } = useTranslation()
  const { date, type } = props
  const [currentWeek, setCurrentWeek] = useState([])
  const [selected, setSelected] = useState()
  const [refresh, setRefresh] = useState(true)

  const handleSelect = (event) => {}

  const handleRefresh = () => {
    setRefresh(true)
  }

  const getTitle = () => {
    if ('eucharystia' === type) {
      if (!date) {
        return t('label_order')
      }
      else if ((new Date().toISOString().split('T')[0]) === date) {
        return t('label_current_week')
      }
      else {
        return t('label_next_week')
      }
    }
    else if ('departure' === type) {
      return t('label_departure')
    }
  }
  
  useEffect(() => {
    if (refresh) {
      const postData = {
        tenant: store.getState().tenant,
        type: type,
        today: date
      }
      axios.post('api/scheduled-week', postData, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
        setCurrentWeek(response.data)
        console.debug(response.data)
      })
      setRefresh(false)
    }
  }, [refresh])
  
  return <>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">{t('label_statistics')}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" onClick={handleRefresh}>{t('label_refresh')}</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <label for="" class="form-label">{t('label_liczba_eucharystii')}</label>
        <input type="text" class="form-control" />
      </div>
      <div class="col-sm-6">
        <label for="" class="form-label">{t('label_')}</label>
        <input type="text" class="form-control" />
      </div>
      <div class="col-sm-6">
        <label for="" class="form-label">{t('label_')}</label>
        <input type="text" class="form-control" />
      </div>
      <div class="col-sm-6">
        <label for="" class="form-label">{t('label_')}</label>
        <input type="text" class="form-control" />
      </div>
    </div>
    <h2>{getTitle()}</h2>
    <div class="table-responsive small">
      <table class="table table-stripped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t('label_date')}</th>
            <th scope="col">{t('label_description')}</th>
            <th scope="col">{t('label_donation')}</th>
            <th scope="col">{t('label_notes')}</th>
            <th scope="col">{t('label_actions')}</th>
          </tr>
        </thead>
        <tbody>
          {currentWeek.map((e, i) => {
            return <tr>
              <td>{i + 1}</td>
              <td><DateFormatter timestamp={e['scheduled']} /></td>
              <td>{e['description']}</td>
              <td><NumberFormatter value={e['value']} /></td>
              <td>{e['notes']}</td>
              <td>
                <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editScheduledModal" onClick={ () => { setSelected(e['id']) } }><i class="bi bi-pencil-square"></i></button>
                <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#confirmModal" onClick={ () => { setSelected(e['id']) } }><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
    <Modal modalId="editScheduledModal" itemId={selected} type={type} />
    <ConfirmModal title="label_delete" onOk={() => {
      const searchParams = new URLSearchParams()
      searchParams.append('id', selected)
      axios.get(`api/scheduled-cd?${searchParams.toString()}`).then((response) => {
        handleRefresh()
    })}} />
  </>
})
