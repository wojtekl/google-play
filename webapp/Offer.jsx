const Offer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(-1);
  };

  return <Container className="marketing">
    <Row id="offer" className="featurette">
      <Col md="7">
        <h2 class="featurette-heading fw-normal lh-1">Oferta</h2>
        <p class="lead">
          <ListGroup>
            <ListGroup.Item>Aplikacje mobilne i internetowe {t('pow')}</ListGroup.Item>
            <ListGroup.Item variant="primary">Rozszerzenia do Office, Chrome, Visual Studio Code itp</ListGroup.Item>
            <ListGroup.Item variant="secondary">Zabezpieczanie połączeń sieciowych</ListGroup.Item>
            <ListGroup.Item variant="success">Witryny internetowe</ListGroup.Item>
            <ListGroup.Item variant="danger">Rozkłady jazdy</ListGroup.Item>
            <ListGroup.Item variant="warning">Domowe sieci komputerowe</ListGroup.Item>
            <ListGroup.Item variant="info">Testowanie rozwiązań informatycznych</ListGroup.Item>
          </ListGroup>
        </p>
      </Col>
      <Col md="5"></Col>
    </Row>
    <Button onClick={handleClick} variant="primary">Powrót</Button>
  </Container>
}