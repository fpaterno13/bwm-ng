//se referencia a los paquetes instalados
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');

//se crea la conexion con la BD y hace el insert 
mongoose.connect(config.DB_URI).then(() => {
  const fakeDb = new FakeDb();
  fakeDb.seedDb();
});

const app = express();

//routing
app.use('/api/v1/rentals', rentalRoutes); //Cuando vayamos a ese path, se ejecuta rentalRoutes


const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
  console.log("i am running");
})
