// mongodb.js
import { MongoClient } from 'mongodb'

const MONGODB = "mongodb+srv://KaKa:7pl0qohPTblWZF0T@cluster0.mfqlq.mongodb.net/myFirstDatabase"
const uri = MONGODB
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let client
let clientPromise

if (!MONGODB) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default clientPromise;