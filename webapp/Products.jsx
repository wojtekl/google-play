const Products = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(-1);
  };

  return <Container className="marketing">
    <Row id="products" className="featurette pb-2">
      <Col lg="4">
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/pricey/Pricey/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
        <h2 class="fw-normal">{t('name_pricey')}</h2>
        <p>{t('description_pricey')}</p>
        <Button href="https://pricey.wlap.pl" variant="secondary">{t('button_see')}</Button>
      </Col>
      <Col lg="4">
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/busstop/BusStop/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
        <h2 class="fw-normal">{t('name_busstop')}</h2>
        <p>{t('description_busstop')}</p>
        <Button href="https://play.google.com/store/apps/details?id=github.wleap.busstop" variant="secondary">{t('button_see')}</Button>
      </Col>
      <Col lg="4">
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/myparish/MyParish/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
        <h2 class="fw-normal">{t('name_myparish')}</h2>
        <p>{t('description_myparish')}</p>
        <Button href="https://parafia.wlap.pl" variant="secondary">{t('button_see')}</Button>
      </Col>
    </Row>
    <Button onClick={handleClick} variant="primary">{t('button_back')}</Button>
  </Container>
}