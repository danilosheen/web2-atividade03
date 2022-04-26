test('GET /encontros', async () => {
    const axios = require('axios');
    const response = await axios.get('https://atividade03-psweb2.herokuapp.com/encontros');
  
    expect(response.data).toBeTruthy();
    expect(response.data.length).toBeTruthy();
  })