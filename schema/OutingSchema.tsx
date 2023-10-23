import {ObjectSchema} from 'realm';
import {Task} from './TaskSchema';
import {Realm} from '@realm/react';

export class Outing extends Realm.Object<Outing> {
  _id!: string;
  outingTime!: string;
  isNotifyOutingTime!: boolean;
  outingTimeNotifiId?: string;
  beforeOutingMinute?: string;
  isNotifyBeforeOutingTime!: boolean;
  taskList!: Realm.List<Task>;
  isEveryDay!: boolean;

  static schema: ObjectSchema = {
    name: 'Outing',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      outingTime: 'string',
      isNotifyOutingTime: {type: 'bool', default: false},
      outingTimeNotifiId: 'string?',
      beforeOutingMinute: 'string?',
      isNotifyBeforeOutingTime: {type: 'bool', default: false},
      taskList: {
        type: 'list',
        objectType: 'Task',
        optional: false,
      },
      isEveryDay: {type: 'bool', default: false},
    },
  };
}
