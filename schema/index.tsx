import {User} from './UserSchema';
import {Item} from './ItemSchema';
import {Task} from './TaskSchema';
import {Realm} from '@realm/react';
import {Notification} from './NotificationSchema';

export const realmConfig: Realm.Configuration = {
  schema: [User, Item, Task, Notification],
  deleteRealmIfMigrationNeeded: true,
};
