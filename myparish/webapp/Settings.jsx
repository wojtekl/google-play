const Settings = () => {
  const { t } = useTranslation()

  const [tenant, setTenant] = useState(store.getState().tenant)
  const [settings, setSettings] = useState()
  const [disabled, setDisabled] = useState(true)

  const handleDisabled = () => {
    setDisabled(!disabled)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    //const form = document.querySelector(`#form_settings`)
    const form = {
      schedule: document.getElementById('settingsSchedule').value,
      showVisits: document.getElementById('settingsShowVisits').checked ? 1 : 0,
      showBooking: document.getElementById('settingsShowBooking').checked ? 1 : 0
    }
    axios.post('api/settings', form, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      console.debug(response.data)
    })
    
    return false
  }

  useEffect(() => {
    const searchParams = new URLSearchParams()
    searchParams.append('tenant', tenant)
    axios.get(`api/settings?${searchParams.toString()}`).then((response) => {
      setSettings(response.data)
      document.getElementById('settingsSchedule').value = response.data.schedule
      document.getElementById('settingsShowVisits').checked = 0 == response.data.showVisits ? false : true
      document.getElementById('settingsShowBooking').checked = 0 == response.data.showBooking ? false : true
    })
  }, [tenant])

  return <>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">{t('label_settings')}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" onClick={handleDisabled}>{ disabled ? <i class="bi bi-unlock"></i> : <i class="bi bi-lock"></i> }</button>
        </div>
      </div>
    </div>
    <form id="form_settings" enctype="multipart/form-data">
      <fieldset disabled={disabled}>
        <legend>{t('label_settings')}</legend>
        <div class="mb-3">
          <label for="settingsSchedule" class="form-label">{t('label_schedule')}</label>
          <textarea id="settingsSchedule" class="form-control" rows="4" name="schedule" />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="settingsShowVisits" name="showVisits" />
          <label class="form-check-label" for="settingsShowVisits">{t('label_show_visit')}</label>
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="settingsShowBooking" name="showBooking" />
          <label class="form-check-label" for="settingsShowBooking">{t('label_show_booking')}</label>
        </div>
        {!disabled && <button type="submit" class="btn btn-primary" onClick={handleSubmit}>{t('label_submit')}</button>}
      </fieldset>
    </form>
  </>
}
