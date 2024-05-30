const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(`mongodb+srv://${process.env.MONGO_HOST}`, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let instance = {};

async function connect() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // console.log(client.db("db_baihaqi_betest").collection('user'));
        instance.obj = client
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (e) {
        console.log(e);
    }
}

function mongoInstance(collection) {
    return instance.obj.db('db_baihaqi_betest').collection(collection);
}

module.exports = {
    connect,
    mongoInstance
}