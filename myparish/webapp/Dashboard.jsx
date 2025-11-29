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
          <label for="contactDescription" class="form-label">{t('label_description')}</label>
          <input type="text" id="contactDescription" class="form-control" placeholder={contact?.description} name="description" />
        </div>
        <div class="mb-3">
          <label for="contactStreet" class="form-label">{t('label_street')}</label>
          <input type="text" id="contactStreet" class="form-control" placeholder={contact?.street} name="street" />
        </div>
        <div class="mb-3">
          <label for="contactNumber" class="form-label">{t('label_number')}</label>
          <input type="text" id="contactNumber" class="form-control" placeholder={contact?.number} name="number" />
        </div>
        <div class="mb-3">
          <label for="contactCity" class="form-label">{t('label_city')}</label>
          <input type="text" id="contactCity" class="form-control" placeholder={contact?.city} name="city" />
        </div>
        <div class="mb-3">
          <label for="contactPostalcode" class="form-label">{t('label_postalcode')}</label>
          <input type="text" id="contactPostalcode" class="form-control" placeholder={contact?.postalcode} name="postalcode" />
        </div>
        <div class="mb-3">
          <label for="contactEmail" class="form-label">{t('label_email')}</label>
          <input type="email" id="contactEmail" class="form-control" placeholder={contact?.email} name="email" />
        </div>
        <div class="mb-3">
          <label for="contactPhone" class="form-label">{t('label_phone')}</label>
          <input type="tel" id="contactPhone" class="form-control" placeholder={contact?.phone} name="phone" />
        </div>
        <button type="submit" class="btn btn-primary">{t('label_submit')}</button>
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
