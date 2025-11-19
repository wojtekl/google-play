const Dashboard = () => {
  return <>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Dashboard</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
        </div>
      </div>
    </div>
    <h2>Section Title</h2>
    <div class="table-responsive small">
      <table class="table table-stripped table-sm">
        <thead>
          <tr>
            <td>Head1</td>
            <td>Head2</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Col1</td>
            <td>Col1</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
}
