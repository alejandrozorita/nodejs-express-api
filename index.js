const express = require('express');
const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middelware/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mi server express");
})


app.get("/nueva-ruta", (req, res) => {
  res.send("nueva ruta");

})

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);


app.listen(port, () => {
  console.log("mi puertos " + port)
});
