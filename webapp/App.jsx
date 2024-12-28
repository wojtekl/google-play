const withTranslation = ReactI18next.withTranslation;

class AppInner extends React.Component {
  render() {
    const { t } = this.props

    return <div>
      <Navbar.Collapse id="basic-navbar-nav">
    <Container>Teeest</Container>
  </Navbar.Collapse>
  <div class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </div>
  </div>
    </div>
  }
}

const App = withTranslation()(AppInner)