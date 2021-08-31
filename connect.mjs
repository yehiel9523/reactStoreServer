import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/store', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: Number,
    description: String,
    category: String,
    image: String,
})
const Product = mongoose.model('Products', productsSchema);


// import { MongoClient, ObjectId } from 'mongodb';
// const client = new MongoClient('mongodb://localhost:27017');
// let db;
// client.connect(async() => {
//     db = client.db('store');
//     // const collection = db.collection('Products');
//     // const result = await collection.find({}).toArray();
//     console.log('connect to db');
//     // console.log(result)
// });

export function getProducts(filter = {}) {
    const qwery = {};
    if (filter.title) {
        qwery.title = new RegExp(filter.title, 'i')
    }
    return Product.find(qwery)

    // return db.collection('Products').find(qwery).toArray();
    // return db.collection('Products').find({}).toArray();
}
export function getProduct(id) {
    return Product.findOne({ _id: ObjectId(id) })
        // return db.collection('Product').findOne({ id: parseInt(id) });
}
// export function findBySearch(filter = {}) {
//     const qwery = {};
//     if (filter.title) {
//         qwery.title = new RegExp(filter.title, 'i')
//     }
//     return db.collection('Product').find(qwery).toArray();
// }
export function addProduct(product) {
    const newProduct = new Product(product)
    return newProduct.save()


    // return db.collection('Products').insertOne(product);
}
export function deletePoduct(id) {
    return Product.findOneAndDelete({ id: ObjectId(id) })
        // return db.collection('Products').deleteOne({ id: parseInt(id) || id });

}
export function updateProduct(id, newObj) {
    return Product.findOneAndUpdate({ id: ObjectId(id) }, newObj)
        // return db.collection('Products').updateOne({ id: parseInt(id) || id }, { $set: newObj })
}