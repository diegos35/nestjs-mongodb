import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

async function run() {}

run();

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async () => {
        //connection
        const uri =
          'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT';
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('platzi-store');
        return database; //inyectable. singleton
        /* const taskCollection = database.collection('tasks');
        const tasks = await taskCollection.find().toArray();
        console.log(tasks) */
      },
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
