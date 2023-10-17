import {ObjectSchema} from 'realm';
import {Task} from './TaskSchema';
import {Realm} from '@realm/react';

export class Outing extends Realm.Object<Outing> {
  _id!: string;
  outingTime!: string;
  isOutingTimeAlarm!: boolean;
  isEveryDay!: boolean;
  beforeOutingTime?: string;
  isBeforeOutingTimeAlarm!: boolean;
  taskList!: Realm.List<Task>;

  static schema: ObjectSchema = {
    name: 'Outing',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      outingTime: 'string',
      isOutingTimeAlarm: {type: 'bool', default: false},
      isEveryDay: {type: 'bool', default: false},
      beforeOutingTime: 'string?',
      isBeforeOutingTimeAlarm: {type: 'bool', default: false},
      taskList: {
        type: 'list',
        objectType: 'Task',
        optional: false,
      },
    },
  };
}
