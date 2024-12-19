class Selected extends React.Component {
  render() {
    const name = new URLSearchParams(new URL(window.location).hash).get('name')
    const selected = clients.clients.find(i => i.name === name)
    return (<a href={selected.schedule}>{selected.name}</a>)
  }
}