const Visit = () => {
  const { t } = useTranslation()
  const [tenant, setTenant] = useState(store.getState().tenant)
  const [donations, setDonations] = useState([])
  const [selected, setSelected] = useState()
  const [refresh, setRefresh] = useState()

  useEffect(() => {
    const searchParams = new URLSearchParams()
    searchParams.append('tenant', tenant)
    axios.get(`api/visit?${searchParams.toString()}`).then((response) => {
      setDonations(response.data)
      console.debug(response.data)
    })
  }, [])

  return <>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">{t('label_statistics')}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">{t('label_refresh')}</button>
        </div>
      </div>
    </div>
    <h2>{t('label_visit')}</h2>
    <div class="table-responsive small">
      <table class="table table-stripped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t('label_firstname')}</th>
            <th scope="col">{t('label_surname')}</th>
            <th scope="col">{t('label_street')}</th>
            <th scope="col">{t('label_number')}</th>
            <th scope="col">{t('label_city')}</th>
            <th scope="col">{t('label_donation')}</th>
            <th scope="col">{t('label_actions')}</th>
          </tr>
        </thead>
        <tbody>{ donations.map((e, i) => 
        <tr>
            <td>{i + 1}</td>
            <td>{e.firstname}</td>
            <td>{e.surname}</td>
            <td>{e.street}</td>
            <td>{e.number}</td>
            <td>{e.city}</td>
            <td>{e.donation}</td>
            <td><button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#confirmModal" onClick={() => { setSelected(e['id']) }}><i class="bi bi-trash"></i></button></td>
          </tr>
          )
        }
        </tbody>
      </table>
    </div>
    <ConfirmModal title="label_delete" onOk={() => {
      const searchParams = new URLSearchParams()
      searchParams.append('id', selected)
      axios.get(`api/visit-cd?${searchParams.toString()}`).then((response) => {
        setRefresh(true)
    })}} />
  </>
}
