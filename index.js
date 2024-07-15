const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 1000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.acyxhfp.mongodb.net`;

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
        const userList = TourismDB.collection("userList");

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userList.insertOne(user)
            res.send(result)
        });
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

run().catch(console.error);


app.get('/', (req, res) => {
    res.send('Connect with Management server')
})
app.listen(port, () => {
    console.log(`connect with management server ${port}`);
})