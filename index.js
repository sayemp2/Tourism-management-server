const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

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
        const ContriesList = TourismDB.collection("ContriesList");
        const TourismList = TourismDB.collection("TourismList");

        app.get("/countries", async (req, res) => {
            const countries = await ContriesList.find().toArray();
            res.send(countries);
        });

        app.get("/spotlist", async (req, res) => {
            const tourismSpots = await TourismList.find().toArray();
            res.send(tourismSpots);
        });

        

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userList.insertOne(user);
            res.send(result);
        });

        app.post('/spotlist', async (req, res) => {
            const tourismSpot = req.body;
            console.log(tourismSpot)
            const result = await TourismList.insertOne(tourismSpot);
            res.send(result);
        });

        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

run().catch(console.error);

app.get('/', (req, res) => {
    res.send('Connect with Management server');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
