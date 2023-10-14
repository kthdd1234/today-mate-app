import Realm, {ObjectSchema} from 'realm';

export class User extends Realm.Object<User> {
  _id!: Realm.BSON.ObjectId;
  language!: string;
  isDarkMode!: boolean;
  isAlarm!: boolean;

  static schema: ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      language: {type: 'string', default: 'ko'},
      isDarkMode: {type: 'bool', default: false},
      isAlarm: {type: 'bool', default: false},
    },
  };
}
