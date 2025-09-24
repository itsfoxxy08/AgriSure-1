import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (db) {
    return { client, db };
  }

  const uri = import.meta.env.MONGODB_URI || process.env.MONGODB_URI;
  const dbName = import.meta.env.MONGODB_DB_NAME || process.env.MONGODB_DB_NAME || 'agrisure';

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    
    console.log('Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function closeConnection() {
  if (client) {
    await client.close();
  }
}
