const Selected = () => {
  const { name } = useParams()
  const { t } = useTranslation()

  const selected = clients.clients.find(i => i.name === name)

  return (<>
  <Navbar expand="lg">
    <Container>
      <Navbar.Brand>{selected.name}</Navbar.Brand>
    </Container>
  </Navbar>
  <Container>
    <ListGroup>
      <ListGroup.Item action href={selected.schedule}>{t('list_schedule')}</ListGroup.Item>
      <ListGroup.Item action href={selected.announcement}>{t('list_announcement')}</ListGroup.Item>
      <ListGroup.Item action href={selected.contact}>{t('list_contact')}</ListGroup.Item>
      {selected.other && <ListGroup.Item action href={selected.other}>{t('list_other')}</ListGroup.Item>}
      {selected.live && <ListGroup.Item action href={selected.live}>{t('list_live')}</ListGroup.Item>}
    </ListGroup>
  </Container>
</>)
}