require('dotenv/config')
const app = require('./config/custom-express')

app.listen(process.env.PORT, () => console.log(`http://${process.env.PATH_URL}:${process.env.PORT}`))

// npm i dotenv
// npm i marko --save