const Weeks = () => {
  const { t } = useTranslation()
  const [selectedWeek, setSelectedWeek] = useState()

  const months = [t('label_january'), t('label_february'), t('label_march'), t('label_april'), t('label_may'), t('label_june'), t('label_july'), t('label_august'), t('label_september'), t('label_october'), t('label_november'), t('label_december')]

  const currentYear = new Date()
  currentYear.setHours(0, 0, 0, 0)
  currentYear.setMonth(0)
  currentYear.setDate(1)
  currentYear.setDate(currentYear.getDate() - currentYear.getDay() + 2)
  
  const nextYear = new Date().getFullYear() + 1
  const weeks = new Array()
  while(currentYear.getFullYear() < nextYear) {
    weeks.push({
      start: currentYear.toISOString().split('T')[0],
      month: months[currentYear.getMonth()]
    })
    currentYear.setDate(currentYear.getDate() + 7)
  }

  return selectedWeek ? <>
    <button type="button" class="btn btn-sm btn-outline-secondary" onClick={ () => { setSelectedWeek(undefined) }}>{t('label_powrot')}</button>
    <CurrentWeek date={selectedWeek} type={'eucharystia'} />
  </> : <>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">{t('label_weeks')}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">{t('label_edit')}</button>
        </div>
      </div>
    </div>
    <h2>{t('label_section')}</h2>
    <div class="table-responsive small">
      <table class="table table-stripped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t('label_header')}</th>
            <th scope="col">{t('label_month')}</th>
            <th scope="col">{t('label_actions')}</th>
          </tr>
        </thead>
        <tbody>{weeks.map((w, i) => 
        <tr>
            <td>{i + 1}</td>
            <td><DateFormatter timestamp={w.start} /></td>
            <td>{w.month}</td>
            <td><button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => { setSelectedWeek(w.start) }}><i class="bi bi-pencil-square"></i></button></td>
          </tr>
          )
        }
        </tbody>
      </table>
    </div>
  </>
}
