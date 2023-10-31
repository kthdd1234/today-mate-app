import {ObjectSchema} from 'realm';
import {Task} from './TaskSchema';
import {Realm} from '@realm/react';

export class Item extends Realm.Object<Item> {
  _id!: string;
  destination!: string;
  appointmentTime!: string;
  destinationTime!: string;
  earlyArrivalTime!: string;
  outingReadyTime!: string;
  isNotify!: boolean;
  notificationId!: string;
  taskList!: Realm.List<Task>;

  static schema: ObjectSchema = {
    name: 'Item',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      destination: 'string',
      appointmentTime: 'string',
      destinationTime: 'string',
      earlyArrivalTime: 'string',
      outingReadyTime: 'string',
      isNotify: {type: 'bool', default: false},
      notificationId: {type: 'string', default: ''},
      taskList: {
        type: 'list',
        objectType: 'Task',
        optional: false,
      },
    },
  };
}
