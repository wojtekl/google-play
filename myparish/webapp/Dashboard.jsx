const Dashboard = () => {
  const { t } = useTranslation()
  
  const [contact, setContact] = useState()
  const [tenant, setTenant] = useState(store.getState().tenant)

  useEffect(() => {
    const searchParams = new URLSearchParams()
    searchParams.append('tenant', tenant)
    axios.get(`api/contact?${searchParams.toString()}`).then((response) => {
      setContact(response.data)
    })
  }, [tenant])
  
  return <>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">{t('label_dashboard')}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">{t('label_edit')}</button>
        </div>
      </div>
    </div>
    <div>{contact?.description}</div>
    <h2>{t('label_section')}</h2>
    <div class="table-responsive small">
      <table class="table table-stripped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t('label_header')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>value</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
}
