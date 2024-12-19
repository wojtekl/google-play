class Selected extends React.Component {
  render() {
    const { name } = useParams()
    const selected = clients.clients.find(i => i.name === name)
    return (<a href={selected.schedule}>{selected.name}</a>)
  }
}