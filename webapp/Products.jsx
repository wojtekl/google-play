const Products = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return <Container className="marketing">
    <Row id="products" className="featurette">
      <Col lg="4">
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/pricey/Pricey/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
        <h2 class="fw-normal">Pricey</h2>
        <p>Porównywarka cenowa z historią</p>
        <Button href="https://pricey.wuaze.com" variant="secondary">Uruchom</Button>
      </Col>
      <Col lg="4">
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/busstop/BusStop/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
        <h2 class="fw-normal">BusStop</h2>
        <p>Rozkład jazdy autobusów z mapą</p>
        <Button href="https://play.google.com/store/apps/details?id=github.wleap.busstop" variant="secondary">Zainstaluj</Button>
      </Col>
      <Col lg="4">
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/myparish/MyParish/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
        <h2 class="fw-normal">Moja Parafia</h2>
        <p>Katalog stron parafialnych z mapą</p>
        <Button href="https://play.google.com/store/apps/details?id=github.wleap.myparish" variant="secondary">Zainstaluj</Button>
      </Col>
    </Row>
    <Button onClick={handleClick} variant="primary">Powrót</Button>
  </Container>
}