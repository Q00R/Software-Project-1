const { MongoClient } = require('mongodb');

const dbBackup = {
  updateDatabaseBackup: async () => {
    const sourceUri = process.env.DB_URL + '/' + process.env.DB_NAME;
    const destinationUri = process.env.DB_URL + '/' + process.env.DB_BACKUP_NAME;
    const sourceClient = new MongoClient(sourceUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const destinationClient = new MongoClient(destinationUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await sourceClient.connect();
      await destinationClient.connect();

      const sourceDb = sourceClient.db();
      const destinationDb = destinationClient.db();

      const collections = await sourceDb.listCollections().toArray();

      for (const collection of collections) {
        const sourceCollection = sourceDb.collection(collection.name);
        const destinationCollection = destinationDb.collection(collection.name);

        //Checking if collection exists not to crash
        if ((await destinationDb.listCollections().toArray()).some(col => col.name == collection.name))
          await destinationCollection.drop();

        const documents = await sourceCollection.find({}).toArray();
        //Checking if there is something to insert not to crash too lol
        if (documents.length > 0)
          await destinationCollection.insertMany(documents);
      }
    } finally {
      await sourceClient.close();
      await destinationClient.close();
    }
  },
};

module.exports = dbBackup;