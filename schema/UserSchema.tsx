import Realm, {ObjectSchema} from 'realm';

export class User extends Realm.Object<User> {
  _id!: Realm.BSON.ObjectId;
  language!: string;
  outingTime!: Date;
  isDarkMode!: boolean;
  outingTimeAlarm!: Alarm;
  safetyInspectionAlarm!: Alarm;
  takingThingsAlarm!: Alarm;
  todoAlarm!: Alarm;

  static schema: ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      language: {type: 'string', default: 'ko'},
      isDarkMode: {type: 'bool', default: false},
      outingTimeAlarm: 'Alarm',
    },
  };
}

class Alarm extends Realm.Object<Alarm> {
  isAlarm!: boolean;
  alarmTime?: Date;

  static schema: ObjectSchema = {
    name: 'Alarm',
    primaryKey: '_id',
    properties: {
      isAlarm: {type: 'bool', default: false},
      alarmTime: 'date?',
    },
  };
}
