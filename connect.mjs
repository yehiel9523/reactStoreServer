import { MongoClient, ObjectId } from 'mongodb';
const client = new MongoClient('mongodb://localhost:27017');
let db;
client.connect(async() => {
    db = client.db('store');
    // const collection = db.collection('Products');
    // const result = await collection.find({}).toArray();
    console.log('connect to db');
    // console.log(result)
});

export function getProducts() {
    return db.collection('Products').find({}).toArray();
}
export function getProduct(id) {
    return db.collection('Products').findOne({ id: parseInt(id) });
}
export function addProduct(product) {
    if (product.id)
        return db.collection('Products').insertOne(product);
}
export function deletePoduct(id) {
    return db.collection('Products').deleteOne({ id: parseInt(id) || id });
}
export function updateProduct(id, newObj) {
    return db.collection('Products').updateOne({ id: parseInt(id) || id }, { $set: newObj })
}