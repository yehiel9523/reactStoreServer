import express from 'express';
import cors from 'cors';
import loadJson from 'load-json-file';
import './connect.mjs';
import { getProducts, getProduct, addProduct, deletePoduct, updateProduct } from './connect.mjs'
const app = express();
app.use(express.json());
// app.use((req, res, next) => {
//     const now = new Date();
//     if ((now.getDay() === 5 && now.getHours() >= 19) || (now.getDay() === 3 && now.getHours() < 21)) {
//         // app.use(express.static('/'))
//         res.set('Content-Type', 'text/html');
//         res.sendFile('./shabbat.html', { root: '.' })
//     } else
//         next()
// })

app.use(express.static('./build/'));
const products = loadJson.sync('./products.json')
app.get('/products', async(req, res) => {

    res.send(await getProducts());

});
// app.get('/products', (req, res) => {

//     res.send(products);

// });
app.get('/products/:id', async(req, res) => {
    res.send(await getProduct(req.params.id));
})

app.post('/products', async(req, res) => {
    res.send(await addProduct(req.body));
})
app.delete('/products/:id', async(req, res) => {
    res.send(await deletePoduct(req.params.id))
})
app.put('/products/:id', async(req, res) => {
    res.send(await updateProduct(req.params.id, req.body))
})

app.listen(8000);