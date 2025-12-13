const Weeks = () => {
  const { t } = useTranslation()

  const currentYear = new Date()
  currentYear.setHours(0, 0, 0, 0)
  currentYear.setMonth(0)
  currentYear.setDate(1)
  currentYear.setDate(currentYear.getDate() - currentYear.getDay())
  const weeks = new Array()
  while(currentYear.getFullYear() < 2026) {
    weeks.push(currentYear.getUTCDate())
    console.log(currentYear.getUTCDate(), weeks.length)
    currentYear.setDate(currentYear.getDate() + 7)
  }

  return <>
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
          </tr>
        </thead>
        <tbody>{weeks.map(w => 
        <tr>
            <td>1</td>
            <td>{w}</td>
          </tr>
          )
        }
        </tbody>
      </table>
    </div>
  </>
}
