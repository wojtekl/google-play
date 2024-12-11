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
      <Row className="featurette">
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
    </Container>
    </div>)
  }
}