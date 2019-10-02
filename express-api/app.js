var http = require('http')
  , https = require('https')
  , express = require('express')
  , app = express();
const cors = require("cors");

const itemsRouter = require('./routes/items');

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use('/list', itemsRouter);

http.createServer(app).listen(3000, () => {
    console.log('Rodando Http Server');
});
https.createServer(app).listen(4000, () => {
    console.log('Rodando Https Server');
});