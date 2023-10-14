import {ObjectSchema} from 'realm';

export class Task extends Realm.Object<Task> {
  _id!: Realm.BSON.ObjectId;
  outingId!: Realm.BSON.ObjectId;
  label?: string;
  emoji?: string;
  name!: string;
  isChecked!: boolean;

  static schema: ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      itemId: 'string',
      label: 'string?',
      emoji: 'string?',
      name: 'string',
      isChecked: {type: 'bool', default: false},
    },
  };
}
