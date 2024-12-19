const Selected = () => {
  const { name } = useParams()
  const { t } = useTranslation()

  const selected = clients.clients.find(i => i.name === name)
  return (<>
  <Navbar>
    <Container>
      <Navbar.Brand>{selected.name}</Navbar.Brand>
    </Container>
  </Navbar>
  <Container>
    <ListGroup><ListGroup.Item action href={selected.schedule}>{t('title_schedule')}</ListGroup.Item></ListGroup>
    <ListGroup><ListGroup.Item action href={selected.announcement}>{t('title_announcement')}</ListGroup.Item></ListGroup>
    <ListGroup><ListGroup.Item action href={selected.contact}>{t('title_contact')}</ListGroup.Item></ListGroup>
    <ListGroup><ListGroup.Item action href={selected.other}>{t('title_other')}</ListGroup.Item></ListGroup>
  </Container>
  </>)
}