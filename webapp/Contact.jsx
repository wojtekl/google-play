const Contact = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(-1);
  };

  return <Container className="marketing">
    <Row id="contact" className="featurette">
      <Col md="5">
        <Image src="https://github.com/wojtekl/google-play/blob/main/barcode.png?raw=true" />
      </Col>
      <Col md="7">
        <h2 class="featurette-heading fw-normal lh-1">{t('title_contact')}</h2>
        <p class="lead">{t('description_contact')}</p>
        <p>wleap.zhulp@slmails.com</p>
      </Col>
    </Row>
    <Button onClick={handleClick} variant="primary">{t('button_back')}</Button>
  </Container>
}