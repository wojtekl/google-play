const useEffect = React.useEffect

const Tab2 = () => {
  const { t } = useTranslation()
  const [scheduledWeek, setScheduledWeek] = useState([])
  
  useEffect(() => {
      const postData = {
        type: "msza",
        tenant: "test"
      }
      axios.post(`api/scheduled`, postData).then((response) => setScheduledWeek(response.data))
    }, [])
  
  return <>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">{t('label_scheduled')}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">{t('label_edit')}</button>
        </div>
      </div>
    </div>
    <h2>{t('label_week')}</h2>
    <div class="table-responsive small">
      <table class="table table-stripped table-sm">
        <thead>
          <tr>
            <td>{t('label_description')}</td>
            <td>{t('label_scheduled')}</td>
            <td>{t('label_value')}</td>
            <td>{t('label_notes')}</td>
          </tr>
        </thead>
        <tbody>
          {scheduledWeek.map(s => {
            return <tr>
              <td>{s['description']}</td>
              <td>{s['scheduled']}</td>
              <td>{s['value']}</td>
              <td>{s['notes']}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </>
}
