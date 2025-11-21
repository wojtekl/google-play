const Signin = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert("login")
      const form = document.querySelector('#form_submit')
      axios.post(`api/signin`, form).then((response) => navigate('/manage'))
    }
  
  return <div class="d-flex align-items-center py-4 bg-body-tertiary">
    <main class="form-signin w-100 m-auto" style={{maxWidth: '330px', padding: '1rem'}}>
    <form onSubmit={handleSubmit} id="form_submit">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="username" />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password"/>
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-check text-start my-3">
        <input class="form-check-input" type="checkbox" value="remember-me" id="checkDefault" />
        <label class="form-check-label" for="checkDefault">Remember me</label>
      </div>
      <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-body-secondary">C 2025</p>
    </form>
  </main>
  </div>
}
