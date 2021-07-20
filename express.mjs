import express from 'express';
import cors from 'cors';
import loadJson from 'load-json-file';

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
app.get('/products', (req, res) => {

    res.send(products);

});
app.get('/products/:id', (req, res) => {
    res.send(products.find(({ id }) => id == req.params.id))
})

app.post('/products', (req, res) => {
    products.push(req.body);
    res.send('ok');
})

app.listen(8000);