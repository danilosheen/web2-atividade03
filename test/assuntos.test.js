test('GET /assuntos', async () => {
    const axios = require('axios');
    const response = await axios.get('https://atividade03-psweb2.herokuapp.com/assuntos');
  
    expect(response.data).toBeTruthy();
    expect(response.data.length).toBeTruthy();
  })
  
  test('GET /assuntos/id', async () => {
    const axios = require('axios');
    const response = await axios.get('https://atividade03-psweb2.herokuapp.com/assuntos/1');
  
    expect(response.data).toBeTruthy();
    expect(response.data.length).toBeTruthy();
  })