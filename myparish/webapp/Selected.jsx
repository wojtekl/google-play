const Selected = React.memo(() => {
  const { name } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const translate = 'https://translate.google.com/translate?js=n&sl=pl&tl=en&u='

  const handleClick = () => {
    navigate(-1)
  }

  const handleSelect = () => {
    store.dispatch({ type: 'selected/added', payload: name })
  }

  const selected = clients.clients.find(i => i.name === name)

  const urls = 'pl' === store.getState().lang ? selected : {
    ...selected,
    schedule: `${translate}${selected.schedule}`,
    announcement: `${translate}${selected.announcement}`,
    contact: `${translate}${selected.contact}`
  }

  const saved = name === store.getState().value

  return (<>
    <Navi current="selected" />
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="javascript:;" onClick={handleClick}> {t('button_back')} </a></li>
          {selected && <li class="breadcrumb-item active" aria-current="page">{selected.name}</li>}
        </ol>
      </nav>
      {selected ? <div class="list-group">
        <a href={urls.schedule} rel="external" class="list-group-item list-group-item-action">{t('list_schedule')}</a>
        <a href={urls.announcement} rel="external" class="list-group-item list-group-item-action">{t('list_announcement')}</a>
        <a href={urls.contact} rel="external" class="list-group-item list-group-item-action">{t('list_contact')}</a>
        {selected.other && <a href={selected.other} rel="external" class="list-group-item list-group-item-action">{t('list_other')}</a>}
        {selected.live && <a href={selected.live} rel="external" class="list-group-item list-group-item-action">{t('list_live')}</a>}
        <a href={`https://www.openstreetmap.org/directions?from=&to=${selected.latitude}%2C${selected.longitude}`} rel="external" class="list-group-item list-group-item-action">{t('list_directions')}</a>
        {!saved && <a onClick={handleSelect} class="list-group-item list-group-item-action">{t('list_select')}</a>}
      </a> : <p>{t('label_missing')}</p>}
    </div>
  </>)
})
