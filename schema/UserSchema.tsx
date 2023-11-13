import {ObjectSchema} from 'realm';
import {Realm} from '@realm/react';

export class User extends Realm.Object<User> {
  _id!: string;
  language!: string;
  isDarkMode!: boolean;
  defaultItemId!: string;

  static schema: ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      language: {type: 'string', default: 'ko'},
      isDarkMode: {type: 'bool', default: false},
      defaultItemId: 'string',
    },
  };
}
