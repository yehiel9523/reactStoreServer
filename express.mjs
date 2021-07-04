import express from 'express';
import cors from 'cors';
import loadJson from 'load-json-file';

const app = express();

app.use(express.static('./build/'))
const products = loadJson.sync('./products.json')
app.get('/products', (req, res) => {

    res.send(products);

});

app.listen(8000);