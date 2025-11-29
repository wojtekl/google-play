const Dashboard = () => {
  const { t } = useTranslation()
  
  const [contact, setContact] = useState()
  const [tenant, setTenant] = useState(store.getState().tenant)
  const [disabled, setDisabled] = useState(true)

  const handleEdit = () => {
    setDisabled(!disabled)
  }

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
          <button type="button" class="btn btn-sm btn-outline-secondary" onClick={handleEdit}>{disabled ? t('label_edit') : t('label_cancel')}</button>
        </div>
      </div>
    </div>
    <form>
      <fieldset disabled={disabled}>
        <legend>{t('label_contact')}</legend>
        <div class="mb-3">
          <label for="disabledTextInput" class="form-label">{t('label_description')}</label>
          <input type="text" id="disabledTextInput" class="form-control" placeholder={contact.description} />
        </div>
        <div class="mb-3">
          <label for="disabledSelect" class="form-label">{t('label_street')}</label>
          <input type="text" id="disabledSelect" class="form-control" placeholder={contact.street} />
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="disabledFieldsetCheck" disabled />
            <label class="form-check-label" for="disabledFieldsetCheck">
              Can’t check this
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </fieldset>
    </form>
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
