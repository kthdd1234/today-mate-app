import {ObjectSchema} from 'realm';
import {Task} from './TaskSchema';

export class Outing extends Realm.Object<Outing> {
  _id!: Realm.BSON.ObjectId;
  outingTime!: Date;
  isOutingTimeAlarm!: boolean;
  taskList!: Realm.List<Task>;
  isEveryDay!: boolean;
  beforeOutingTime?: Date;
  isBeforeOutingTimeAlarm!: boolean;

  static schema: ObjectSchema = {
    name: 'Outing',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      outingTime: 'date',
      isOutingTimeAlarm: {type: 'bool', default: false},
      tasks: 'Task',
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
