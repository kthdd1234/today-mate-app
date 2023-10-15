import {ObjectSchema} from 'realm';
import {Outing} from './OutingSchema';

export class User extends Realm.Object<User> {
  _id!: Realm.BSON.ObjectId;
  language!: string;
  isDarkMode!: boolean;
  isAlarm!: boolean;
  outingList!: Realm.List<Outing>;

  static schema: ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      language: {type: 'string', default: 'ko'},
      isDarkMode: {type: 'bool', default: false},
      isAlarm: {type: 'bool', default: false},
      outingList: {
        type: 'list',
        objectType: 'Outing',
        optional: false,
      },
    },
  };
}
