require('./shared/logs');

const app = require('./core');

const port = parseInt(process.env.PORT);

app.listen(port, function () {
  console.log(`Exec in: http://localhost:${port}`);
});
