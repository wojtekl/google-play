class List extends React.Component {
  render() {
    return <Container>
  <ListGroup>
    {clients.clients.map(i => <ListGroup.Item onClick={() => alert(i.name)}>{i.name}</ListGroup.Item>)}
  </ListGroup>
</Container>
  }
}