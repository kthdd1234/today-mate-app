import {ObjectSchema} from 'realm';
import {Task} from './TaskSchema';
import {Realm} from '@realm/react';

export class Outing extends Realm.Object<Outing> {
  _id!: Realm.BSON.ObjectId;
  outingTime!: Date;
  isOutingTimeAlarm!: boolean;
  isEveryDay!: boolean;
  beforeOutingTime?: Date;
  isBeforeOutingTimeAlarm!: boolean;
  taskList!: Realm.List<Task>;

  static schema: ObjectSchema = {
    name: 'Outing',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      outingTime: 'date',
      isOutingTimeAlarm: {type: 'bool', default: false},
      isEveryDay: {type: 'bool', default: false},
      beforeOutingTime: 'date?',
      isBeforeOutingTimeAlarm: {type: 'bool', default: false},
      taskList: {
        type: 'list',
        objectType: 'Task',
        optional: false,
      },
    },
  };
}
