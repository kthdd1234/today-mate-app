import {ObjectSchema} from 'realm';
import {Item} from './ItemSchema';
import {Realm} from '@realm/react';

export class User extends Realm.Object<User> {
  _id!: string;
  language!: string;
  isDarkMode!: boolean;
  itemList!: Realm.List<Item>;

  static schema: ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      language: {type: 'string', default: 'ko'},
      isDarkMode: {type: 'bool', default: false},
      itemList: {
        type: 'list',
        objectType: 'Item',
        optional: false,
      },
    },
  };
}
