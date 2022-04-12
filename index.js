const express = require('express');

const app = express();

const routerUse = require('./routes/userRouter');
const routerLogin = require('./routes/loginRouter');

app.use(express.json());

app.use('/user', routerUse);
app.use('/login', routerLogin);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
