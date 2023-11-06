import {ObjectSchema} from 'realm';
import {Realm} from '@realm/react';

export class Notification extends Realm.Object<Notification> {
  _id!: string;
  date!: string;
  itemId!: string;

  static schema: ObjectSchema = {
    name: 'Notification',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      date: 'string',
      itemId: 'string',
    },
  };
}
