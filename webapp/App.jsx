class App extends React.Component {
  render() {
    return (<div><Carousel>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel1.jpg" fluid />
        <Carousel.Caption>
          <h1>Aplikacje</h1>
          <p>mobilne i internetowe</p>
          <Button href="#oferta" variant="primary" size="lg">Przejdź</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel2.jpg" fluid />
        <Carousel.Caption>
          <h1>Produkty</h1>
          <p>Zobacz zrealizowane projekty.</p>
          <Button href="#produkty" variant="primary" size="lg">Przejdź</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel3.jpg" fluid />
        <Carousel.Caption>
          <h1>Kontakt</h1>
          <p>Dowiedz się jak złożyć zamówienie.</p>
          <Button href="#kontakt" variant="primary" size="lg">Przejdź</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      <Container className="marketing">
        <Row className="featurette" controlId="oferta">
          <Col md="7">
            <h2 class="featurette-heading fw-normal lh-1">Oferta</h2>
            <p class="lead">
              <ul>
                <li>Aplikacje mobilne i internetowe</li>
                <li>Rozszerzenia do Office, Chrome, Visual Studio Code itp</li>
                <li>Zabezpieczanie połączeń sieciowych</li>
                <li>Witryny internetowe</li>
                <li>Rozkłady jazdy</li>
                <li>Domowe sieci komputerowe</li>
                <li>Testowanie rozwiązań informatycznych</li>
              </ul>
            </p>
          </Col>
          <Col md="5"></Col>
        </Row>
        <hr class="featurette-divider" />
        <Row className="featurette" controlId="produkty">
          <Col lg="4">
            <Image
              src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/pricey/Pricey/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
            <h2 class="fw-normal">Pricey</h2>
            <p>Porównywarka cenowa z historią</p>
            <Button href="https://pricey.wuaze.com" variant="secondary">Uruchom</Button>
          </Col>
          <Col lg="4">
            <Image
              src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/busstop/BusStop/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
            <h2 class="fw-normal">BusStop</h2>
            <p>Rozkład jazdy autobusów z mapą</p>
            <Button href="https://play.google.com/store/apps/details?id=github.wleap.busstop" variant="secondary">Zainstaluj</Button>
          </Col>
          <Col lg="4">
            <Image
              src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/myparish/MyParish/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
            <h2 class="fw-normal">Moja Parafia</h2>
            <p>Katalog stron parafialnych z mapą</p>
            <Button href="https://play.google.com/store/apps/details?id=github.wleap.myparish" variant="secondary">Zainstaluj</Button>
          </Col>
        </Row>
        <Row className="featurette" controlId="kontakt">
          <Col md="5">
            <Image src="https://github.com/wojtekl/google-play/blob/main/barcode.png?raw=true" />
          </Col>
          <Col md="7">
            <h2 class="featurette-heading fw-normal lh-1">Kontakt</h2>
            <p class="lead">Pytania oraz zamówienia proszę kierować na adres e-mail:</p>
            <p>wleap.zhulp@slmails.com</p>
          </Col>
        </Row>
      </Container>
    </div>)
  }
}