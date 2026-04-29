const { MongoClient } = require('mongodb');

async function initiateReplicaSet() {
  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);

  try {
    await client.connect();
    const admin = client.db('admin');
    const result = await admin.command({ replSetInitiate: {} });
    console.log('Replica Set Initiated:', result);
  } catch (err) {
    if (err.message.includes('already initialized')) {
      console.log('Replica set is already initialized.');
    } else {
      console.error('Error initiating replica set:', err.message);
      console.log('Tip: Make sure mongod is started with --replSet <name> parameter.');
    }
  } finally {
    await client.close();
  }
}

initiateReplicaSet();
