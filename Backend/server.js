require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const incomeRoute = require('./routes/incomeRoute')
const errorMiddleware = require('./miaddleware/errorMiddeware')
const app = express();
var cors = require('cors')

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
const FRONTEND = process.env.FRONTEND

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json())
app.use(cors(corsOptions))

app.use('/api/income', incomeRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorMiddleware);

mongoose.
  connect(MONGO_URL)
  .then(() => {
    console.log('Connected')
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
  }).catch((error) =>{
    console.log(error)
  })