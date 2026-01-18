const News = React.memo((props) => {
  const { t } = useTranslation()
  
  return <>
    <Navi current="news" />
    <div class="container">
      <div class="list-group">
        <a href="https://m.niedziela.pl/" rel="external" class="list-group-item list-group-item-action">Niedziela</a>
        <a href="https://www.gosc.pl/mobile" rel="external" class="list-group-item list-group-item-action">Gość Niedzielny</a>
        <a href="https://rycerzniepokalanej.pl/" rel="external" class="list-group-item list-group-item-action">Rycerz Niepokalanej</a>
        <a href="https://biblia.deon.pl/" rel="external" class="list-group-item list-group-item-action">Biblia Tysiąclecia</a>
        <a href={t('url_privacy')} rel="privacy-policy" class="list-group-item list-group-item-action">{t('nav_privacy')}</a>
        <a href="https://wlap.pl/" rel="author" class="list-group-item list-group-item-action">{t('nav_aboutus')}</a>
        <a href="https://cennik.wlap.pl/" rel="external" class="list-group-item list-group-item-action">Historia cen produktów spożywczych w marketach</a>
      </div>
    </div>
  </>
})
