import {ObjectSchema} from 'realm';
import {Task} from './TaskSchema';
import {Realm} from '@realm/react';
import {Notification} from './NotificationSchema';

export class Item extends Realm.Object<Item> {
  _id!: string;
  destination!: string;
  appointmentTime!: string;
  earlyArrivalTime!: string;
  isNotify!: boolean;
  repeatType!: string;
  notificationIds!: Realm.List<Notification>;
  taskList!: Realm.List<Task>;

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
      taskList: {
        type: 'list',
        objectType: 'Task',
        optional: false,
      },
    },
  };
}
