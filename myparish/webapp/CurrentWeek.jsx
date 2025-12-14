const CurrentWeek = (props) => {
  const { t } = useTranslation()
  const { date, type } = props
  const [currentWeek, setCurrentWeek] = useState([])
  const [selected, setSelected] = useState()
  const [refresh, setRefresh] = useState()
  const [disabled, setDisabled] = useState(true)

  const handleSelect = () => {}

  const handleDisabled = () => {
    setDisabled(!disabled)
  }
  
  useEffect(() => {

    const postData = {
      tenant: store.getState().tenant,
      type: type,
      today: date
    }
    axios.post('api/scheduled-week', postData, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      setCurrentWeek(response.data)
    })
  }, [refresh])
  
  return <>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">{t('label_currentweek')}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" onClick={handleDisabled}>{disabled ? <i class="bi bi-unlock"></i> : <i class="bi bi-lock"></i>}</button>
        </div>
      </div>
    </div>
    <h2>{t('label_currentweek')}</h2>
    <div class="table-responsive small">
      <table class="table table-stripped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t('label_description')}</th>
            <th scope="col">{t('label_scheduled')}</th>
            <th scope="col">{t('label_value')}</th>
            <th scope="col">{t('label_notes')}</th>
            <th scope="col">{t('label_actions')}</th>
          </tr>
        </thead>
        <tbody>
          {currentWeek.map((e, i) => {
            return <tr>
              <td>{i}</td>
              <td>{e['description']}</td>
              <td><DateFormatter timestamp={e['scheduled']} /></td>
              <td><NumberFormatter value={e['value']} /></td>
              <td>{e['notes']}</td>
              <td><button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editScheduledModal" onClick={() => { setSelected(e['id']) }}><i class="bi bi-pencil-square"></i></button></td>
              <td><button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#confirmModal" onClick={() => { setSelected(e['id']) }}><i class="bi bi-trash"></i></button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
    <Modal modalId="editScheduledModal" itemId={selected} type="eucharystia" />
    <ConfirmModal onOk={() => {
      const searchParams = new URLSearchParams()
      searchParams.append('id', selected)
      axios.get(`api/scheduled-cd?${searchParams.toString()}`).then((response) => {
        setRefresh(true)
    })}} />
  </>
}
