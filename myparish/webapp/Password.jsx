const Password = () => {
  const handleSubmit = () => {
    const searchParams = new URLSearchParams()
    searchParams.append('code', new URLSearchParams(new URL(window.location).search).get('code'))
    searchParams.append('password', 'test')
    axios.get(`api/password?${searchParams.toString()}`).then((response) => {
      alert(response.data)
    })
  }
  
  return <div><button onClick={handleSubmit}>set</button></div>
}
