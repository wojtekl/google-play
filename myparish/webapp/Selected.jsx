const useParams = ReactRouterDOM.useParams

const Breadcrumb = ReactBootstrap.Breadcrumb


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
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item><a href="javascript:;" onClick={handleClick}> {t('button_back')} </a></Breadcrumb.Item>
        {selected && <Breadcrumb.Item active>{selected.name}</Breadcrumb.Item>}
      </Breadcrumb>
      {selected ? <ListGroup>
        <ListGroup.Item action href={urls.schedule} rel="external">{t('list_schedule')}</ListGroup.Item>
        <ListGroup.Item action href={urls.announcement} rel="external">{t('list_announcement')}</ListGroup.Item>
        <ListGroup.Item action href={urls.contact} rel="external">{t('list_contact')}</ListGroup.Item>
        {selected.other && <ListGroup.Item action href={selected.other} rel="external">{t('list_other')}</ListGroup.Item>}
        {selected.live && <ListGroup.Item action href={selected.live} rel="external">{t('list_live')}</ListGroup.Item>}
        <ListGroup.Item action href={`https://www.openstreetmap.org/directions?from=&to=${selected.latitude}%2C${selected.longitude}`} rel="external">{t('list_directions')}</ListGroup.Item>
        {!saved && <ListGroup.Item action onClick={handleSelect}>{t('list_select')}</ListGroup.Item>}
      </ListGroup> : <p>{t('label_missing')}</p>}
    </Container>
  </>)
})
