const CurrentWeek = () => {
  const { t } = useTranslation()
  const [currentWeek, setCurrentWeek] = useState([])
  const [selected, setSelected] = useState()

  const handleSelect = () => {}
  
  useEffect(() => {
    const postData = {
      type: "msza"
    }
    axios.post('api/scheduled-week', postData, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      setCurrentWeek(response.data)
    })
  }, [])
  
  return <>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">{t('label_currentweek')}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">{t('label_edit')}</button>
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
              <td><button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => { setSelected(e['id']) }}>{t('label_edit')}</button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </>
}
