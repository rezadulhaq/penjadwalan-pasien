const process = require("process");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")
const router = require('./routes');

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Aplikasi Penjadwalan Dokter!')
})

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
