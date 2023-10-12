import {ObjectSchema} from 'realm';

export class Record extends Realm.Object<Record> {
  dateTime?: Date;
  checkedTask?: CheckedTask[];
}

class CheckedTask extends Realm.Object<CheckedTask> {
  _id!: string;
  type!: string;
  name!: string;
  checkedTime!: Date;

  static schema: ObjectSchema = {
    name: 'CheckedTask',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      type: 'string',
      name: 'string',
      checkedTime: 'date',
    },
  };
}
