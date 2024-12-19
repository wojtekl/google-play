class Selected extends React.Component {
  render() {
    const name = new URLSearchParams(new URL(window.location).hash).get('name')
    return (<p>{name}</p>)
  }
}