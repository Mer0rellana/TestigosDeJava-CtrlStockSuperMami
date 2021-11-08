const obj = {};
if (document.cookie) {
  document.cookie.split(';').forEach(e => {
    const key = e.split('=')[0].trim();
    const val = e.split('=')[1].trim();
    obj[key] = val;
  });
}

if (!document.cookie || !obj.token) {
  window.location='../login/login.html'
}

function consultarFuncionDeToken() {
  axios({
    url: 'http://localhost:3000/batch/',
    method: 'get',
    headers: { Authorization: `Bearer ${obj.token}` },
  })
    .catch((error) => {
      console.log(error)
      if (error.response && error.response.status===401) {
        window.location='../login/login.html'
      }
    })
}

consultarFuncionDeToken() 