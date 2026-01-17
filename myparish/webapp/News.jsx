const News = React.memo((props) => {
  const { t } = useTranslation()
  
  //const selected = clients.clients.find(i => i.name === store.getState().value)
  
  return <>
    <Navi current="news" />
    <div class="container">
      <ListGroup>
        <ListGroup.Item action href="https://m.niedziela.pl/" rel="external">Niedziela</ListGroup.Item>
        <ListGroup.Item action href="https://www.gosc.pl/mobile" rel="external">Gość Niedzielny</ListGroup.Item>
        <ListGroup.Item action href="https://rycerzniepokalanej.pl/" rel="external">Rycerz Niepokalanej</ListGroup.Item>
        <ListGroup.Item action href="https://biblia.deon.pl/" rel="external">Biblia Tysiąclecia</ListGroup.Item>
        <ListGroup.Item action href={t('url_privacy')} rel="privacy-policy">{t('nav_privacy')}</ListGroup.Item>
        <ListGroup.Item action href="https://wlap.pl/" rel="author">{t('nav_aboutus')}</ListGroup.Item>
        <ListGroup.Item action href="https://cennik.wlap.pl/" rel="external">Historia cen produktów spożywczych w marketach</ListGroup.Item>
      </ListGroup>
    </div>
  </>
})
