const app = require('./app');

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Reservation Service rodando na porta ${PORT}`);
});