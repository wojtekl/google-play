const Selected = () => {
  const { name } = useParams()
  const selected = clients.clients.find(i => i.name === name)
  return (<a href={selected.schedule}>{selected.name}</a>)
}