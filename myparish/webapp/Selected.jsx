class Selected extends React.Component {
  render() {
    const name = new URLSearchParams(new URL(window.location).search).get('name')
    return (<p>{name}</p>)
  }
}