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

async function run () {
    try{
        const categoryCollection = client.db(`Desired-Wheel`).collection('category');
        const productCollection = client.db(`Desired-Wheel`).collection('products');
        const userCollection = client.db(`Desired-Wheel`).collection('Users');
        

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

          app.post('/addUser', async(req, res) =>{
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });


        
    }
    finally{

    }
}
run().catch(console.log);

app.get('/', (req, res) => {
    res.send('Server is running')

})
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})

