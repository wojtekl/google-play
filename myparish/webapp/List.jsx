class List extends React.Component {
  render() {
    return <ListGroup>{clients.clients.map(i => <ListGroup.Item onClick={alert(i.name)}>{i.name}</ListGroup.Item>)}</ListGroup>
  }
}