const fetch = require('node-fetch')

async function assertFn() {
  const a = await fetch('http://localhost:8081', {
    method: 'POST', body: JSON.stringify({
      action: 'REGISTRATION',
      username: 'test',
      password: 'test'
    })
  }).then(res => res.text())
  console.log(a)
}


assertFn()