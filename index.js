const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')
const JWT = require('jsonwebtoken')
require('dotenv').config()


app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0b62e8i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categoryCollection = client.db(`Desired-Wheel`).collection('category');
        const productCollection = client.db(`Desired-Wheel`).collection('products');
        const userCollection = client.db(`Desired-Wheel`).collection('Users');
        const ordersCollection = client.db(`Desired-Wheel`).collection('orders');

        // order add in db api
        app.post('/orders', async (req, res) => {
            const data = req.body
            const result = await ordersCollection.insertOne(data)
            res.send(result)
        })
        // orders api
        app.get("/orders", async (req, res) => {
            const email = req.query.email
            const query = {
                customerEmail:email
            };
            const result = await ordersCollection.find(query).toArray();
            res.send(result);
        });

        // sellers api
        app.get('/sellers', async (req, res) => {
            const seller = req.query.role;
            const query = {
                role: seller
            }
            const result = await userCollection.find(query).toArray()
            res.send(result)
        });

        // buyers api
        app.get('/buyers', async (req, res) => {
            const buyer = req.query.role;
            const query = {
                role: buyer
            }
            const result = await userCollection.find(query).toArray()
            res.send(result)
        });

        // 
        app.get("/category", async (req, res) => {
            const query = {};
            const categories = await categoryCollection.find(query).toArray();
            res.send(categories);
        });

        app.get("/product/:brand", async (req, res) => {
            const Brand = req.params.brand;
            console.log(Brand)
            const query = {
                Brand
            };
            console.log(query)

            const result = await productCollection.find(query).toArray();
            console.log(result)
            res.send(result);
        });
        // user add api
        app.post('/addUser', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });
    }
    finally {

    }
}
run().catch(console.log);

app.get('/', (req, res) => {
    res.send('Server is running')

})
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})

