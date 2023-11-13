import {ObjectSchema} from 'realm';
import {Realm} from '@realm/react';

export class Item extends Realm.Object<Item> {
  _id!: string;
  destination!: string;
  appointmentTime!: string;
  earlyArrivalTime!: string;
  isNotify!: boolean;
  repeatType!: string;

  static schema: ObjectSchema = {
    name: 'Item',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      destination: 'string',
      appointmentTime: 'string',
      earlyArrivalTime: 'string',
      isNotify: {type: 'bool', default: false},
      repeatType: 'string',
      notificationIds: {
        type: 'list',
        objectType: 'Notification',
        optional: false,
      },
    },
  };
}
