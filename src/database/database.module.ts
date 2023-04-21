import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';

import config from '../config';

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
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {
          connection,
          user,
          password,
          host,
          port,
          dbName,
        } = configService.mongo;

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
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
