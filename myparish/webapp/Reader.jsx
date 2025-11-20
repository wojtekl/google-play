const useEffect = React.useEffect
const useParams = ReactRouterDOM.useParams

const Reader = () => {
  const { t } = useTranslation()
  const [scheduledWeek, setScheduledWeek] = useState([])

  const { name } = useParams()
  useEffect(() => {
      const postData = {
        type: "msza",
        tenant: name
      }
      axios.post(`api/scheduled-week`, postData).then((response) => setScheduledWeek(response.data))
    }, [])
  
  return <div class="table-responsive small">
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
}
