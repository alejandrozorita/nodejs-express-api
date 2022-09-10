const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middelware/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

const whiteListe = ['http://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whiteListe.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('not allowed'));
    }
  }

}
app.use(cors(options));

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
