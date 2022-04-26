test('GET /alunos', async () => {
  const axios = require('axios');
  const response = await axios.get('https://atividade03-psweb2.herokuapp.com/alunos');

  expect(response.data).toBeTruthy();
  expect(response.data.length).toBeTruthy();
})

test('GET /alunos/id', async () => {
  const axios = require('axios');
  const response = await axios.get('https://atividade03-psweb2.herokuapp.com/alunos/1');

  expect(response.data).toBeTruthy();
  expect(response.data.length).toBeTruthy();
})