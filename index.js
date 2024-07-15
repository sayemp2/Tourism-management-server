const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 1000;


app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.acyxhfp.mongodb.net/?appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();
        const TourismDB = client.db("TourismDB");
        const TourismList = TourismDB.collection("TourismList");

        app.post('/users', async (req, res) => {
            const users = req.body;
            const result = await TourismList.insertOne(users);
            res.send(result);
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error(err);
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Tourism Management Connect Server')
})
app.listen(port, () => {
    console.log(`Tourism Management Server Connect successfully ${port}`);
})