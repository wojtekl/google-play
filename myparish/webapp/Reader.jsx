const useParams = ReactRouterDOM.useParams
const useEffect = React.useEffect

const Reader = () => {
  const { t } = useTranslation()
  const { tenant } = useParams()
  const [currentWeek, setCurrentWeek] = useState([])

  useEffect(() => {
    const postData = {
      type: "msza"
    }
    axios.post('api/scheduled-week', postData, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      setCurrentWeek(response.data)
    })
  }, [tenant])

  return <>
    <h2>{`${t('label_tenant')}: ${tenant}`}</h2>
    <div class="table-responsive small">
      <table class="table table-stripped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t('label_description')}</th>
            <th scope="col">{t('label_scheduled')}</th>
            <th scope="col">{t('label_value')}</th>
            <th scope="col">{t('label_notes')}</th>
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
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </>
}
