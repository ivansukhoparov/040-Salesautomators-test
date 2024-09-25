import { Db, MongoClient, WithId } from 'mongodb';
import { inject, injectable } from 'inversify';
import {urls} from "../settings";
import {sleep} from "../utils/sleep";
import {INTERVALS} from "../utils/intervals";


@injectable()
export class MongoDbAdapter {
  private client: MongoClient;
  private dbNAme:string = "pipedriveApp";
  private dataBase!: Db;

  constructor() {
    this.client = new MongoClient(urls.app.mongo!);
  }

  async init() {
    console.log('Connect to mongo server ' + urls.app.mongo);
    let isSuccess = await this.run();
    while (!isSuccess) {
      console.log('Retry in one minute');
      await sleep(INTERVALS.minute);
      isSuccess = await this.run();
    }
  }

  async run() {
    try {
      // Connect to server
      await this.client.connect();
      // Check connection
      await this.client.db('admin').command({ ping: 1 });
      this.dataBase = this.client.db(this.dbNAme);
      console.log('Mongo server connection successful to: ' + urls.app.mongo + this.dbNAme);
      return true;
    } catch {
      await this.client.close();
      console.log('Mongo server connection failed');
      return false;
    }
  }

  get connect() {
    return this.dataBase;
  }

}
