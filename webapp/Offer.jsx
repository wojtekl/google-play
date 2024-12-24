const Offer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(-1);
  };

  return <Container className="marketing">
    <Row id="offer" className="featurette pb-2">
      <Col md="7">
        <h2 class="featurette-heading fw-normal lh-1">{t('title_offer')}</h2>
        <p class="lead">
          <ListGroup>
            <ListGroup.Item>{t('item_offer1')}</ListGroup.Item>
            <ListGroup.Item variant="primary">{t('item_offer2')}</ListGroup.Item>
            <ListGroup.Item variant="secondary">{t('item_offer3')}</ListGroup.Item>
            <ListGroup.Item variant="success">{t('item_offer4')}</ListGroup.Item>
            <ListGroup.Item variant="danger">{t('item_offer5')}</ListGroup.Item>
            <ListGroup.Item variant="warning">{t('item_offer6')}</ListGroup.Item>
            <ListGroup.Item variant="info">{t('item_offer7')}</ListGroup.Item>
          </ListGroup>
        </p>
      </Col>
      <Col md="5"></Col>
    </Row>
    <Button onClick={handleClick} variant="primary">{t('button_back')}</Button>
  </Container>
}