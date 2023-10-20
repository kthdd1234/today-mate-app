import {ObjectSchema} from 'realm';
import {Realm} from '@realm/react';

export class Task extends Realm.Object<Task> {
  _id!: string;
  outingId!: string;
  taskNotifiId?: string;
  label?: string;
  emoji?: string;
  name!: string;
  isChecked!: boolean;

  static schema: ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      outingId: 'string',
      taskNotifiId: 'string?',
      label: 'string?',
      emoji: 'string?',
      name: 'string',
      isChecked: {type: 'bool', default: false},
    },
  };
}
