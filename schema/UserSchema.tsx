import {ObjectSchema} from 'realm';
import {Outing} from './OutingSchema';
import {Realm} from '@realm/react';

export class User extends Realm.Object<User> {
  _id!: string;
  language!: string;
  isDarkMode!: boolean;
  isNotify!: boolean;
  outingList!: Realm.List<Outing>;

  static schema: ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      language: {type: 'string', default: 'ko'},
      isDarkMode: {type: 'bool', default: false},
      isNotify: {type: 'bool', default: false},
      outingList: {
        type: 'list',
        objectType: 'Outing',
        optional: false,
      },
    },
  };
}
